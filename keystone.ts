import { config } from '@keystone-6/core';
import { lists } from './src/schema';
import { session, withAuth } from './src/auth';

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
