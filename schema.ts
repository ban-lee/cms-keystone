import { Event } from './src/schema/arknights/Event';
import { Material } from './src/schema/arknights/Material';
import { Operator } from './src/schema/arknights/Operator';
import { Skin } from './src/schema/arknights/Skin';
import { User } from './src/schema/admin/User';
import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User,

  // Arknights
  Event,
  Material,
  Operator,
  Skin,
};
