const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
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



blogsRouter.post('/', (request, response, next) => {
  const body = request.body
  // const blog = new Blog(request.body)
  if (!body.likes) {
    return response.status(400).json({ error: 'likes are required' })
  }
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title or URL is missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((error) => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', (request, response) => {
  const { title, author, url, likes } = request.body
  Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
    .then((updatedBlog) => {
      response.json(updatedBlog)
    })
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