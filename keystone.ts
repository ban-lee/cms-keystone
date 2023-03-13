import * as dotenv from 'dotenv';
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { session, withAuth } from './auth';

dotenv.config();

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DB_URL,
      enableLogging: true,
      idField: { kind: 'uuid' },
    },
    lists,
    session,
  })
);
