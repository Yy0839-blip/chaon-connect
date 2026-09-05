import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { missions } from "@/data/chaon";
import { seedPosts, type Post } from "@/data/community";
import { supabase } from "@/lib/supabase";

export type Meetup = { id:string; title:string; date:string; time:string; place:string; maxPeople:number; joinedPeople:number; creator:string; avatar:string };
export type MusicRecommendation = { id:string; title:string; artist:string; date:string; recommender:string };
type State = { nickname:string; avatar:string; profileTags:string[]; points:number; badges:string[]; doneMissions:string[]; joinedPrograms:string[]; joinedEvents:string[]; visits:number; posts:Post[]; meetups:Meetup[]; musicVotes:Record<string,string>; musicRecommendations:MusicRecommendation[] };
const KEY="chaon.state.v4";
const initial:State={nickname:"",avatar:"🐤",profileTags:["친구랑 노는 걸 좋아해"],points:240,badges:["첫 방문","게임왕","친구왕"],doneMissions:[],joinedPrograms:[],joinedEvents:[],visits:4,posts:seedPosts,meetups:[],musicVotes:{},musicRecommendations:[]};
type Ctx=State&{ready:boolean;backendConnected:boolean;setProfile:(nickname:string,avatar:string)=>void;setProfileTags:(tags:string[])=>void;completeMission:(id:string)=>{point:number;badge?:string}|null;toggleProgram:(id:string)=>boolean;toggleEvent:(id:string)=>boolean;addPost:(text:string,place:string,image?:string)=>void;toggleLike:(id:string)=>void;addMeetup:(input:Omit<Meetup,"id"|"creator"|"avatar"|"joinedPeople">)=>void;toggleMeetup:(id:string)=>boolean;voteMusic:(date:string,songId:string)=>boolean;addMusicRecommendation:(title:string,artist:string,date:string)=>void};
const ChaonContext=createContext<Ctx|null>(null);
const toPost=(p:any,liked=false):Post=>({id:p.id,nickname:p.nickname,avatar:p.avatar,place:p.place||"",time:p.created_at?new Date(p.created_at).toLocaleString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"방금",text:p.text,likes:Number(p.likes)||0,comments:Number(p.comments)||0,liked,image:p.image||undefined});
const toMeetup=(m:any):Meetup=>({id:m.id,title:m.title,date:m.date,time:m.time,place:m.place,maxPeople:Number(m.max_people)||4,joinedPeople:Number(m.joined_people)||0,creator:m.creator,avatar:m.avatar});

export function ChaonProvider({children}:{children:ReactNode}){
 const [state,setState]=useState<State>(initial); const [ready,setReady]=useState(false); const [userId,setUserId]=useState<string|null>(null);
 const persistProfile=useCallback((uid:string, patch:Partial<State>)=>{if(!supabase)return;void supabase.from("profiles").upsert({id:uid,nickname:patch.nickname??state.nickname||"익명의 차오름러",avatar:patch.avatar??state.avatar,profile_tags:patch.profileTags??state.profileTags,points:patch.points??state.points,visits:patch.visits??state.visits,updated_at:new Date().toISOString()})},[state]);
 const reloadShared=useCallback(async(uid:string)=>{if(!supabase)return;const [postsR,meetupsR,recsR,votesR,likesR]=await Promise.all([
   supabase.from("posts").select("id,nickname,avatar,place,text,image,likes,comments,created_at").order("created_at",{ascending:false}).limit(100),
   supabase.from("meetups").select("id,title,date,time,place,max_people,joined_people,creator,avatar").order("created_at",{ascending:false}).limit(100),
   supabase.from("music_recommendations").select("id,title,artist,vote_date,recommender").order("created_at",{ascending:false}).limit(30),
   supabase.from("music_votes").select("vote_date,song_id").eq("user_id",uid),
   supabase.from("post_likes").select("post_id").eq("user_id",uid)
 ]);
 const liked=new Set((likesR.data||[]).map((x:any)=>x.post_id));
 if(postsR.data) setState(s=>({...s,posts:postsR.data.map((p:any)=>toPost(p,liked.has(p.id)))}));
 if(meetupsR.data) setState(s=>({...s,meetups:meetupsR.data.map(toMeetup)}));
 if(recsR.data) setState(s=>({...s,musicRecommendations:recsR.data.map((r:any)=>({id:r.id,title:r.title,artist:r.artist,date:r.vote_date,recommender:r.recommender}))}));
 if(votesR.data) setState(s=>({...s,musicVotes:Object.fromEntries(votesR.data.map((v:any)=>[v.vote_date,v.song_id]))}));
 },[]);
 useEffect(()=>{try{const raw=localStorage.getItem(KEY);if(raw)setState({...initial,...(JSON.parse(raw) as Partial<State>)});}catch{}setReady(true)},[]);
 useEffect(()=>{if(!ready)return;try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}},[state,ready]);
 useEffect(()=>{if(!supabase)return;let mounted=true;let channel:any;const start=async()=>{
   const sessionR=await supabase.auth.getSession(); let session=sessionR.data.session;
   if(!session){const sign=await supabase.auth.signInAnonymously(); session=sign.data.session;if(sign.error) return;}
   if(!mounted||!session)return; const uid=session.user.id; setUserId(uid);
   const profile=await supabase.from("profiles").select("nickname,avatar,profile_tags,points,visits").eq("id",uid).maybeSingle();
   if(profile.data)setState(s=>({...s,nickname:profile.data.nickname??s.nickname,avatar:profile.data.avatar??s.avatar,profileTags:profile.data.profile_tags??s.profileTags,points:profile.data.points??s.points,visits:profile.data.visits??s.visits}));
   else await supabase.from("profiles").insert({id:uid,nickname:"익명의 차오름러",avatar:"🐤",profile_tags:[],points:240,visits:0});
   await reloadShared(uid);
   channel=supabase.channel(`chaon-live-${uid}`).on("postgres_changes",{event:"*",schema:"public",table:"posts"},()=>void reloadShared(uid)).on("postgres_changes",{event:"*",schema:"public",table:"post_likes"},()=>void reloadShared(uid)).on("postgres_changes",{event:"*",schema:"public",table:"meetups"},()=>void reloadShared(uid)).on("postgres_changes",{event:"*",schema:"public",table:"meetup_members"},()=>void reloadShared(uid)).on("postgres_changes",{event:"*",schema:"public",table:"music_recommendations"},()=>void reloadShared(uid)).subscribe();
 }; void start(); return()=>{mounted=false;if(channel)void supabase.removeChannel(channel)},[reloadShared]);
 const setProfile=useCallback((nickname:string,avatar:string)=>{setState(s=>{const next={...s,nickname:nickname.trim().slice(0,20),avatar}; if(userId)persistProfile(userId,next); return next})},[userId,persistProfile]);
 const setProfileTags=useCallback((tags:string[])=>{const next=Array.from(new Set(tags)).slice(0,5);setState(s=>{const out={...s,profileTags:next};if(userId)persistProfile(userId,out);return out})},[userId,persistProfile]);
 const completeMission=useCallback((id:string)=>{const mission=missions.find(m=>m.id===id);if(!mission)return null;let applied=false;setState(s=>{if(s.doneMissions.includes(id))return s;applied=true;const points=s.points+mission.point;const badges=mission.badge&&!s.badges.includes(mission.badge)?[...s.badges,mission.badge]:s.badges;if(userId)persistProfile(userId,{...s,points,badges});return{...s,doneMissions:[...s.doneMissions,id],points,badges}});return applied?{point:mission.point,badge:mission.badge}:null},[userId,persistProfile]);
 const toggleProgram=useCallback((id:string)=>{let joined=false;setState(s=>{joined=!s.joinedPrograms.includes(id);return{...s,joinedPrograms:joined?[...s.joinedPrograms,id]:s.joinedPrograms.filter(p=>p!==id)}});return joined},[]);
 const toggleEvent=useCallback((id:string)=>{let joined=false;setState(s=>{joined=!s.joinedEvents.includes(id);return{...s,joinedEvents:joined?[...s.joinedEvents,id]:s.joinedEvents.filter(e=>e!==id)}});return joined},[]);
 const addPost=useCallback((text:string,place:string,image?:string)=>{const clean=text.trim().slice(0,500);if(!clean)return;setState(s=>({...s,points:s.points+5,posts:[{id:`local-${crypto.randomUUID?.()||Date.now()}`,nickname:s.nickname||"익명의 차오름러",avatar:s.avatar,place:place.trim().slice(0,40),time:"방금",text:clean,likes:0,comments:0,...(image?{image}:{})},...s.posts]}));if(supabase&&userId)void supabase.from("posts").insert({author_id:userId,nickname:state.nickname||"익명의 차오름러",avatar:state.avatar,place:place.trim().slice(0,40),text:clean,image:image||null}).then(()=>void reloadShared(userId))},[userId,state.nickname,state.avatar,reloadShared]);
 const toggleLike=useCallback((id:string)=>{if(!supabase||!userId){setState(s=>({...s,posts:s.posts.map(p=>p.id===id?{...p,liked:!p.liked,likes:p.likes+(p.liked?-1:1)}:p)}));return}const current=state.posts.find(p=>p.id===id);if(!current||id.startsWith("local-"))return;if(current.liked)void supabase.from("post_likes").delete().eq("post_id",id).eq("user_id",userId).then(()=>void reloadShared(userId));else void supabase.from("post_likes").insert({post_id:id,user_id:userId}).then(()=>void reloadShared(userId))},[supabase,userId,state.posts,reloadShared]);
 const addMeetup=useCallback((input:Omit<Meetup,"id"|"creator"|"avatar"|"joinedPeople">)=>{const creator=state.nickname||"익명의 차오름러";if(supabase&&userId){void supabase.from("meetups").insert({creator_id:userId,title:input.title.trim().slice(0,60),date:input.date,time:input.time,place:input.place.trim().slice(0,60),max_people:Math.min(20,Math.max(2,input.maxPeople)),joined_people:0,creator,avatar:state.avatar}).then(({error})=>{if(!error)void reloadShared(userId)})}else setState(s=>({...s,meetups:[{...input,id:`local-meetup-${Date.now()}`,creator,avatar:s.avatar,joinedPeople:1},...s.meetups]}))},[userId,state.nickname,state.avatar,reloadShared]);
 const toggleMeetup=useCallback((id:string)=>{if(!supabase||!userId)return false;if(id.startsWith("local-"))return false;let result=false;void supabase.rpc("join_meetup",{p_meetup_id:id}).then(({data,error})=>{result=Boolean(data&&!error);void reloadShared(userId)});return result},[userId,reloadShared]);
 const voteMusic=useCallback((date:string,songId:string)=>{if(state.musicVotes[date])return false;setState(s=>({...s,musicVotes:{...s.musicVotes,[date]:songId},points:s.points+1}));if(supabase&&userId)void supabase.from("music_votes").insert({user_id:userId,vote_date:date,song_id:songId}).then(({error})=>{if(error?.code==="23505")return;void reloadShared(userId)});return true},[state.musicVotes,userId,reloadShared]);
 const addMusicRecommendation=useCallback((title:string,artist:string,date:string)=>{const t=title.trim().slice(0,60),a=artist.trim().slice(0,60);if(!t||!a)return;const recommender=state.nickname||"익명의 차오름러";if(supabase&&userId)void supabase.from("music_recommendations").insert({user_id:userId,title:t,artist:a,vote_date:date,recommender}).then(()=>void reloadShared(userId));else setState(s=>({...s,musicRecommendations:[{id:`song-${Date.now()}`,title:t,artist:a,date,recommender},...s.musicRecommendations].slice(0,30)}))},[userId,state.nickname,reloadShared]);
 const value=useMemo<Ctx>(()=>({...state,ready,backendConnected:Boolean(supabase&&userId),setProfile,setProfileTags,completeMission,toggleProgram,toggleEvent,addPost,toggleLike,addMeetup,toggleMeetup,voteMusic,addMusicRecommendation}),[state,ready,userId,setProfile,setProfileTags,completeMission,toggleProgram,toggleEvent,addPost,toggleLike,addMeetup,toggleMeetup,voteMusic,addMusicRecommendation]);
 return <ChaonContext.Provider value={value}>{children}</ChaonContext.Provider>;
}
export function useChaon(){const ctx=useContext(ChaonContext);if(!ctx)throw new Error("useChaon must be used inside ChaonProvider");return ctx;}
