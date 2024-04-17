import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ArtistAccountData {
  'userName' : string,
  'displayName' : string,
  'createdAt' : Timestamp,
  'fileType' : [] | [string],
  'updatedAt' : Timestamp,
  'userPrincipal' : Principal,
  'avatar' : [] | [ProfilePhoto],
}
export interface ArtistBucket {
  'changeCanisterSize' : ActorMethod<[bigint], undefined>,
  'changeCycleAmount' : ActorMethod<[bigint], undefined>,
  'createContent' : ActorMethod<[ContentInit], [] | [[ContentId, Principal]]>,
  'createProfileInfo' : ActorMethod<[[] | [ArtistAccountData]], boolean>,
  'deleteAccount' : ActorMethod<[Principal], undefined>,
  'deleteContentCanister' : ActorMethod<[UserId, Principal], boolean>,
  'getAllContentCanisters' : ActorMethod<[], Array<CanisterId>>,
  'getCanisterOfContent' : ActorMethod<[ContentId], [] | [CanisterId]>,
  'getCanisterStatus' : ActorMethod<[], CanisterStatus>,
  'getCurrentCyclesBalance' : ActorMethod<[], bigint>,
  'getEntriesOfCanisterToContent' : ActorMethod<
    [],
    Array<[CanisterId, ContentId]>
  >,
  'getPrincipalThis' : ActorMethod<[], Principal>,
  'getProfileInfo' : ActorMethod<[UserId], [] | [ArtistAccountData]>,
  'getStatus' : ActorMethod<[[] | [StatusRequest]], [] | [StatusResponse]>,
  'removeContent' : ActorMethod<[ContentId, bigint], undefined>,
  'transferFreezingThresholdCycles' : ActorMethod<[], undefined>,
  'updateProfileInfo' : ActorMethod<[ArtistAccountData], boolean>,
}
export type CanisterId = Principal;
export interface CanisterStatus {
  'status' : { 'stopped' : null } |
    { 'stopping' : null } |
    { 'running' : null },
  'memory_size' : bigint,
  'cycles' : bigint,
  'settings' : definite_canister_settings,
  'module_hash' : [] | [Uint8Array | number[]],
}
export type ContentId = string;
export interface ContentInit {
  'contentId' : string,
  'userId' : UserId__1,
  'name' : string,
  'createdAt' : Timestamp,
  'size' : bigint,
  'tags' : Array<string>,
  'description' : string,
  'chunkCount' : bigint,
  'extension' : FileExtension,
}
export type FileExtension = { 'aac' : null } |
  { 'avi' : null } |
  { 'gif' : null } |
  { 'jpg' : null } |
  { 'mp3' : null } |
  { 'mp4' : null } |
  { 'png' : null } |
  { 'svg' : null } |
  { 'wav' : null } |
  { 'jpeg' : null };
export interface PrincipalInfo {
  'createdAt' : Timestamp,
  'userPrincipal' : Principal,
}
export type ProfilePhoto = Uint8Array | number[];
export interface StatusRequest {
  'memory_size' : boolean,
  'version' : boolean,
  'cycles' : boolean,
  'heap_memory_size' : boolean,
}
export interface StatusResponse {
  'memory_size' : [] | [bigint],
  'version' : [] | [bigint],
  'cycles' : [] | [bigint],
  'heap_memory_size' : [] | [bigint],
}
export type Timestamp = bigint;
export type UserId = Principal;
export type UserId__1 = Principal;
export interface definite_canister_settings {
  'freezing_threshold' : bigint,
  'controllers' : [] | [Array<Principal>],
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export interface _SERVICE extends ArtistBucket {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
