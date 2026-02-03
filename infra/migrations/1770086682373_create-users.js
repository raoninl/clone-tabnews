/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
//exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    // For reference, GitHub limits usernames to 39 characters.
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },
    // Why 254 in length? https://stackoverflow.com/a/1199238
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },
    // Why 72 in length? https://security.stackexchange.com/a/39851
    password: {
      type: "varchar(72)",
      notNull: true,
    },

    // Why timestamp with timezone: https://justatheory.com/2012/04/postgres-use-timestamptz/
    create_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },

    update_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = false;
