module.exports = {
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb+srv://keshav:keshav@mall-guide.baihe.mongodb.net/mall-guide?retryWrites=true&w=majority",
  PORT: process.env.PORT || 3000,
};
