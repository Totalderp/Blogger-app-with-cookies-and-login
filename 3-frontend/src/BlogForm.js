import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//uuden blogin formin luominen
const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const handleBlog = (event) => {
    event.preventDefault()
    const lisattavaBlog = {
      title: title,
      text: text,
      likes: 0
    }
    addBlog(lisattavaBlog)

    setTitle('')
    setText('')
  }


  return (
    <div>
      <div>
        <h2>create new</h2>
        <Form onSubmit={handleBlog}>
          <Form.Group>
            <Form.Control value={title} placeholder="Title for your new blog" onChange={({ target }) => setTitle(target.value)} id="title" name="title"/>
          </Form.Group>
          <Form.Group>
          <Form.Control
            value={text}
            placeholder="Text for your blog"
            onChange={({ target }) => setText(target.value)}
            id="text"
            name="text"
            as="textarea" 
            rows={5}
          />
          </Form.Group>
          <Form.Group>
          <Button variant="primary" type="submit">Post</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm