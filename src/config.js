module.exports = {
  app: {
    port: process.env.PORT || 3000,
    salt_rounds: 10,
    secret: "abcdefghij",
  },
};
