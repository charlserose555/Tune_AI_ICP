import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ContentData {
  'title' : string,
  'contentId' : string,
  'duration' : bigint,
  'thumbnail' : Thumbnail,
  'userId' : UserId,
  'createdAt' : Timestamp,
  'size' : bigint,
  'contentCanisterId' : Principal,
  'fileType' : string,
  'playCount' : bigint,
  'userCanisterId' : Principal,
  'chunkCount' : bigint,
  'uploadedAt' : Timestamp,
}
export type ContentId = string;
export interface Thumbnail {
  'file' : Uint8Array | number[],
  'fileType' : string,
}
export type Timestamp = bigint;
export type UserId = Principal;
export type UserId__1 = Principal;
export interface _SERVICE {
  'getAllContentInfo' : ActorMethod<[], Array<[ContentId, ContentData]>>,
  'getAllContentInfoByUserId' : ActorMethod<
    [UserId__1],
    Array<[ContentId, ContentData]>
  >,
  'getAvailableContentId' : ActorMethod<[], bigint>,
  'registerContentInfo' : ActorMethod<[ContentData], [] | [ContentId]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
