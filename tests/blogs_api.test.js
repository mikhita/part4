const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
// const helper = require('./test_helper')

const api = supertest(app)

// const Blog = require('../models/blog')


// beforeEach(async () => {
//   await Person.deleteMany({})

//   for (let person of helper.initialPersons) {
//     let personObject = new Person(person)
//     await personObject.save()
//   }
// }, 100000)


test('blogs are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)


afterAll(async () => {
  await mongoose.connection.close()
})