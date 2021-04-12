import React, { useState, useEffect, useRef } from 'react'
import Blog from './BlogRow'
import BlogForm from './BlogForm'
import blogService from './services'
import Notification from './Notification'
import Togglable from './Togglable'
import './app.css'
import './bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'



export const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState(true)
  const noteFormRef = useRef()


  //blogien lataaminen näyttämistä varten
  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        //blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      })
  }, [])


  //tarkistetaan onko local storagessa evästettä
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  //käyttäjän kirjaaminen annetuilla tiedoilla
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await blogService.login({
        username, password,
      })
      //asetetaan käyttäjän tiedot talteen localstorageen
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      //asetetaan token talteen
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      //tulostetaan onnistumis ilmoitus
      setErrorStatus(true)
      setErrorMessage('Welcome back ' + user.name)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorStatus(false)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //uusi blogi napin painaminen
  const addBlog = async (newBlogData) => {
    //uunen henkilön tietojen atribuutit

    let response = await blogService.create(newBlogData)
    //tulostetaan ilmoitus
    setErrorStatus(true)
    setErrorMessage('A new blog ' + response.title + ' has been  added')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

    //lisätään palautettu arvo listaan
    noteFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(response))
  }

  //kirjautumis formin tulostaminen
  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        Username
        <Form.Control
          type="text"
          value={username}
          name="Username"
          placeholder="Enter email - use 'ned' as username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        Password
        <Form.Control
          type="password"
          value={password}
          name="Password"
          placeholder="Enter password - use 'ned' as password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button type="submit">login</Button>
    </Form>
  )

  const likeBlog = async (likedBlogData) => {
    likedBlogData.likes += 1
    await blogService.update(likedBlogData.id, likedBlogData)
    //päivitetään näkymä
    blogService.getAll()
      .then(blogs => {
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      })
  }

  const deleteBlog = async (deleteThisBlog) => {
    const message = 'Remove blog ' + deleteThisBlog.title + '?'
    if (window.confirm(message)) {
      await blogService.deleteBlog(deleteThisBlog.id)
      blogService.getAll()
        .then(blogs => {
          blogs.sort((a, b) => b.likes - a.likes)
          setBlogs(blogs)
        })
    }

  }

  function logOutUser() {
    window.localStorage.clear()
    document.location.reload()
  }


  //sivun sisällön tulostaminen. Huomioi sisällön piilottaminen, mikäli käyttäjän token on noudettu
  return (
    <div>
      <h2>Totalderp's blogger app</h2>
      <Notification message={errorMessage} status={errorStatus} />
      {user === null ?
        loginForm() :
        <div>
          <p>Logged in as {user.name} <Button type="submit" onClick={() => logOutUser()}>Log out</Button></p>

          <Togglable buttonLabel="Create a new blog" ref={noteFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <p>Click the blogs title to expand it!</p>
          <Accordion defaultActiveKey="0">
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} index={blogs.findIndex(i => i === blog)} />
            )}
          </Accordion>
          <p>Source code can be found from my <a href="https://github.com/Totalderp">GitHub</a></p>
        </div>
      }
    </div>
  )
}

export default App