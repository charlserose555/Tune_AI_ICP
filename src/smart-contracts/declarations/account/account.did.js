export const idlFactory = ({ IDL }) => {
  const Timestamp = IDL.Int;
  const PrincipalInfo = IDL.Record({
    'createdAt' : Timestamp,
    'userPrincipal' : IDL.Principal,
  });
  const UserId__1 = IDL.Principal;
  const FileExtension = IDL.Variant({
    'aac' : IDL.Null,
    'avi' : IDL.Null,
    'gif' : IDL.Null,
    'jpg' : IDL.Null,
    'mp3' : IDL.Null,
    'mp4' : IDL.Null,
    'png' : IDL.Null,
    'svg' : IDL.Null,
    'wav' : IDL.Null,
    'jpeg' : IDL.Null,
  });
  const ContentInit = IDL.Record({
    'contentId' : IDL.Text,
    'userId' : UserId__1,
    'name' : IDL.Text,
    'createdAt' : Timestamp,
    'size' : IDL.Nat,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
    'chunkCount' : IDL.Nat,
    'extension' : FileExtension,
  });
  const ContentId = IDL.Text;
  const ProfilePhoto = IDL.Vec(IDL.Nat8);
  const ArtistAccountData = IDL.Record({
    'userName' : IDL.Text,
    'displayName' : IDL.Text,
    'createdAt' : Timestamp,
    'fileType' : IDL.Opt(IDL.Text),
    'updatedAt' : Timestamp,
    'userPrincipal' : IDL.Principal,
    'avatar' : IDL.Opt(ProfilePhoto),
  });
  const UserId = IDL.Principal;
  const CanisterId = IDL.Principal;
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
  const ArtistBucket = IDL.Service({
    'changeCanisterSize' : IDL.Func([IDL.Nat], [], ['oneway']),
    'changeCycleAmount' : IDL.Func([IDL.Nat], [], ['oneway']),
    'createContent' : IDL.Func(
        [ContentInit],
        [IDL.Opt(IDL.Tuple(ContentId, IDL.Principal))],
        [],
      ),
    'createProfileInfo' : IDL.Func(
        [IDL.Opt(ArtistAccountData)],
        [IDL.Bool],
        [],
      ),
    'deleteAccount' : IDL.Func([IDL.Principal], [], []),
    'deleteContentCanister' : IDL.Func([UserId, IDL.Principal], [IDL.Bool], []),
    'getAllContentCanisters' : IDL.Func([], [IDL.Vec(CanisterId)], ['query']),
    'getCanisterOfContent' : IDL.Func(
        [ContentId],
        [IDL.Opt(CanisterId)],
        ['query'],
      ),
    'getCanisterStatus' : IDL.Func([], [CanisterStatus], []),
    'getCurrentCyclesBalance' : IDL.Func([], [IDL.Nat], []),
    'getEntriesOfCanisterToContent' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(CanisterId, ContentId))],
        ['query'],
      ),
    'getPrincipalThis' : IDL.Func([], [IDL.Principal], ['query']),
    'getProfileInfo' : IDL.Func(
        [UserId],
        [IDL.Opt(ArtistAccountData)],
        ['query'],
      ),
    'getStatus' : IDL.Func(
        [IDL.Opt(StatusRequest)],
        [IDL.Opt(StatusResponse)],
        ['query'],
      ),
    'removeContent' : IDL.Func([ContentId, IDL.Nat], [], []),
    'transferFreezingThresholdCycles' : IDL.Func([], [], []),
    'updateProfileInfo' : IDL.Func([ArtistAccountData], [IDL.Bool], []),
  });
  return ArtistBucket;
};
export const init = ({ IDL }) => {
  const Timestamp = IDL.Int;
  const PrincipalInfo = IDL.Record({
    'createdAt' : Timestamp,
    'userPrincipal' : IDL.Principal,
  });
  return [IDL.Opt(PrincipalInfo), IDL.Principal, IDL.Principal];
};
