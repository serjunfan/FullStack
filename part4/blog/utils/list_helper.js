const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const total = blogs.reduce( (acc, cur) => {
    if(cur.likes){
      return acc + cur.likes
    }
    return acc
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if(!blogs.length) {
    return {};
  }
  let favIdx = 0
  for(let i = 0 ; i < blogs.length; i++) {
    if(blogs[i].likes > blogs[favIdx].likes) {
      favIdx = i
    }
  }
  return blogs[favIdx]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
