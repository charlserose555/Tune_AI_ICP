export const idlFactory = ({ IDL }) => {
  const Timestamp = IDL.Int;
  const ProfilePhoto = IDL.Vec(IDL.Nat8);
  const ArtistAccountData = IDL.Record({
    'userName' : IDL.Opt(IDL.Text),
    'displayName' : IDL.Opt(IDL.Text),
    'createdAt' : Timestamp,
    'profilePhoto' : IDL.Opt(ProfilePhoto),
    'userPrincipal' : IDL.Principal,
  });
  const UserId = IDL.Principal;
  const UserType = IDL.Variant({ 'fan' : IDL.Null, 'artist' : IDL.Null });
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
  return IDL.Service({
    'changeCanisterSize' : IDL.Func([IDL.Nat], [], ['oneway']),
    'changeCycleAmount' : IDL.Func([IDL.Nat], [], ['oneway']),
    'createProfileArtist' : IDL.Func(
        [ArtistAccountData],
        [IDL.Opt(IDL.Principal)],
        [],
      ),
    'cyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'deleteAccountCanister' : IDL.Func(
        [UserId, IDL.Principal, UserType],
        [IDL.Bool],
        [],
      ),
    'getArtistAccountEntries' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(UserId, CanisterId))],
        ['query'],
      ),
    'getAvailableMemoryCanister' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Nat)],
        [],
      ),
    'getCanisterArtist' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Principal)],
        ['query'],
      ),
    'getCanisterStatus' : IDL.Func([], [CanisterStatus], []),
    'getOwnerOfArtistCanister' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserId)],
        ['query'],
      ),
    'getStatus' : IDL.Func(
        [IDL.Opt(StatusRequest)],
        [IDL.Opt(StatusResponse)],
        ['query'],
      ),
    'getTotalArtistAccounts' : IDL.Func([], [IDL.Nat], ['query']),
    'installCode' : IDL.Func(
        [IDL.Principal, IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [],
        [],
      ),
    'transferCyclesToAccountCanister' : IDL.Func(
        [IDL.Principal, IDL.Nat],
        [],
        [],
      ),
    'transferCyclesToCanister' : IDL.Func([IDL.Principal, IDL.Nat], [], []),
    'transferCyclesToContentCanister' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [],
        [],
      ),
    'transferOwnershipArtist' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
