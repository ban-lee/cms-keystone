import { allowAll } from '@keystone-6/core/access';
import { checkbox, password, relationship, text, timestamp } from '@keystone-6/core/fields';
import { hasSession, isAdmin, isAdminOrSameUser, isAdminOrSameUserFilter } from '../../utils/session';
import { list } from '@keystone-6/core';
import type { ListConfig } from '@keystone-6/core/types';
import type { Lists } from '.keystone/types';

export const User: ListConfig<Lists.User.TypeInfo, any> = list({
  access: {
    operation: {
      create: isAdmin,
      query: allowAll,
      // only allow users to update _anything_, but what they can update is limited by
      //   the access.filter.* and access.item.* access controls
      update: hasSession,
      delete: isAdmin,
    },
    filter: {
      update: isAdminOrSameUserFilter,
    },
  },
  ui: {
    // only show deletion options for admins
    hideDelete: args => !isAdmin(args),
    listView: {
      // the default columns that will be displayed in the list view
      initialColumns: ['name', 'email', 'isAdmin'],
    },
  },
  fields: {
    // the user's name, publicly visible
    name: text({ validation: { isRequired: true } }),

      // the user's email address, used as the identity field for authentication
      //   should not be publicly visible
      //
      //   we use isIndexed to enforce this email is unique
    email: text({
      access: {
        // only the respective user, or an admin can read this field
        read: isAdminOrSameUser,

        // only admins can update this field
        update: isAdmin,
      },
      isFilterable: false,
      isOrderable: false,
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),

    password: password({
      access: {
        update: isAdminOrSameUser,
      },
      ui: {
        itemView: {
          // don't show this field if it isn't relevant
          fieldMode: (args) => (isAdminOrSameUser(args) ? 'edit' : 'hidden'),
        },
        listView: {
          fieldMode: 'hidden',
        },
      },
      validation: { isRequired: true },
    }),

    // a flag to indicate if this user is an admin
    //  should not be publicly visible
    isAdmin: checkbox({
      access: {
        // only the respective user, or an admin can read this field
        read: isAdminOrSameUser,

        // only admins can create, or update this field
        create: isAdmin,
        update: isAdmin,
      },
      defaultValue: false,
      ui: {
        // only admins can edit this field
        createView: {
          fieldMode: (args) => (isAdmin(args) ? 'edit' : 'hidden'),
        },
        itemView: {
          fieldMode: (args) => (isAdmin(args) ? 'edit' : 'read'),
        },
      },
    }),

    createdAt: timestamp({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: 'now' },
    }),
  },
});
