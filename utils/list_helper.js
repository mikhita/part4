const _ = require('lodash')


const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    console.log(`The number of blogs is: ${blogs.length}`)
  } 
  return 1
}


const totalLikes = (blogList) => {
  let sum = blogList.reduce((sum,blog)=> sum + blog.likes, 0)
  return blogList.length === 0 ? 0 : sum
}

const favoriteBlog = (blogList) => {
  let max = blogList.reduce((prev, current)=> prev.likes >= current.likes ? prev : current)
  let {title, author, likes} = max
  let newObj = {title, author, likes}

  return newObj
}

const mostBlogs = (users) => {
  const largestUser = _.maxBy(users, user => user.blogs.length)

  const {author, blogs}= largestUser

  const largestObject = {
    author: author,
    blogs: blogs.length
  }

  return largestObject
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}