import * as dotenv from 'dotenv';
import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

dotenv.config();

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',

  sessionData: 'name isAdmin',

  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    fields: ['name', 'email', 'password'],

    // the following fields are configured by default for this item
    itemData: {
      isAdmin: true,
    },
  },
});

const sessionMaxAge = 60 * 60 * 24 * 30;

// you can find out more at https://keystonejs.com/docs/apis/session#session-api
const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET,
});

export { withAuth, session };
