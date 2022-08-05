import { useEffect, useState } from 'react'
import './App.css'
import WeathersCard from './components/WeathersCard';
import './icons/iconos'


function App() {
  const [latLong, setLatLong] = useState()

  useEffect(() => {
    const success = pos => {
      const coords = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setLatLong(coords)
    }
    
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
    <div className="App">
      <WeathersCard lat = {latLong?.lat} lon = {latLong?.lon} />
    </div>
  )
}

export default App
