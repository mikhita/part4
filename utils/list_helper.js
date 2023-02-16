const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    console.log(`The number of blogs is: ${blogs.length}`)
  } 

  return 1
}


const totalLikes = (blogList) => {
  let sum = blogList.reduce((sum,blog)=> sum + blog.likes, 0 )
  return blogList.length === 0 ? 0 : sum
}

module.exports = {
  dummy,
  totalLikes
}