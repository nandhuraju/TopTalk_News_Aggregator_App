const mongoose = require("mongoose");

const customNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Adding the text index
customNewsSchema.index({ title: "text", description: "text" });

const CustomNews = mongoose.model("CustomNews", customNewsSchema);

module.exports = CustomNews;
