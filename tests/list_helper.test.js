// const listHelper = require('../utils/list_helper')

// describe('total likes', () => {
//   const users = [{author: 'Robert C. Martin', blogs: [
//     {
//       _id: '5a422a851b54a676234d17f7',
//       title: 'React patterns',
//       author: 'Michael Chan',
//       url: 'https://reactpatterns.com/',
//       likes: 17,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422b3a1b54a676234d17f9',
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//       likes: 12,
//       __v: 0
//     },
//     {
//       _id: '5a422b3a1b54a676234d17f9',
//       title: 'Canonical ',
//       author: 'Edsger ',
//       url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//       likes: 12,
//       __v: 0
//     },
//     {
//       _id: '5a422b891b54a676234d17fa',
//       title: 'First class tests',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
//       likes: 10,
//       __v: 0
//     },
//     {
//       _id: '5a422ba71b54a676234d17fb',
//       title: 'TDD harms architecture',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//       likes: 0,
//       __v: 0
//     },
//     {
//       _id: '5a422bc61b54a676234d17fc',
//       title: 'Type wars',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
//       likes: 2,
//       __v: 0
//     }  
//   ]},
//   {author: 'Robert C. Martin2', blogs: [
//     {
//       _id: '5a422a851b54a676234d17f7',
//       title: 'React patterns',
//       author: 'Michael Chan',
//       url: 'https://reactpatterns.com/',
//       likes: 7,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422b3a1b54a676234d17f9',
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//       likes: 12,
//       __v: 0
//     },
//     {
//       _id: '5a422b3a1b54a676234d17f9',
//       title: 'Canonical ',
//       author: 'Edsger ',
//       url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//       likes: 12,
//       __v: 0
//     },
//     {
//       _id: '5a422b891b54a676234d17fa',
//       title: 'First class tests',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
//       likes: 10,
//       __v: 0
//     },
//     {
//       _id: '5a422ba71b54a676234d17fb',
//       title: 'TDD harms architecture',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//       likes: 0,
//       __v: 0
//     } 
//   ]},
//   {author: 'Robert C. Martin', blogs: [
//     {
//       _id: '5a422a851b54a676234d17f7',
//       title: 'React patterns',
//       author: 'Michael Chan',
//       url: 'https://reactpatterns.com/',
//       likes: 7,
//       __v: 0
//     },
//     {
//       _id: '5a422b891b54a676234d17fa',
//       title: 'First class tests',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
//       likes: 10,
//       __v: 0
//     },
//     {
//       _id: '5a422ba71b54a676234d17fb',
//       title: 'TDD harms architecture',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//       likes: 0,
//       __v: 0
//     },
//     {
//       _id: '5a422bc61b54a676234d17fc',
//       title: 'Type wars',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
//       likes: 2,
//       __v: 0
//     }  
//   ]}]
//   const blogs = [
//     {
//       _id: '5a422a851b54a676234d17f7',
//       title: 'React patterns',
//       author: 'Michael Chan',
//       url: 'https://reactpatterns.com/',
//       likes: 7,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422b3a1b54a676234d17f9',
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//       likes: 12,
//       __v: 0
//     },
//     {
//       _id: '5a422b3a1b54a676234d17f9',
//       title: 'Canonical ',
//       author: 'Edsger ',
//       url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//       likes: 12,
//       __v: 0
//     },
//     {
//       _id: '5a422b891b54a676234d17fa',
//       title: 'First class tests',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
//       likes: 10,
//       __v: 0
//     },
//     {
//       _id: '5a422ba71b54a676234d17fb',
//       title: 'TDD harms architecture',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//       likes: 0,
//       __v: 0
//     },
//     {
//       _id: '5a422bc61b54a676234d17fc',
//       title: 'Type wars',
//       author: 'Robert C. Martin',
//       url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
//       likes: 2,
//       __v: 0
//     }  
//   ]

//   test('find author with the most blogs', ()=>{
//     const result = listHelper.mostLikes(users)
//     const newObject = 
//       {
//         _id: '5a422a851b54a676234d17f7',
//         title: 'React patterns',
//         author: 'Michael Chan',
//         url: 'https://reactpatterns.com/',
//         likes: 17,
//         __v: 0
//       }
//     expect(result).toEqual(newObject)
//   })

//   test('find author and blog object with the most blogs', ()=>{
//     const result = listHelper.mostBlogs(users)
//     const newObject = {
//       author: 'Robert C. Martin',
//       blogs: 7
//     }
//     expect(result).toEqual(newObject)
//   })

//   test('when list has array of blogs, equals to the sum of likes of each one', () => {
//     const result = listHelper.favoriteBlog(blogs)
//     const newObject = {
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       likes: 12
//     }
//     expect(result).toEqual(newObject)
//   })

//   test('when list has only one blog, equals the likes of that', () => {
//     const listWithOneBlog = [
//       {
//         _id: '5a422aa71b54a676234d17f8',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Edsger W. Dijkstra',
//         url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//         likes: 5,
//         __v: 0
//       }
//     ]
//     const result = listHelper.totalLikes(listWithOneBlog)
//     expect(result).toBe(5)
//   })

// })
