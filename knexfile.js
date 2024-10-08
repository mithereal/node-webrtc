// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
       connection: {
         database: 'webrtc',
         user:     'webrtc',
         password: 'webrtc'
       },
       pool: {
         min: 2,
         max: 10
       },
       migrations: {
         tableName: 'knex_migrations'
       }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'webrtc',
      user:     'webrtc',
      password: 'webrtc'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
       connection: {
         database: 'webrtc',
         user:     'webrtc',
         password: 'webrtc'
       },
       pool: {
         min: 2,
         max: 10
       },
       migrations: {
         tableName: 'knex_migrations'
       }
  }

};
