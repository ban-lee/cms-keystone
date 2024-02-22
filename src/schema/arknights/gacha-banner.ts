import { allOperations } from '@keystone-6/core/access';
import { hasSession } from '../../utils/session';
import { list } from '@keystone-6/core';
import { relationship, select, text } from '@keystone-6/core/fields';
import type { Lists } from '.keystone/types';

export const GachaBanner = list<Lists.Event.TypeInfo, any>({
  access: {
    operation: {
      ...allOperations(hasSession),
    }
  },
  fields: {
    name: text({
      validation: { isRequired: true },
    }),
    type: select({
      type: 'enum',
      validation: { isRequired: true },
      options: [
        // Single Operator rate-up for most events.
        { label: 'Single Standard', value: 'single' },
        // Limited Operator banner for anniversary events.
        { label: 'Limited', value: 'limited' },
        // Collab/Crossover banners; never(?) to re-run.
        { label: 'Collab', value: 'collab' },
        // Joint Operation banner, only listed 6* and 5* will drop.
        { label: 'Joint Operation', value: 'jointop' },
        // Episode Warm-up banner, only listed 6* will drop.
        { label: 'Warm-up', value: 'warmup' },
      ],
    }),
    rateUpOps: relationship({
      label: 'Rate-Up Operators',
      ref: 'Operator.banners',
      many: true,
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    banners: relationship({
      ref: 'Event',
    }),
  },
});
