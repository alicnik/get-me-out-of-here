import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Results } from './Results'
import { SplashScreen } from './Splashscreen'
import 'bulma'
import './style.scss'

const App = () => {
  const [buttonPressed, setButtonPressed] = useState(false)
  const [currentLocation, setCurrentLocation] = useState()
  // const [radius, setRadius] = useState(500) => potential additional feature for custom radius
  const [tflStopData, setTflStopData] = useState([])
  // const [mapData, setMapData] = useState()
  const [mode, setMode] = useState('')
  const [availableModes, setAvaiableModes] = useState('')
  const [sorted, setSorted] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const tflCredentials = 'app_id=ae9f50c3&app_key=e9c2acb8697db68faeaebe4bca54ed77'
  
  function pressButton () {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(position => setCurrentLocation(position.coords), (error) => console.log(error), { enableHighAccuracy: true })
    setButtonPressed(true)
  }

  function getTflStopData() {
    if (currentLocation) {
      fetch(`https://api.tfl.gov.uk/Stoppoint?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&radius=500&stoptypes=NaptanMetroStation,NaptanRailStation,NaptanBusCoachStation,NaptanFerryPort,NaptanPublicBusCoachTram&${tflCredentials}`)
        .then(response=>response.json())
        .then(data => {
          setTflStopData(data.stopPoints)
          const availableModesSet = new Set(data.stopPoints.flatMap(stop => stop.modes))
          setAvaiableModes([...availableModesSet])
        })
    }
  }
    
  function getArrivals() { 
    if (!currentLocation || !tflStopData.length) return
    const promises = tflStopData.map(stop => {
      return fetch(`https://api.tfl.gov.uk/StopPoint/${stop.id}/Arrivals?${tflCredentials}`)
        .then(response=>response.json())
        .then(data => {
          if (!data.length) return
          const { expectedArrival, lineId, lineName, modeName, stationName, timeToStation, towards } = data[0]
          Object.assign(stop, { expectedArrival, lineId, lineName, modeName, stationName, timeToStation, towards })
        })
    })
    Promise.all(promises).then(()=>setIsLoading(false))
  }
  
  useEffect(getTflStopData, [currentLocation])
  useEffect(getArrivals, [tflStopData])

  // useEffect(()=> {
  //   if (tflStopData){
  //     fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${currentLocation.longitude},${currentLocation.latitude};   {COORDS}   ?access_token=pk.eyJ1IjoiYWxpY25payIsImEiOiJja2Jja2kwMmwwMnM3MnNxZWx2aXR1YjdpIn0.rPq9vNb1zInDizAx_EMXPA`)
  //       .then(response=>response.json())
  //       .then(data => setMapData(data))  
  //   }
  // }, [tflStopData])



  return (
    <main className="has-background-info">
      { buttonPressed || <SplashScreen pressButton={pressButton} /> }
      { buttonPressed && <Results 
        isLoading={isLoading} 
        mode={mode} 
        setMode={setMode} 
        sorted={sorted} 
        setSorted={setSorted} 
        currentLocation={currentLocation} 
        tflStopData={tflStopData}
        availableModes={availableModes}
      /> }
    </main>
  )
  
}

ReactDOM.render(<App/>, document.getElementById('root'))