import mongoose from "mongoose";
import Blog from "../Model/Blog";
import User from "../Model/user";

export const getAllBlogs = async (req, res, next) => {
  let blog;
  try {
    blog = await Blog.find();
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).send({ msg: "No Blog Found" });
  }
  return res.status(200).send({ blog });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).send({ msg: "Unable to Find User By Id" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error });
  }
  return res.status(200).send({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).send({ Msg: "Unable to Update the Blog" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).send({ msg: "No Blog Found" });
  }
  return res.status(200).send({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const _id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(_id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).send({ msg: "Unable to Delete" });
  }
  return res.status(200).send({ msg: "Succesfully delete" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (error) {
    return console.log(error);
  }
  if (!userBlogs) {
    return res.status(404).send({ msg: "No Blog Found" });
  }
  return res.status(200).send({ blogs: userBlogs });
};
