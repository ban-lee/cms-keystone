import { allOperations } from '@keystone-6/core/access';
import { hasSession } from '../../utils/session';
import { integer, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const Operator = list({
  access: {
    operation: {
      ...allOperations(hasSession),
      query: () => true,
    }
  },
  ui: {
    searchFields: ['name', 'searchableName'],
    listView: {
      initialColumns: ['name', 'rarity', 'class'],
      initialSort: { field: 'rarity', direction: 'ASC' },
    },
  },
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    searchableName: text(),
    rarity: integer({
      defaultValue: 1,
      validation: {
        isRequired: true,
        min: 1,
        max: 6,
      },
    }),
    class: select({
      type: 'enum',
      options: [
        { label: 'Vanguard', value: 'vanguard' },
        { label: 'Guard', value: 'guard' },
        { label: 'Defender', value: 'defender' },
        { label: 'Sniper', value: 'sniper' },
        { label: 'Caster', value: 'caster' },
        { label: 'Medic', value: 'medic' },
        { label: 'Supporter', value: 'supporter' },
        { label: 'Specialist', value: 'specialist' },
      ],
      ui: {
        displayMode: 'select',
      },
    }),
    archetype: select({
      type: 'enum',
      options: [
        { label: 'Abjurer', value: 'abjurer' },
        { label: 'Agent', value: 'agent' },
        { label: 'Ambusher', value: 'ambusher' },
        { label: 'Artificer', value: 'artificer' },
        { label: 'Artilleryman', value: 'artilleryman' },
        { label: 'Arts Fighter', value: 'artsfighter' },
        { label: 'Arts Protector', value: 'artsprotector' },
        { label: 'Bard', value: 'bard' },
        { label: 'Besieger', value: 'besieger' },
        { label: 'Blast Caster', value: 'blastcaster' },
        { label: 'Centurion', value: 'centurion' },
        { label: 'Chain Caster', value: 'chaincaster' },
        { label: 'Chain Healer', value: 'chainhealer' },
        { label: 'Charger', value: 'charger' },
        { label: 'Core Caster', value: 'corecaster' },
        { label: 'Crusher', value: 'crusher' },
        { label: 'Deadeye', value: 'deadeye' },
        { label: 'Decel Binder', value: 'decelbinder' },
        { label: 'Dollkeeper', value: 'dollkeeper' },
        { label: 'Dreadnought', value: 'dreadnought' },
        { label: 'Duelist', value: 'duelist' },
        { label: 'Executor', value: 'executor' },
        { label: 'Fighter', value: 'fighter' },
        { label: 'Flinger', value: 'flinger' },
        { label: 'Fortress', value: 'fortress' },
        { label: 'Geek', value: 'geek' },
        { label: 'Guardian', value: 'guardian' },
        { label: 'Heavyshooter', value: 'heavyshooter' },
        { label: 'Hexer', value: 'hexer' },
        { label: 'Hookmaster', value: 'hookmaster' },
        { label: 'Incantation Medic', value: 'incantationmedic' },
        { label: 'Instructor', value: 'instructor' },
        { label: 'Juggernaut', value: 'juggernaut' },
        { label: 'Liberator', value: 'liberator' },
        { label: 'Lord', value: 'lord' },
        { label: 'Marksman', value: 'marksman' },
        { label: 'Mech-Accord', value: 'mechaccord' },
        { label: 'Medic', value: 'medic' },
        { label: 'Merchant', value: 'merchant' },
        { label: 'Multi-target Medic', value: 'multitargetmedic' },
        { label: 'Musha', value: 'musha' },
        { label: 'Mystic Caster', value: 'mysticcaster' },
        { label: 'Phalanx Caster', value: 'phalanxcaster' },
        { label: 'Pioneer', value: 'pioneer' },
        { label: 'Protector', value: 'protector' },
        { label: 'Push Stroker', value: 'pushstroker' },
        { label: 'Reaper', value: 'reaper' },
        { label: 'Sacrificial Specialist', value: 'sacrificialspecialist' },
        { label: 'Splash Caster', value: 'splashcaster' },
        { label: 'Spreadshooter', value: 'spreadshooter' },
        { label: 'Standard Bearer', value: 'standardbearer' },
        { label: 'Summoner', value: 'summoner' },
        { label: 'Swordmaster', value: 'swordmaster' },
        { label: 'Tactician', value: 'tactician' },
        { label: 'Therapist', value: 'therapist' },
        { label: 'Trapmaster', value: 'trapmaster' },
        { label: 'Wandering Medic', value: 'wanderingmedic' },
      ],
      ui: {
        displayMode: 'select',
      },
    }),
    charId: text({
      label: 'Character ID',
    }),

    /**
     *
     * Relationships
     *
     */
    skins: relationship({
      ref: 'Skin.operator',
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'brand'],
        linkToItem: true,
        inlineConnect: true,
      },
      many: true,
    }),
  },
});
