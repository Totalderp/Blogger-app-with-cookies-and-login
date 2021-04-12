//Luokka ilmoituksen tulostamiseen

const Notification = ({ message, status }) => {
  //Mikäli viestikentän tulee olla tyhjänä
  if (message === null) {
    return null
  }
  //punainen virhe kriittisiä virheitä varten
  else if (status === false) {
    return (
      <div className="fail">
        {message}
      </div>
    )
  }

  //vihreä virhe onnistumisia varten
  return (
    <div className="success">
      {message}
    </div>
  )
}

export default Notification