const path = require("path");
let env = process.env.NODE_ENV || "dev";
env = env.toLocaleLowerCase();

const file = path.resolve(__dirname, `config-${env}`);
try {
  module.exports = require(file);
} catch (error) {
  throw error;
}
