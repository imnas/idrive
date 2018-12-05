
const env = process.env.NODE_ENV || 'dev'

const dev = {
  app: {
    port: process.env.PORT || 8000
  },
  db: {
    mongoURL: process.env.MONGO_URL || 'mongodb://root:root123@ds127094.mlab.com:27094/instant-driving',
    secretOrKey: process.env.SECRET_OR_KEY || 'secret'
  }
};

const prod = {
    app: {
      port: process.env.PORT
    },
    db: {
      mongoURL: process.env.MONGO_URL,
      secretOrKey: process.env.SECRET_OR_KEY
    }
  };

const config = {
    dev,
    prod
}

module.exports = config[env];