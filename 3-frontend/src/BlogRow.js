import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

//yksittäisen blogi elemnetin tulsotamiseen käytetty luokka
const Blog = ({ blog, likeBlog, deleteBlog, index }) => {

  return (
    <Card className="blogStyle" >
      <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
        {blog.title}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={index + 1}>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>
            {blog.text}
          </Card.Text>

          <b>{'Likes ' + blog.likes}</b> <Button onClick={() => likeBlog(blog)}>Like</Button>
          <Button variant="danger" onClick={() => deleteBlog(blog)}>Delete Blog</Button>
        </Card.Body>
      </Accordion.Collapse>
    </Card >
  )
}

Blog.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog