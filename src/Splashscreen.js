import React, { useState } from 'react'

export const SplashScreen = ({ pressButton }) => {
  const [infoPressed, setInfoPressed] = useState(false)

  return (
    <section className="splash-screen">
      <h1>Get me <br />out of here!</h1>
      <button onClick={pressButton} className="escape-button">Hoof it!</button>
      <img src="./assets/info-icon.svg" alt="instructions" onClick={()=>setInfoPressed(true)}/>
      <article className={infoPressed ? 'modal is-active is-clipped' : 'modal'}>
        <div className="modal-background">
          <div className="modal-card box" style={{ maxWidth: '90%', transform: 'translateY(30vh)' }}>
            <header className="modal-card-head">
              <h2 className='modal-card-title' style={{ fontFamily: 'Contrail One' }}>Help!</h2>
              <button className='delete' aria-label='close' onClick={()=>setInfoPressed(false)}></button>
            </header>
            <div className="modal-card-content">
              <p>This app is designed for those times you find yourself in a sketchy area, like the wrong side of South Kensington, and just need to escape. Press the button to <span style={{ fontFamily: 'Lobster' }}>Hoof It!</span> and you will get a list of the closest TFL stations along with the time the next transport is leaving from each station.</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

