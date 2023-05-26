const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(
        `mongodb+srv://gtomsic:Gs3tlrQRoEeO7SoS@cluster0.9vtmevi.mongodb.net/?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("Database connection successful".yellow);
      })
      .catch(() => {
        console.log("Database connection error".red);
      });
  }
}

module.exports = new Database();
