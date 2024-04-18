export const idlFactory = ({ IDL }) => {
  const Thumbnail = IDL.Record({
    'file' : IDL.Vec(IDL.Nat8),
    'fileType' : IDL.Text,
  });
  const UserId = IDL.Principal;
  const Timestamp = IDL.Int;
  const ContentInit = IDL.Record({
    'title' : IDL.Text,
    'duration' : IDL.Nat,
    'thumbnail' : Thumbnail,
    'userId' : UserId,
    'createdAt' : Timestamp,
    'size' : IDL.Nat,
    'fileType' : IDL.Text,
    'userCanisterId' : IDL.Principal,
    'chunkCount' : IDL.Nat,
  });
  const ContentId = IDL.Text;
  const ContentData = IDL.Record({
    'title' : IDL.Text,
    'contentId' : IDL.Text,
    'duration' : IDL.Nat,
    'thumbnail' : Thumbnail,
    'userId' : UserId,
    'createdAt' : Timestamp,
    'size' : IDL.Nat,
    'contentCanisterId' : IDL.Principal,
    'fileType' : IDL.Text,
    'playCount' : IDL.Nat,
    'userCanisterId' : IDL.Principal,
    'chunkCount' : IDL.Nat,
    'uploadedAt' : Timestamp,
  });
  const definite_canister_settings = IDL.Record({
    'freezing_threshold' : IDL.Nat,
    'controllers' : IDL.Opt(IDL.Vec(IDL.Principal)),
    'memory_allocation' : IDL.Nat,
    'compute_allocation' : IDL.Nat,
  });
  const CanisterStatus = IDL.Record({
    'status' : IDL.Variant({
      'stopped' : IDL.Null,
      'stopping' : IDL.Null,
      'running' : IDL.Null,
    }),
    'memory_size' : IDL.Nat,
    'cycles' : IDL.Nat,
    'settings' : definite_canister_settings,
    'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const StatusRequest = IDL.Record({
    'memory_size' : IDL.Bool,
    'version' : IDL.Bool,
    'cycles' : IDL.Bool,
    'heap_memory_size' : IDL.Bool,
  });
  const StatusResponse = IDL.Record({
    'memory_size' : IDL.Opt(IDL.Nat),
    'version' : IDL.Opt(IDL.Nat),
    'cycles' : IDL.Opt(IDL.Nat),
    'heap_memory_size' : IDL.Opt(IDL.Nat),
  });
  const ArtistContentBucket = IDL.Service({
    'changeCanisterSize' : IDL.Func([IDL.Nat], [], ['oneway']),
    'changeCycleAmount' : IDL.Func([IDL.Nat], [], ['oneway']),
    'checkCyclesBalance' : IDL.Func([], [], []),
    'createContent' : IDL.Func(
        [ContentInit, IDL.Nat],
        [IDL.Opt(IDL.Tuple(ContentId, ContentData))],
        [],
      ),
    'getAllContentInfo' : IDL.Func(
        [ContentId],
        [IDL.Vec(IDL.Tuple(ContentId, ContentData))],
        ['query'],
      ),
    'getCanisterStatus' : IDL.Func([], [CanisterStatus], []),
    'getContentChunk' : IDL.Func(
        [ContentId, IDL.Nat],
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        ['query'],
      ),
    'getContentInfo' : IDL.Func([ContentId], [IDL.Opt(ContentData)], ['query']),
    'getCurrentCyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'getPrincipalThis' : IDL.Func([], [IDL.Principal], ['query']),
    'getStatus' : IDL.Func(
        [IDL.Opt(StatusRequest)],
        [IDL.Opt(StatusResponse)],
        ['query'],
      ),
    'putContentChunk' : IDL.Func(
        [ContentId, IDL.Nat, IDL.Vec(IDL.Nat8)],
        [IDL.Nat],
        [],
      ),
    'removeContent' : IDL.Func([ContentId, IDL.Nat], [], []),
    'transferCyclesToThisCanister' : IDL.Func([], [], []),
    'transferFreezingThresholdCycles' : IDL.Func([], [], []),
  });
  return ArtistContentBucket;
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Principal, IDL.Principal];
};
