import mongoose from "mongoose";
import User from "./user";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // user: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
