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
var dotenv2 = __toESM(require("dotenv"));
var import_core4 = require("@keystone-6/core");

// schema.ts
var import_access3 = require("@keystone-6/core/access");
var import_fields_document = require("@keystone-6/fields-document");
var import_core3 = require("@keystone-6/core");

// src/schema/arknights/Operator.ts
var import_access = require("@keystone-6/core/access");

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

// src/schema/arknights/Operator.ts
var import_fields = require("@keystone-6/core/fields");
var import_core = require("@keystone-6/core");
var Operator = (0, import_core.list)({
  access: {
    operation: {
      ...(0, import_access.allOperations)(hasSession),
      query: () => true
    }
  },
  fields: {
    name: (0, import_fields.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    rarity: (0, import_fields.integer)({
      defaultValue: 1,
      validation: {
        isRequired: true,
        min: 1,
        max: 6
      }
    }),
    class: (0, import_fields.select)({
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
    })
  }
});

// src/schema/admin/User.ts
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var import_core2 = require("@keystone-6/core");
var User = (0, import_core2.list)({
  access: {
    operation: {
      create: import_access2.allowAll,
      query: import_access2.allowAll,
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
    name: (0, import_fields2.text)({ validation: { isRequired: true } }),
    // the user's email address, used as the identity field for authentication
    //   should not be publicly visible
    //
    //   we use isIndexed to enforce this email is unique
    email: (0, import_fields2.text)({
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
    password: (0, import_fields2.password)({
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
    isAdmin: (0, import_fields2.checkbox)({
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
    createdAt: (0, import_fields2.timestamp)({
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
    posts: (0, import_fields2.relationship)({ ref: "Post.author", many: true })
  }
});

// schema.ts
var import_fields3 = require("@keystone-6/core/fields");
var lists = {
  User,
  Post: (0, import_core3.list)({
    access: import_access3.allowAll,
    // this is the fields for our Post list
    fields: {
      title: (0, import_fields3.text)({ validation: { isRequired: true } }),
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
      author: (0, import_fields3.relationship)({
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
      tags: (0, import_fields3.relationship)({
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
  Tag: (0, import_core3.list)({
    access: import_access3.allowAll,
    // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
    ui: {
      isHidden: true
    },
    // this is the fields for our Tag list
    fields: {
      name: (0, import_fields3.text)(),
      // this can be helpful to find out all the Posts associated with a Tag
      posts: (0, import_fields3.relationship)({ ref: "Post.tags", many: true })
    }
  }),
  Operator
};

// auth.ts
var dotenv = __toESM(require("dotenv"));
var import_auth = require("@keystone-6/auth");
var import_session3 = require("@keystone-6/core/session");
dotenv.config();
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "name isAdmin",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    fields: ["name", "email", "password"],
    // the following fields are configured by default for this item
    itemData: {
      isAdmin: true
    }
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session3.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET
});

// keystone.ts
dotenv2.config();
var keystone_default = withAuth(
  (0, import_core4.config)({
    db: {
      provider: "postgresql",
      url: process.env.DB_URL,
      enableLogging: true,
      idField: { kind: "uuid" }
    },
    lists,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
