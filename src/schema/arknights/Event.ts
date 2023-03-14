import { allOperations } from '@keystone-6/core/access';
import {
  calendarDay,
  checkbox,
  integer,
  relationship,
  text,
  timestamp
  } from '@keystone-6/core/fields';
import { CLOUDINARY_CONFIG } from '../../utils/cloudinary';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { group, list } from '@keystone-6/core';
import { hasSession } from '../../utils/session';

export const Event = list({
  access: {
    operation: {
      ...allOperations(hasSession),
      query: () => true,
    }
  },
  fields: {
    name: text({
      validation: { isRequired: true },
    }),
    materials: relationship({
      ref: 'Material',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    headerImg: cloudinaryImage({
      cloudinary: {
        ...CLOUDINARY_CONFIG,
        folder: 'ak-headers',
      },
    }),
    ...group({
      label: 'Dates',
      fields: {
        days: integer({
          label: 'Num of Days',
        }),
        cnStart: calendarDay({
          label: 'Start (CN)',
        }),
        estimatedStart: calendarDay({}),
        enStart: timestamp({
          label: 'Start (EN)',
        }),
        enEnd: timestamp({
          label: 'End (EN)',
        }),
      },
    }),
    ...group({
      label: 'Operators',
      fields: {
        freeOp: relationship({
          label: 'Free Operator',
          ref: 'Operator',
        }),
        bannerOp: relationship({
          label: 'Banner',
          ref: 'Operator',
          many: true,
        }),
      },
    }),
    ...group({
      label: 'Skins',
      fields: {
        freeSkin: relationship({
          ref: 'Skin',
        }),
        newSkin: relationship({
          ref: 'Skin',
          many: true,
        }),
        rerunSkin: relationship({
          ref: 'Skin',
          many: true,
        }),
        fashionReview: checkbox({}),
      },
    }),
  },
});
