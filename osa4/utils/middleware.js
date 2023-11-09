const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}


const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')

	if (authorization && authorization.startsWith('bearer ')){
		request.token = authorization.replace('bearer ', '')
		return next()
	}
	request.token = null
	return next()
}

const userExtractor = async (request, response, next) => {
	if (!request.token) {
		request.user = null
	}else{
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!decodedToken.id) {    
			request.user = null
		}else{
			request.user = await User.findById(decodedToken.id)
		}
	}	
	return next()
} 

module.exports = {
	unknownEndpoint,
	tokenExtractor,
	userExtractor 
}