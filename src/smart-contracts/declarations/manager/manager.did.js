export const idlFactory = ({ IDL }) => {
  const Timestamp = IDL.Int;
  const PrincipalInfo = IDL.Record({
    'createdAt' : Timestamp,
    'userPrincipal' : IDL.Principal,
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
  return IDL.Service({
    'createAccountCanister' : IDL.Func(
        [PrincipalInfo],
        [IDL.Opt(IDL.Principal)],
        [],
      ),
    'cyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'deleteAccountCanister' : IDL.Func([UserId, IDL.Principal], [IDL.Bool], []),
    'getArtistList' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(UserId, CanisterId))],
        ['query'],
      ),
    'getCanisterStatus' : IDL.Func([], [CanisterStatus], []),
    'getCanisterWtihAvailableMemory' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Nat)],
        [],
      ),
    'getCanisterbyIdentity' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Principal)],
        ['query'],
      ),
    'getOwnershipOfCanister' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserId)],
        ['query'],
      ),
    'getTotalAccounts' : IDL.Func([], [IDL.Nat], ['query']),
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
    'transferOwnershipAccountCanister' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [],
        [],
      ),
    'updateCanisterSize' : IDL.Func([IDL.Nat], [], ['oneway']),
    'updateCycleAmount' : IDL.Func([IDL.Nat], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
