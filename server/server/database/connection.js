const mongoose = require("mongoose");
const databaseUrl = "mongodb://127.0.0.1:27017/argentBankDB";
mongoose.set("useFindAndModify", false);

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true });
    console.log("Database successfully connected");
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`);
    throw new Error(error);
  }
};
