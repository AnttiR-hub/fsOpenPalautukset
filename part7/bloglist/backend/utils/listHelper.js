const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
      return sum + item
    }
  
    const blogsLikes = blogs.map(blogs => blogs.likes)
    return blogsLikes.reduce(reducer, 0)
  }

const favouriteBlog = (blogs) => {
    const blogLikes = blogs.map(blogs => blogs.likes)
    const indexOfLargest = blogLikes.indexOf(Math.max(...blogLikes))
    const largestinfo = blogs[indexOfLargest]
  
    return {
      title: largestinfo.title,
      author: largestinfo.author,
      likes: largestinfo.likes,
    }
  }

  const mostBlogs = (blogs) => {
    const blogAuthors = blogs.map(blogs => blogs.author)
    
    let mode = 
      _.chain(blogAuthors)
        .countBy()
        .entries()
        .maxBy(_.last)
        .thru(_.head)
        .value();
  
    let count = 0;
  
    blogAuthors.forEach(element => {
        if (element === mode) {
        count += 1;
      }
    })
    
    return {
      author: mode,
      blogs: count,
    }
  }
  
  const mostLikes = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, 'author')
    const countedAuthors = _.map(blogsByAuthor, (arr) => { 
      return { 
        author: arr[0].author, 
        likes: _.sumBy(arr, 'likes'), 
      }; 
      
    })
    const maxLikes = _.maxBy(countedAuthors, (a) => a.likes)
    const authorName = _.head(_.values(maxLikes))
  
    return {
      author: authorName,
      likes: maxLikes.likes
    }
  }

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}