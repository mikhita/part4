const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    console.log(`The number of blogs is: ${blogs.length}`)
  } 

  return 1
}

module.exports = {
  dummy
}