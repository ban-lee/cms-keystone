import { allOperations } from '@keystone-6/core/access';
import { group, list } from '@keystone-6/core';
import { hasSession } from '../../utils/session';
import { relationship, select, text } from '@keystone-6/core/fields';

export const Material = list({
  access: {
    operation: {
      ...allOperations(hasSession),
      query: () => true,
    }
  },
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    rarity: select({
      type: 'enum',
      defaultValue: 't1',
      options: [
        { label: 'T1', value: 't1', },
        { label: 'T2', value: 't2', },
        { label: 'T3', value: 't3', },
        { label: 'T4', value: 't4', },
        { label: 'T5', value: 't5', },
        { label: 'T6', value: 't6', },
      ],
      ui: {
        displayMode: 'select',
      },
    }),
    ...group({
      label: 'Metadata',
      fields: {
        itemId: text({
          label: 'Item ID',
        }),
        sortId: text({
          label: 'Sort ID',
        }),
        imgId: text({
          label: 'Image ID',
        }),
      },
    }),
  },
});
