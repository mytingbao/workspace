module.exports = {
  port: process.env.NODE_PORT,

  proxy: {
    target: process.env.API_SERVER,
    AUTH_ID: process.env.AUTH_ID
  }
};
