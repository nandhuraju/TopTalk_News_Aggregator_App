const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true },
  userType: { type: String, required: true },
  categories: { type: [String], required: true },
  bookmarks: {
    type: [
      {
        title: String,
        description: String,
        url: String,
        urlToImage: String,
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
