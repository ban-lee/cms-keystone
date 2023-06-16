import { Event } from './schema/arknights/event';
import { GachaBanner } from './schema/arknights/gacha-banner';
import { Material } from './schema/arknights/material';
import { Operator } from './schema/arknights/operator';
import { Skin } from './schema/arknights/skin';
import { User } from './schema/admin/user';
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
