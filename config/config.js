
const env = process.env.NODE_ENV || 'dev'

const dev = {
  app: {
    port: process.env.PORT || 8000
  },
  db: {
    host: process.env.DEV_DB_HOST || '',
    databaseName: process.env.DEV_DB_NAME || '',
    user: process.env.DEV_DB_USER || '',
    password: process.env.DEV_DB_PASSWORD || ''
  }
};

const prod = {
    app: {
      port: process.env.PORT
    },
    db: {
      host: process.env.PROD_DB_HOST,
      databaseName: process.env.PROD_DB_NAME
    }
  };

const config = {
    dev,
    prod
}

module.exports = config[env];