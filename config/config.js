const env = process.env.NODE_ENV || "dev";

const dev = {
  app: {
    port: process.env.PORT || 9000
  },
  db: {
    mongoURL:
      process.env.MONGO_URL ||
      "mongodb://root:root123@ds127094.mlab.com:27094/instant-driving",
    secretOrKey: process.env.SECRET_OR_KEY || "secret"
  },
  mapbox: {
    token:
      "pk.eyJ1IjoiZGVubmlzb25kZXIiLCJhIjoiY2pyZjhtNzhkMGxqYjN6bWo5cWtwdzFtcyJ9.R1ZsqRKEhrhNdYurKxO6OA"
  }
};

const prod = {
  app: {
    port: process.env.PORT
  },
  db: {
    mongoURL: process.env.MONGO_URL,
    secretOrKey: process.env.SECRET_OR_KEY
  },
  mapbox: {
    token:
      "pk.eyJ1IjoiZGVubmlzb25kZXIiLCJhIjoiY2pyZjhtNzhkMGxqYjN6bWo5cWtwdzFtcyJ9.R1ZsqRKEhrhNdYurKxO6OA"
  }
};

const config = {
  dev,
  prod
};

module.exports = config[env];
