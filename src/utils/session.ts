import type { Lists } from '.keystone/types';

interface Session {
  itemId: string;
  data?: {
    isAdmin: boolean;
  };
};

export function hasSession({ session }: { session?: Session }) {
  return Boolean(session);
}

export function isAdminOrSameUser({
  session,
  item,
}: {
  session?: Session;
  item: Lists.User.Item;
}) {
  // you need to have a session to do this
  if (!session) return false;

  // admins can do anything
  if (session.data?.isAdmin) return true;

  // the authenticated user needs to be equal to the user we are updating
  return session.itemId === item.id;
}

export function isAdminOrSameUserFilter({ session }: { session?: Session }) {
  // you need to have a session to do this
  if (!session) return false;

  // admins can see everything
  if (session.data?.isAdmin) return {};

  // the authenticated user can only see themselves
  return {
    id: {
      equals: session.itemId,
    },
  };
}

export function isAdmin({ session }: { session?: Session}) {
  // admins can do anything
  if (session?.data?.isAdmin) return true;

  return false;
}
