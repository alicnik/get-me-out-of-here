import React from 'react'

export const ResultCard = ({ stop, currentLocation }) => {
  const minutesUntilArrival = (stop.timeToStation / 60).toFixed(0)
  if (minutesUntilArrival > 0) {
    return (
      <article className='tile is-parent is-vertical is-primary'>
        <div className="is-child notification is-vertical is-info tile result-card">
          <h2>{stop.commonName}</h2>
          <p className="distance">{stop.distance.toFixed(0)}m</p>
          <p>Next {stop.modeName} in {minutesUntilArrival} {minutesUntilArrival <= 1 ? 'min' : 'mins'}.</p>
          <a 
            href={`https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${stop.lat},${stop.lon}&travelmode=walking`}
            target="_blank"
            rel='noreferrer'
          >
            <img src="./assets/google-maps-icon.png" alt="google maps icon"/>
          </a>
        </div>
      </article>
    )
  } else {
    return null
  }
}

