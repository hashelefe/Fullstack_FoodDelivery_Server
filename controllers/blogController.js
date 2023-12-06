const Blog = require('../data/Blog')

const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find().exec();
    if(!blogs) return res.status(204).json({'message': 'Blogs not found'})
    res.json(blogs)
};
  
const getBlog = async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findOne({_id: blogId}).exec();
    if (!blog) {
      return res.status(404).json({ message: "Blog id not found" });
    }
    res.json(blog);
};


const createBlog = async (req,res) => {
  if(!req?.body?.title || !req?.body?.desc) return res.status(400).json({'message': 'Title and description are required'})
  try{
    const result = await Blog.create({
      title: req.body.title,
      desc: req.body.desc,
      content: req.body.content,
      date: new Date()
    })
    res.status(201).json(result)
  } catch(err) {
      console.log(err)
  }
};
  
  //Delete blog
const deleteBlog = async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findOne({_id: id}).exec();
    if (!blog) {
      return res.status(400).json({"message": "Blog not found"})
      };
    const result = await blog.deleteOne({_id: id})
    res.json(result); 
};
  
  //Change blog information
const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findOne({_id: blogId}).exec();
  if (!blog) {
    return res.status(204).json({ message: "Blog id not found" });
  } else {
      if(req.body.title) blog.title = req.body.title;
      if(req.body.desc) blog.desc = req.body.desc;
      if(req.body.content) blog.content = req.body.content;
      
      const result = await blog.save();
      res.json(result)
    }
};

module.exports = {getBlog, getAllBlogs, deleteBlog, updateBlog, createBlog}