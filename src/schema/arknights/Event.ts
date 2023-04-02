import { allOperations } from '@keystone-6/core/access';
import {
  calendarDay,
  checkbox,
  integer,
  relationship,
  select,
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
  ui: {
    listView: {
      initialColumns: ['name', 'estimatedStart', 'days'],
      initialSort: { field: 'estimatedStart', direction: 'ASC' },
    },
  },
  fields: {
    name: text({
      validation: { isRequired: true },
    }),
    createdDate: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'read',
          fieldPosition: 'sidebar',
        },
      },
    }),
    materials: relationship({
      ref: 'Material',
      many: true,
      ui: {
        hideCreate: true,
      },
    }),
    ...group({
      label: 'Header',
      fields: {
        headerImg: cloudinaryImage({
          cloudinary: {
            ...CLOUDINARY_CONFIG,
            folder: 'ks/ak-headers',
          },
        }),
        topColour: text(),
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
        bannerType: select({
          type: 'enum',
          options: [
            { label: 'Single Standard', value: 'single' },
            { label: 'Limited', value: 'limited' },
            { label: 'Special Collab', value: 'spcollab' },
            { label: 'Joint Operation', value: 'jointop' },
            { label: 'None', value: 'none' },
          ],
        }),
        bannerOp: relationship({
          label: 'Banner Operators',
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
