import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/blogToggler'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import BlogToggler from './components/blogToggler';
import LoginForm from './components/LoginForm';

describe('<App />', () => {
  let app

  describe('renders no blogs from backend before login', () => {
    beforeEach(() => {
        app = mount(<App />)
      })

    it('only login form is rendered', () => {
    app.update()
        const blogComponents = app.find(BlogToggler)
        expect(blogComponents.length).toEqual(0)

        const loginForm = app.find(LoginForm)
        expect(loginForm.text()).toContain('Kirjaudu sisään')
    })
  })

  describe('renders all blog from backend after login', () => {
    beforeEach(() => {
        const user = {
            username: 'juuso',
            token: '1231231214',
            name: 'Juuso Eskelinen'
        }
          
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        app = mount(<App />)
      })

    it('all blogs are rendered', () => {
        app.update()
        const blogComponents = app.find(BlogToggler)
        expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})