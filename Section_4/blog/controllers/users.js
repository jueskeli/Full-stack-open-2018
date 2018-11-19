const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingUser = await User.find({username: body.username})
    if (existingUser.length>0) {
      return response.status(400).json({ error: 'käyttäjä on jo olemssa' })
    }

    if (body.password.length < 4){
      return response.status(400).json({ error: 'Salasana liian lyhyt. Min 3 merkkiä.' })
    }

    if(body.adult !== false) {
      body.adult = true
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(User.format(savedUser))

  } catch (exception) {
    response.status(500).json({ error: 'Jokin meni vikaan' })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {title: 1, author: 1, likes: 1})
  
  response.json(users.map(User.format))
})

module.exports = usersRouter