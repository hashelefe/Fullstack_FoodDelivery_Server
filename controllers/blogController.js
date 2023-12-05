const data = {
    blogs: require('../data/blogs.json'),
    setBlogs: function(data) {this.blogs = data}
}

const fsPromises = require('fs').promises;
const path = require('path');

const getAllBlogs = (req, res) => {
    res.json(data.blogs);
};
  
const getBlog = (req, res) => {
    const blogId = req.params.id;
    const blogData = data.blogs.find((element) => element.id === blogId);
  
    if (!blogData) {
      return res.status(404).json({ message: "Blog id not found" });
    }
    res.json(blogData);
};


const createBlog = async (req,res) => {
    const newBlog = {
      id: String(data.blogs.length),
      title: req.body.title,
      desc: req.body.desc,
      content: req.body.content,
      date: new Date()
    }
    console.log(newBlog)
    data.setBlogs([...data.blogs, newBlog]);
    await fsPromises.writeFile(
      path.join(__dirname,'../','data','blogs.json'),
      JSON.stringify(data.blogs)
  );
    res.status(201).json(data.blogs)
};
  
  //Delete blog
const deleteBlog = async (req, res) => {
    const id = req.params.id;
    const deletedBlog = data.blogs.find(blog => blog.id === id);
    if (!deletedBlog) {
      return res.status(400).json({"message": "Blog not found"})
      };
    const filteredArray = data.blogs.filter(blog => blog.id !== id)
    data.setBlogs([...filteredArray]);
    await fsPromises.writeFile(
      path.join(__dirname,'../','data','blogs.json'),
      JSON.stringify(data.blogs));
    res.json(data.blogs); 
};
  
  //Change blog information
const updateBlog = async (req, res) => {
    const id = req.params.id;
    const blog = data.blogs.find(blog => blog.id === id);
    if(!blog) {
      res.status(404).json({"message": 'Blog not found'})
    } else {
      if(req.body.title) blog.title = req.body.title;
      if(req.body.desc) blog.desc = req.body.desc;
      if(req.body.content) blog.content = req.body.content;
      const filteredArray = data.blogs.filter(blog => blog.id !== id)
      const unsortedArray = [...filteredArray, blog]
      data.setBlogs(unsortedArray.sort((a,b) => a.date > b.date ? 1 : a.date < b.date ? -1 : 0))
      await fsPromises.writeFile(
        path.join(__dirname,'../','data','blogs.json'),
        JSON.stringify(data.blogs));
      res.json(data.blogs)
    }
};

module.exports = {getBlog, getAllBlogs, deleteBlog, updateBlog, createBlog}