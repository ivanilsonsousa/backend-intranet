require('dotenv/config');

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.HOST_INTRANET,
      user: process.env.USER_INTRANET,
      password: process.env.PASSWORD_INTRANET,
      database: process.env.DB_INTRANET,
    }
  },

  staging: {},

  production: {}

};
