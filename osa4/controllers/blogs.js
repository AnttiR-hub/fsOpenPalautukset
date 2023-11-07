const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogRouter.post('/', (request, response) => {

  const body = request.body

  const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0
	})

  if(body.title === undefined || body.url === undefined){
		response.status(400).end()
  }else{

  blog.save().then(result => {
      response.status(201).json(result)
    })
  }
})

blogRouter.delete('/:id', async (request, response) => {
		await Blog.findByIdAndRemove(request.params.id)
	  response.status(204).end()
  })


  blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes? body.likes : 0 ,
    }
    
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(blog)
    })


module.exports = blogRouter