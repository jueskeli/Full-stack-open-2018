import React from 'react'

const BlogForm = ({ handleSubmit, handleChange, newTitle, newAuthor, newURL, newContent }) => {    
    return(
      <div>
        <h2>Uusi blogimerkintä:</h2>

        <form onSubmit={handleSubmit}>
          <div>
            Nimi
            <input
              name = 'newTitle'
              value = {newTitle}
              onChange = {handleChange}
            />
          </div>
          <div>
          Kirjoittaja
            <input
              name = 'newAuthor'
              value = {newAuthor}
              onChange = {handleChange}
            />
          </div>
          <div>
            URL
            <input
              name = 'newURL'
              value = {newURL}
              onChange = {handleChange}
            />
          </div>
          <div>
            Sisältö
            <textarea
              name = 'newContent'
              value = {newContent}
              onChange = {handleChange}
            />
          </div>
          <button type='submit'>tallenna</button>
        </form>
      </div>
    )
}

export default BlogForm
