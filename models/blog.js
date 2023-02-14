const mongoose = require('mongoose')

// const personSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     minLength: 3,
//     required: true,
//   },
//   number: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function (value) {
//         return (
//           /^\d{2,3}-\d{6,}$/.test(value) ||
//           (value.length >= 8 && !value.includes('-'))
//         )
//       },
//       message: 'Invalid phone number format',
//     },
//   },
// })
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})


module.exports = mongoose.model('Blog', blogSchema)