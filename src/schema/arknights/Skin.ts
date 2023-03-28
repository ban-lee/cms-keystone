import { allOperations } from '@keystone-6/core/access';
import { group, list } from '@keystone-6/core';
import { hasSession } from '../../utils/session';
import { relationship, select, text } from '@keystone-6/core/fields';

export const Skin = list({
  access: {
    operation: {
      ...allOperations(hasSession),
      query: () => true,
    }
  },
  ui: {
    listView: {
      initialColumns: ['label', 'brand'],
      initialSort: { field: 'label', direction: 'ASC' },
    },
    searchFields: ['name', 'brand', 'operator'],
  },
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    brand: select({
      type: 'string',
      options: [
        { label: 'Test Collection', value: 'testcollection' },
        { label: 'EPOQUE', value: 'epoque' },
        { label: 'Made by 0011', value: 'madeby0011' },
        { label: '0011/Tempest', value: '0011/tempest' },
        { label: 'Coral Coast', value: 'coralcoast' },
        { label: 'MARTHE', value: 'marthe' },
        { label: 'Witch Feast', value: 'witchfeast' },
        { label: 'Cambrian Series', value: 'cambrianseries' },
        { label: 'Icefield Messenger', value: 'icefieldmessenger' },
        { label: 'Vitafield', value: 'vitafield' },
        { label: 'Raythean Pioneer', value: 'raytheanpioneer' },
        { label: 'Raythean Striker', value: 'raytheanstriker' },
        { label: 'Bloodline of Combat', value: 'bloodlineofcombat' },
        { label: 'Rhodes Kitchen', value: 'rhodeskitchen' },
        { label: 'Dreambind Castle', value: 'dreambindcastle' },
        { label: 'Whistlewind', value: 'whistlewind' },
        { label: 'Ambience Synesthesia', value: 'ambiencesynesthesia' },
        { label: 'Collab Series', value: 'collabseries' },
        { label: 'Shining Steps', value: 'shiningsteps' },
        { label: 'Achievement Star', value: 'achievementstar' },
      ],
      ui: {
        displayMode: 'select',
      },
    }),
    operator: relationship({
      ref: 'Operator.skins',
    }),
    ...group({
      label: 'Metadata',
      fields: {
        skinId: text({
          label: 'Skin ID',
        }),
        charId: text({
          label: 'Character ID',
        }),
        imgId: text({
          label: 'Image ID',
        }),
      },
    }),
    label: text({
      hooks: {
        resolveInput: async ({
          item,
          resolvedData,
          context,
        }) => {
          const name = resolvedData.name ?? item!.name;
          const operatorId = resolvedData.operator?.connect?.id ?? item!.operatorId;

          const { name: opName } = await context.query.Operator.findOne({
            where: { id: operatorId },
            query: `name`,
          });

          return `${name} [${opName}]`;
        },
      },
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
  },
});
