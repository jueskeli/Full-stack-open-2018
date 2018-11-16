const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  var count = 0
  blogs.forEach(blog => {
    count = count + blog.likes
  })
  return count
}

const favoriteBlog = (blogs) => {
  if(blogs.length > 0){
    var mostLikes = blogs[0]
    for(var i = 1; i < blogs.length; i++){
      if(mostLikes.likes < blogs[i].likes){
        mostLikes = blogs[i]
      }
    }
    return mostLikes
  }
  else return 0
}

const mostBlogs = (blogs) => {
  if(blogs.length > 0){
    var mostBlogs = ''
    var biggestAmount = 0
    var temp = 0
    for(var i = 0; i < blogs.length; i++){
      for(var j = 0; j < blogs.length; j++){
        if( blogs[j].author == blogs[i].author)
          temp++
      }    
      if (temp > biggestAmount){
        biggestAmount = temp
        mostBlogs = blogs[i].author
      }
      temp = 0
    }
    return {author : mostBlogs, blogs: biggestAmount}
  }
  else return 0
}

const mostLikes = (blogs) => {
  if(blogs.length > 0){
    var mostBlogs = ''
    var mostLikes = 0
    var temp = 0
    for(var i = 0; i < blogs.length; i++){
      for(var j = 0; j < blogs.length; j++){
        if( blogs[j].author == blogs[i].author)
          temp += blogs[j].likes
      }    
      if (temp > mostLikes){
        mostLikes = temp
        mostBlogs = blogs[i].author
      }
      temp = 0
    }
    return {author : mostBlogs, likes: mostLikes}
  }
  else return 0
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}