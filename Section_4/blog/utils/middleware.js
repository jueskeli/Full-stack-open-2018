module.exports = {tokenExtractor: function(request, res, next) {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)  
  }
  next()
}
}
