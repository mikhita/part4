const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'new blog',
    author: 'Mikhita',
    url: 'bitcamp.ge',
    likes: 599
  },
  {
    title: 'new blog2',
    author: 'Mikhita2',
    url: 'bitcamp.ge2',
    likes: 5992
  },
  {
    title: 'new blog3',
    author: 'Mikhita3',
    url: 'bitcamp.ge3',
    likes: 5993
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}