import { Event } from './src/schema/arknights/event';
import { GachaBanner } from './src/schema/arknights/gacha-banner';
import { Material } from './src/schema/arknights/material';
import { Operator } from './src/schema/arknights/operator';
import { Skin } from './src/schema/arknights/skin';
import { User } from './src/schema/admin/user';
import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User,

  // Arknights
  Event,
  GachaBanner,
  Material,
  Operator,
  Skin,
};
