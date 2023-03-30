import { config } from '@keystone-6/core';
import { lists } from './schema';
import { session, withAuth } from './auth';

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL,
      enableLogging: true,
      idField: { kind: 'uuid' },
    },
    server: {
      port: 3001,
    },
    lists,
    session,
  })
);
