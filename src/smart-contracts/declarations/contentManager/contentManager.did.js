export const idlFactory = ({ IDL }) => {
  const ContentId = IDL.Text;
  const Thumbnail = IDL.Record({
    'file' : IDL.Vec(IDL.Nat8),
    'fileType' : IDL.Text,
  });
  const UserId = IDL.Principal;
  const Timestamp = IDL.Int;
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
  const UserId__1 = IDL.Principal;
  return IDL.Service({
    'getAllContentInfo' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(ContentId, ContentData))],
        ['query'],
      ),
    'getAllContentInfoByUserId' : IDL.Func(
        [UserId__1],
        [IDL.Vec(IDL.Tuple(ContentId, ContentData))],
        ['query'],
      ),
    'getAvailableContentId' : IDL.Func([], [IDL.Nat], ['query']),
    'registerContentInfo' : IDL.Func([ContentData], [IDL.Opt(ContentId)], []),
  });
};
export const init = ({ IDL }) => { return []; };
