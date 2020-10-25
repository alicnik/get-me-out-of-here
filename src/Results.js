import React from 'react'
import { ResultCard } from './ResultCard'
import { Options } from './Options'

export const Results = ({ mode, setMode, sorted, setSorted, isLoading, currentLocation, tflStopData, availableModes }) => {
  const tflStopsArray = mode ? tflStopData.filter(stop => stop.modes.includes(mode)) : tflStopData
  const sortedTflStopsArray = sorted ? [...tflStopsArray].sort((a, b) => a.timeToStation - b.timeToStation) : tflStopsArray
  if (isLoading) {
    return <div className='loading-screen'>
      <h2>Loading...</h2> 
      <progress className="progress is-small is-danger" max="100">15%</progress>
    </div>
  } else {
    return (
      <section className="results">
        <header>
          <h2>Leaving soon from a stop near you!</h2>
          <Options 
            mode={mode} 
            setMode={setMode} 
            sorted={sorted} 
            setSorted={setSorted} 
            availableModes={availableModes}
          />
        </header>
        <div className="tile is-ancestor box results-container">
          {sortedTflStopsArray.map((stop, index) => <ResultCard stop={stop} currentLocation={currentLocation} key={index} />)}
        </div>
      </section>
    )
  }
}