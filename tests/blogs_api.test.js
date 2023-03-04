const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
}, 100000)


test('blogs are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('blogs have id property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

// test('a valid blog can be added', async () => {
//   const newBlog = {
//     title: 'new blog',
//     author: 'Mikhita',
//     url: 'bitcamp.ge',
//     likes: 599
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()
//   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

//   const titles = blogsAtEnd.map(n => n.title)
//   expect(titles).toContain(
//     'new blog'
//   )
// }, 100000)

test('a valid blog can be added with authorization token', async () => {
  const newBlog = {
    title: 'medium blog2',
    author: 'MikhitA',
    url: 'bitcamp.com',
    likes: 3332,
    user: {
      username: 'mikhita',
      name: 'Superuser',
      id: '63fde3c9227620fec31d0356'
    },

  }

  const user = await User.findOne({username: 'mikhita'}) // find an existing user
  const token = jwt.sign({ id: user._id }, process.env.SECRET) // generate a token for the user

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`) // include the token in the header
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'new blog'
  )
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'Test author'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(response.body.error).toContain('likes are required')
})


test('creating a new blog without title results in 400 Bad Request', async () => {
  const newBlog = {
    author: 'John Doe',
    url: 'http://example.com',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('creating a new blog without url results in 400 Bad Request', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'John Doe',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogsToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogsToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogsToDelete.title)
}, 100000)


test('update a blog post', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedLikes = blogToUpdate.likes + 1

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: updatedLikes })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(updatedLikes)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id)
  expect(updatedBlog.likes).toBe(updatedLikes)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })


  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log(usersAtStart)

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'mikhita',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    // expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  
})


afterAll(async () => {
  await mongoose.connection.close()
})