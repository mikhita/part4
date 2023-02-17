const _ = require('lodash')

const blogPosts = [  { author: 'John', blogs: [{
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0
},
{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 15,
  __v: 0
}] },  
{ author: 'Jane', blogs: [{
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0
}] },
{ author: 'Bob', blogs: [] }
]

const blogWithMostLikes = _.maxBy(_.flatMap(blogPosts, 'blogs'), 'likes')

console.log(blogWithMostLikes)

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

const mostBlogs = (blogPosts) => {
  const largestUser = _.maxBy(blogPosts, user => user.blogs.length)

  const {author, blogs}= largestUser

  const largestObject = {
    author: author,
    blogs: blogs.length
  }
  
  return largestObject
}

const mostLikes = (blogPosts)=>{
  
  const blogWithMostLikes = _.maxBy(_.flatMap(blogPosts, 'blogs'), 'likes')

  return blogWithMostLikes

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}