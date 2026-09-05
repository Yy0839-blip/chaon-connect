/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as CommunityRouteImport } from './routes/community'
import { Route as EventsRouteImport } from './routes/events'
import { Route as MissionsRouteImport } from './routes/missions'
import { Route as ProfileRouteImport } from './routes/profile'
import { Route as ProgramsRouteImport } from './routes/programs'
import { Route as ProgramsNearbyRouteImport } from './routes/programs/nearby'
import { Route as SpacesRouteImport } from './routes/spaces'
import { Route as SpacesSpaceIdRouteImport } from './routes/spaces/$spaceId'
import { Route as MeetupRouteImport } from './routes/meetup'
import { Route as MusicRouteImport } from './routes/music'

const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const CommunityRoute = CommunityRouteImport.update({ id: '/community', path: '/community', getParentRoute: () => rootRouteImport } as any)
const EventsRoute = EventsRouteImport.update({ id: '/events', path: '/events', getParentRoute: () => rootRouteImport } as any)
const MissionsRoute = MissionsRouteImport.update({ id: '/missions', path: '/missions', getParentRoute: () => rootRouteImport } as any)
const ProfileRoute = ProfileRouteImport.update({ id: '/profile', path: '/profile', getParentRoute: () => rootRouteImport } as any)
const ProgramsNearbyRoute = ProgramsNearbyRouteImport.update({ id: '/programs/nearby', path: '/nearby', getParentRoute: () => ProgramsRoute } as any)
const ProgramsRoute = ProgramsRouteImport.update({ id: '/programs', path: '/programs', getParentRoute: () => rootRouteImport } as any)._addFileChildren({ ProgramsNearbyRoute })
const SpacesSpaceIdRoute = SpacesSpaceIdRouteImport.update({ id: '/spaces/$spaceId', path: '/$spaceId', getParentRoute: () => SpacesRoute } as any)
const SpacesRoute = SpacesRouteImport.update({ id: '/spaces', path: '/spaces', getParentRoute: () => rootRouteImport } as any)._addFileChildren({ SpacesSpaceIdRoute })
const MeetupRoute = MeetupRouteImport.update({ id: '/meetup', path: '/meetup', getParentRoute: () => rootRouteImport } as any)
const MusicRoute = MusicRouteImport.update({ id: '/music', path: '/music', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath { '/': typeof IndexRoute; '/community': typeof CommunityRoute; '/events': typeof EventsRoute; '/missions': typeof MissionsRoute; '/profile': typeof ProfileRoute; '/programs': typeof ProgramsRoute; '/programs/nearby': typeof ProgramsNearbyRoute; '/spaces': typeof SpacesRoute; '/spaces/$spaceId': typeof SpacesSpaceIdRoute; '/meetup': typeof MeetupRoute; '/music': typeof MusicRoute }
export interface FileRoutesByTo extends FileRoutesByFullPath {}
export interface FileRoutesById extends FileRoutesByFullPath { __root__: typeof rootRouteImport }
export interface FileRouteTypes { fileRoutesByFullPath: FileRoutesByFullPath; fullPaths: keyof FileRoutesByFullPath; fileRoutesByTo: FileRoutesByTo; to: keyof FileRoutesByTo; id: keyof FileRoutesById; fileRoutesById: FileRoutesById }
export interface RootRouteChildren { IndexRoute: typeof IndexRoute; CommunityRoute: typeof CommunityRoute; EventsRoute: typeof EventsRoute; MissionsRoute: typeof MissionsRoute; ProfileRoute: typeof ProfileRoute; ProgramsRoute: typeof ProgramsRoute; SpacesRoute: typeof SpacesRoute; MeetupRoute: typeof MeetupRoute; MusicRoute: typeof MusicRoute }

declare module '@tanstack/react-router' { interface FileRoutesByPath {
 '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
 '/community': { id: '/community'; path: '/community'; fullPath: '/community'; preLoaderRoute: typeof CommunityRouteImport; parentRoute: typeof rootRouteImport }
 '/events': { id: '/events'; path: '/events'; fullPath: '/events'; preLoaderRoute: typeof EventsRouteImport; parentRoute: typeof rootRouteImport }
 '/missions': { id: '/missions'; path: '/missions'; fullPath: '/missions'; preLoaderRoute: typeof MissionsRouteImport; parentRoute: typeof rootRouteImport }
 '/profile': { id: '/profile'; path: '/profile'; fullPath: '/profile'; preLoaderRoute: typeof ProfileRouteImport; parentRoute: typeof rootRouteImport }
 '/programs': { id: '/programs'; path: '/programs'; fullPath: '/programs'; preLoaderRoute: typeof ProgramsRouteImport; parentRoute: typeof rootRouteImport }
 '/programs/nearby': { id: '/programs/nearby'; path: '/nearby'; fullPath: '/programs/nearby'; preLoaderRoute: typeof ProgramsNearbyRouteImport; parentRoute: typeof ProgramsRouteImport }
 '/spaces': { id: '/spaces'; path: '/spaces'; fullPath: '/spaces'; preLoaderRoute: typeof SpacesRouteImport; parentRoute: typeof rootRouteImport }
 '/spaces/$spaceId': { id: '/spaces/$spaceId'; path: '/$spaceId'; fullPath: '/spaces/$spaceId'; preLoaderRoute: typeof SpacesSpaceIdRouteImport; parentRoute: typeof SpacesRouteImport }
 '/meetup': { id: '/meetup'; path: '/meetup'; fullPath: '/meetup'; preLoaderRoute: typeof MeetupRouteImport; parentRoute: typeof rootRouteImport }
 '/music': { id: '/music'; path: '/music'; fullPath: '/music'; preLoaderRoute: typeof MusicRouteImport; parentRoute: typeof rootRouteImport }
}}

const rootRouteChildren: RootRouteChildren = { IndexRoute, CommunityRoute, EventsRoute, MissionsRoute, ProfileRoute, ProgramsRoute, SpacesRoute, MeetupRoute, MusicRoute }
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' { interface Register { ssr: true; router: Awaited<ReturnType<typeof getRouter>>; config: Awaited<ReturnType<typeof startInstance.getOptions>> } }
