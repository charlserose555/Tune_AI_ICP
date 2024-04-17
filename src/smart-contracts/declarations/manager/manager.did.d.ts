import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

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
export interface PrincipalInfo {
  'createdAt' : Timestamp,
  'userPrincipal' : Principal,
}
export type Timestamp = bigint;
export type UserId = Principal;
export interface definite_canister_settings {
  'freezing_threshold' : bigint,
  'controllers' : [] | [Array<Principal>],
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export interface _SERVICE {
  'createAccountCanister' : ActorMethod<[PrincipalInfo], [] | [Principal]>,
  'cyclesBalance' : ActorMethod<[], bigint>,
  'deleteAccountCanister' : ActorMethod<[UserId, Principal], boolean>,
  'getArtistList' : ActorMethod<[], Array<[UserId, CanisterId]>>,
  'getCanisterStatus' : ActorMethod<[], CanisterStatus>,
  'getCanisterWtihAvailableMemory' : ActorMethod<[Principal], [] | [bigint]>,
  'getCanisterbyIdentity' : ActorMethod<[Principal], [] | [Principal]>,
  'getOwnershipOfCanister' : ActorMethod<[Principal], [] | [UserId]>,
  'getTotalAccounts' : ActorMethod<[], bigint>,
  'installCode' : ActorMethod<
    [Principal, Uint8Array | number[], Uint8Array | number[]],
    undefined
  >,
  'transferCyclesToAccountCanister' : ActorMethod<
    [Principal, bigint],
    undefined
  >,
  'transferCyclesToCanister' : ActorMethod<[Principal, bigint], undefined>,
  'transferOwnershipAccountCanister' : ActorMethod<
    [Principal, Principal],
    undefined
  >,
  'updateCanisterSize' : ActorMethod<[bigint], undefined>,
  'updateCycleAmount' : ActorMethod<[bigint], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
