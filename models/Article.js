import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    // required: true,
  },
});
console.log("Models", mongoose.models);
const Article =
  mongoose.models.article || mongoose.model("article", articleSchema);

export default Article;
