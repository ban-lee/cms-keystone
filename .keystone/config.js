"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var dotenv3 = __toESM(require("dotenv"));
var import_core7 = require("@keystone-6/core");

// schema.ts
var import_access6 = require("@keystone-6/core/access");
var import_fields_document = require("@keystone-6/fields-document");

// src/schema/arknights/Event.ts
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");

// src/utils/cloudinary.ts
var dotenv = __toESM(require("dotenv"));
dotenv.config();
var CLOUDINARY_CONFIG = {
  cloudName: process.env.CLOUDINARY_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET
};

// src/schema/arknights/Event.ts
var import_cloudinary2 = require("@keystone-6/cloudinary");
var import_core = require("@keystone-6/core");

// src/utils/session.ts
function hasSession({ session: session2 }) {
  return Boolean(session2);
}
function isAdminOrSameUser({
  session: session2,
  item
}) {
  if (!session2)
    return false;
  if (session2.data?.isAdmin)
    return true;
  return session2.itemId === item.id;
}
function isAdminOrSameUserFilter({ session: session2 }) {
  if (!session2)
    return false;
  if (session2.data?.isAdmin)
    return {};
  return {
    id: {
      equals: session2.itemId
    }
  };
}
function isAdmin({ session: session2 }) {
  if (session2?.data?.isAdmin)
    return true;
  return false;
}

// src/schema/arknights/Event.ts
var Event = (0, import_core.list)({
  access: {
    operation: {
      ...(0, import_access.allOperations)(hasSession),
      query: () => true
    }
  },
  ui: {
    listView: {
      initialColumns: ["name", "estimatedStart", "days"],
      initialSort: { field: "estimatedStart", direction: "ASC" }
    }
  },
  fields: {
    name: (0, import_fields.text)({
      validation: { isRequired: true }
    }),
    createdDate: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" },
      ui: {
        createView: {
          fieldMode: "hidden"
        },
        itemView: {
          fieldMode: "read",
          fieldPosition: "sidebar"
        }
      }
    }),
    materials: (0, import_fields.relationship)({
      ref: "Material",
      many: true,
      ui: {
        hideCreate: true
      }
    }),
    headerImg: (0, import_cloudinary2.cloudinaryImage)({
      cloudinary: {
        ...CLOUDINARY_CONFIG,
        folder: "ks/ak-headers"
      }
    }),
    ...(0, import_core.group)({
      label: "Dates",
      fields: {
        days: (0, import_fields.integer)({
          label: "Num of Days"
        }),
        cnStart: (0, import_fields.calendarDay)({
          label: "Start (CN)"
        }),
        estimatedStart: (0, import_fields.calendarDay)({}),
        enStart: (0, import_fields.timestamp)({
          label: "Start (EN)"
        }),
        enEnd: (0, import_fields.timestamp)({
          label: "End (EN)"
        })
      }
    }),
    ...(0, import_core.group)({
      label: "Operators",
      fields: {
        freeOp: (0, import_fields.relationship)({
          label: "Free Operator",
          ref: "Operator"
        }),
        bannerOp: (0, import_fields.relationship)({
          label: "Banner",
          ref: "Operator",
          many: true
        })
      }
    }),
    ...(0, import_core.group)({
      label: "Skins",
      fields: {
        freeSkin: (0, import_fields.relationship)({
          ref: "Skin"
        }),
        newSkin: (0, import_fields.relationship)({
          ref: "Skin",
          many: true
        }),
        rerunSkin: (0, import_fields.relationship)({
          ref: "Skin",
          many: true
        }),
        fashionReview: (0, import_fields.checkbox)({})
      }
    })
  }
});

// schema.ts
var import_core6 = require("@keystone-6/core");

// src/schema/arknights/Material.ts
var import_access2 = require("@keystone-6/core/access");
var import_core2 = require("@keystone-6/core");
var import_fields2 = require("@keystone-6/core/fields");
var Material = (0, import_core2.list)({
  access: {
    operation: {
      ...(0, import_access2.allOperations)(hasSession),
      query: () => true
    }
  },
  fields: {
    name: (0, import_fields2.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    rarity: (0, import_fields2.select)({
      type: "enum",
      defaultValue: "t1",
      options: [
        { label: "T1", value: "t1" },
        { label: "T2", value: "t2" },
        { label: "T3", value: "t3" },
        { label: "T4", value: "t4" },
        { label: "T5", value: "t5" },
        { label: "T6", value: "t6" }
      ],
      ui: {
        displayMode: "select"
      }
    }),
    ...(0, import_core2.group)({
      label: "Metadata",
      fields: {
        itemId: (0, import_fields2.text)({
          label: "Item ID"
        }),
        sortId: (0, import_fields2.text)({
          label: "Sort ID"
        }),
        imgId: (0, import_fields2.text)({
          label: "Image ID"
        })
      }
    })
  }
});

// src/schema/arknights/Operator.ts
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var import_core3 = require("@keystone-6/core");
var Operator = (0, import_core3.list)({
  access: {
    operation: {
      ...(0, import_access3.allOperations)(hasSession),
      query: () => true
    }
  },
  ui: {
    searchFields: ["name", "class", "archetype"],
    listView: {
      initialColumns: ["name", "rarity", "class"],
      initialSort: { field: "rarity", direction: "ASC" }
    }
  },
  fields: {
    name: (0, import_fields3.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    rarity: (0, import_fields3.integer)({
      defaultValue: 1,
      validation: {
        isRequired: true,
        min: 1,
        max: 6
      }
    }),
    class: (0, import_fields3.select)({
      type: "enum",
      options: [
        { label: "Vanguard", value: "vanguard" },
        { label: "Guard", value: "guard" },
        { label: "Defender", value: "defender" },
        { label: "Sniper", value: "sniper" },
        { label: "Caster", value: "caster" },
        { label: "Medic", value: "medic" },
        { label: "Supporter", value: "supporter" },
        { label: "Specialist", value: "specialist" }
      ],
      ui: {
        displayMode: "select"
      }
    }),
    archetype: (0, import_fields3.select)({
      type: "enum",
      options: [
        { label: "Abjurer", value: "abjurer" },
        { label: "Agent", value: "agent" },
        { label: "Ambusher", value: "ambusher" },
        { label: "Artificer", value: "artificer" },
        { label: "Artilleryman", value: "artilleryman" },
        { label: "Arts Fighter", value: "artsfighter" },
        { label: "Arts Protector", value: "artsprotector" },
        { label: "Bard", value: "bard" },
        { label: "Besieger", value: "besieger" },
        { label: "Blast Caster", value: "blastcaster" },
        { label: "Centurion", value: "centurion" },
        { label: "Chain Caster", value: "chaincaster" },
        { label: "Chain Healer", value: "chainhealer" },
        { label: "Charger", value: "charger" },
        { label: "Core Caster", value: "corecaster" },
        { label: "Crusher", value: "crusher" },
        { label: "Deadeye", value: "deadeye" },
        { label: "Decel Binder", value: "decelbinder" },
        { label: "Dollkeeper", value: "dollkeeper" },
        { label: "Dreadnought", value: "dreadnought" },
        { label: "Duelist", value: "duelist" },
        { label: "Executor", value: "executor" },
        { label: "Fighter", value: "fighter" },
        { label: "Flinger", value: "flinger" },
        { label: "Fortress", value: "fortress" },
        { label: "Geek", value: "geek" },
        { label: "Guardian", value: "guardian" },
        { label: "Heavyshooter", value: "heavyshooter" },
        { label: "Hexer", value: "hexer" },
        { label: "Hookmaster", value: "hookmaster" },
        { label: "Incantation Medic", value: "incantationmedic" },
        { label: "Instructor", value: "instructor" },
        { label: "Juggernaut", value: "juggernaut" },
        { label: "Liberator", value: "liberator" },
        { label: "Lord", value: "lord" },
        { label: "Marksman", value: "marksman" },
        { label: "Mech-Accord", value: "mechaccord" },
        { label: "Medic", value: "medic" },
        { label: "Merchant", value: "merchant" },
        { label: "Multi-target Medic", value: "multitargetmedic" },
        { label: "Musha", value: "musha" },
        { label: "Mystic Caster", value: "mysticcaster" },
        { label: "Phalanx Caster", value: "phalanxcaster" },
        { label: "Pioneer", value: "pioneer" },
        { label: "Protector", value: "protector" },
        { label: "Push Stroker", value: "pushstroker" },
        { label: "Reaper", value: "reaper" },
        { label: "Sacrificial Specialist", value: "sacrificialspecialist" },
        { label: "Splash Caster", value: "splashcaster" },
        { label: "Spreadshooter", value: "spreadshooter" },
        { label: "Standard Bearer", value: "standardbearer" },
        { label: "Summoner", value: "summoner" },
        { label: "Swordmaster", value: "swordmaster" },
        { label: "Tactician", value: "tactician" },
        { label: "Therapist", value: "therapist" },
        { label: "Trapmaster", value: "trapmaster" },
        { label: "Wandering Medic", value: "wanderingmedic" }
      ],
      ui: {
        displayMode: "select"
      }
    }),
    charId: (0, import_fields3.text)({
      label: "Character ID"
    }),
    /**
     *
     * Relationships
     *
     */
    skins: (0, import_fields3.relationship)({
      ref: "Skin.operator",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "brand"],
        linkToItem: true,
        inlineConnect: true
      },
      many: true
    })
  }
});

// src/schema/arknights/Skin.ts
var import_access4 = require("@keystone-6/core/access");
var import_core4 = require("@keystone-6/core");
var import_fields4 = require("@keystone-6/core/fields");
var Skin = (0, import_core4.list)({
  access: {
    operation: {
      ...(0, import_access4.allOperations)(hasSession),
      query: () => true
    }
  },
  ui: {
    listView: {
      initialColumns: ["label", "brand"],
      initialSort: { field: "label", direction: "ASC" }
    },
    searchFields: ["name", "brand", "operator"]
  },
  fields: {
    name: (0, import_fields4.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    brand: (0, import_fields4.select)({
      type: "string",
      options: [
        { label: "Test Collection", value: "testcollection" },
        { label: "EPOQUE", value: "epoque" },
        { label: "Made by 0011", value: "madeby0011" },
        { label: "0011/Tempest", value: "0011/tempest" },
        { label: "Coral Coast", value: "coralcoast" },
        { label: "MARTHE", value: "marthe" },
        { label: "Witch Feast", value: "witchfeast" },
        { label: "Cambrian Series", value: "cambrianseries" },
        { label: "Icefield Messenger", value: "icefieldmessenger" },
        { label: "Vitafield", value: "vitafield" },
        { label: "Raythean Pioneer", value: "raytheanpioneer" },
        { label: "Raythean Striker", value: "raytheanstriker" },
        { label: "Bloodline of Combat", value: "bloodlineofcombat" },
        { label: "Rhodes Kitchen", value: "rhodeskitchen" },
        { label: "Dreambind Castle", value: "dreambindcastle" },
        { label: "Whistlewind", value: "whistlewind" },
        { label: "Ambience Synesthesia", value: "ambiencesynesthesia" },
        { label: "Collab Series", value: "collabseries" },
        { label: "Shining Steps", value: "shiningsteps" },
        { label: "Achievement Star", value: "achievementstar" }
      ],
      ui: {
        displayMode: "select"
      }
    }),
    operator: (0, import_fields4.relationship)({
      ref: "Operator.skins"
    }),
    ...(0, import_core4.group)({
      label: "Metadata",
      fields: {
        skinId: (0, import_fields4.text)({
          label: "Skin ID"
        }),
        charId: (0, import_fields4.text)({
          label: "Character ID"
        }),
        imgId: (0, import_fields4.text)({
          label: "Image ID"
        })
      }
    }),
    label: (0, import_fields4.text)({
      hooks: {
        resolveInput: async ({
          item,
          resolvedData,
          context
        }) => {
          const name = resolvedData.name ?? item.name;
          const operatorId = resolvedData.operator?.connect?.id ?? item.operatorId;
          const { name: opName } = await context.query.Operator.findOne({
            where: { id: operatorId },
            query: `name`
          });
          return `${name} [${opName}]`;
        }
      },
      ui: {
        createView: {
          fieldMode: "hidden"
        },
        itemView: {
          fieldMode: "hidden"
        }
      }
    })
  }
});

// src/schema/admin/User.ts
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var import_core5 = require("@keystone-6/core");
var User = (0, import_core5.list)({
  access: {
    operation: {
      create: import_access5.allowAll,
      query: import_access5.allowAll,
      // only allow users to update _anything_, but what they can update is limited by
      //   the access.filter.* and access.item.* access controls
      update: hasSession,
      // only allow admins to delete users
      delete: isAdmin
    },
    filter: {
      update: isAdminOrSameUserFilter
    }
  },
  ui: {
    // only show deletion options for admins
    hideDelete: (args) => !isAdmin(args),
    listView: {
      // the default columns that will be displayed in the list view
      initialColumns: ["name", "email", "isAdmin"]
    }
  },
  fields: {
    // the user's name, publicly visible
    name: (0, import_fields5.text)({ validation: { isRequired: true } }),
    // the user's email address, used as the identity field for authentication
    //   should not be publicly visible
    //
    //   we use isIndexed to enforce this email is unique
    email: (0, import_fields5.text)({
      access: {
        // only the respective user, or an admin can read this field
        read: isAdminOrSameUser,
        // only admins can update this field
        update: isAdmin
      },
      isFilterable: false,
      isOrderable: false,
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields5.password)({
      access: {
        update: isAdminOrSameUser
      },
      ui: {
        itemView: {
          // don't show this field if it isn't relevant
          fieldMode: (args) => isAdminOrSameUser(args) ? "edit" : "hidden"
        },
        listView: {
          fieldMode: "hidden"
        }
      },
      validation: { isRequired: true }
    }),
    // a flag to indicate if this user is an admin
    //  should not be publicly visible
    isAdmin: (0, import_fields5.checkbox)({
      access: {
        // only the respective user, or an admin can read this field
        read: isAdminOrSameUser,
        // only admins can create, or update this field
        create: isAdmin,
        update: isAdmin
      },
      defaultValue: false,
      ui: {
        // only admins can edit this field
        createView: {
          fieldMode: (args) => isAdmin(args) ? "edit" : "hidden"
        },
        itemView: {
          fieldMode: (args) => isAdmin(args) ? "edit" : "read"
        }
      }
    }),
    createdAt: (0, import_fields5.timestamp)({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: "now" }
    }),
    /**
     *
     * Relationships
     *
     */
    // we can use this field to see what Posts this User has authored
    //   more on that in the Post list below
    posts: (0, import_fields5.relationship)({ ref: "Post.author", many: true })
  }
});

// schema.ts
var import_fields6 = require("@keystone-6/core/fields");
var lists = {
  User,
  Post: (0, import_core6.list)({
    access: import_access6.allowAll,
    // this is the fields for our Post list
    fields: {
      title: (0, import_fields6.text)({ validation: { isRequired: true } }),
      // the document field can be used for making rich editable content
      //   you can find out more at https://keystonejs.com/docs/guides/document-fields
      content: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      // with this field, you can set a User as the author for a Post
      author: (0, import_fields6.relationship)({
        // we could have used 'User', but then the relationship would only be 1-way
        ref: "User.posts",
        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        // a Post can only have one author
        //   this is the default, but we show it here for verbosity
        many: false
      }),
      // with this field, you can add some Tags to Posts
      tags: (0, import_fields6.relationship)({
        // we could have used 'Tag', but then the relationship would only be 1-way
        ref: "Tag.posts",
        // a Post can have many Tags, not just one
        many: true,
        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      })
    }
  }),
  // this last list is our Tag list, it only has a name field for now
  Tag: (0, import_core6.list)({
    access: import_access6.allowAll,
    // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
    ui: {
      isHidden: true
    },
    // this is the fields for our Tag list
    fields: {
      name: (0, import_fields6.text)(),
      // this can be helpful to find out all the Posts associated with a Tag
      posts: (0, import_fields6.relationship)({ ref: "Post.tags", many: true })
    }
  }),
  Event,
  Material,
  Operator,
  Skin
};

// auth.ts
var dotenv2 = __toESM(require("dotenv"));
var import_auth = require("@keystone-6/auth");
var import_session6 = require("@keystone-6/core/session");
dotenv2.config();
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "name isAdmin"
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session6.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET
});

// keystone.ts
dotenv3.config();
var keystone_default = withAuth(
  (0, import_core7.config)({
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL,
      enableLogging: true,
      idField: { kind: "uuid" }
    },
    server: {
      port: 3001
    },
    lists,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
