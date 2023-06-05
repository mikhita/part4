const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

// blogsRouter.get('/:id', (request, response, next) => {
//   Blog.findById(request.params.id)
//     .then(person => {
//       if (person) {
//         response.json(person)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  // const user = await User.findById(body.userId)
  const body = request.body
  // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  // if (!body.likes) {
  //   return response.status(400).json({ error: 'likes are required' })
  // }
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title or URL is missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)

  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
  //   .catch((error) => next(error))
})

blogsRouter.delete('/:id',middleware.userExtractor, async (request, response) => {
  // const user = request.user
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'only the user who added the blog can delete it' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  ).populate('user', { username: 1, name: 1 })

  response.json(blog)
})


// blogsRouter.delete('/:id', (request, response, next) => {
//   Blog.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// blogsRouter.put('/:id', (request, response, next) => {
//   const { name, number } = request.body

//   Blog.findByIdAndUpdate(
//     request.params.id,
//     { name, number },
//     {
//       new: true,
//       runValidators: true,
//       context: 'query',
//     }
//   )
//     .then((updatedPerson) => {
//       response.json(updatedPerson)
//     })
//     .catch((error) => next(error))
// })

module.exports = blogsRouter