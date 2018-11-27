import React from 'react'
import { shallow } from 'enzyme'
import BlogToggler from './blogToggler'

describe.only('<BlogToggler />', () => {

  it('after clicking name the details are displayed', () => {
    const blog = {
        user: [{name:'testi: käyttäjä'}],
        likes: 100,
        url: 'www.testi.fi',     
        title: 'testTitle',
        author: 'testAuthor'
      }
  
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(
        <BlogToggler 
            key={blog.id} 
            title={blog.title} 
            author={blog.author} 
            like={mockHandler} 
            delete={mockHandler}
            username={'juuso'} 
            user={'juuso'} 
            url={blog.url}>
        </BlogToggler>
    )

    const infoDIv = blogComponent.find('.togglableInfo')
    expect(infoDIv.text()).toContain('testTitle')
    infoDIv.simulate('click')
  
    const contentDiv = blogComponent.find('.blog')
    expect(contentDiv.text()).toContain(blog.url)
  })
})