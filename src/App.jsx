import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const success = (pos) => {
    
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])
    
    useEffect(() => {
    if (coords) {
      const apiKey = "f6bc9ff175bc988186d7f88495eb521f"
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
        axios.get(url)
        .then( res => {
          const cel = (res.data.main.temp - 273.15).toFixed(2)
          const fah = (cel * 9/5 + 32).toFixed(2)
          setTemp({cel, fah})
          setWeather(res.data)})

        .catch( err => console.log(err))

        .finally(()=> {
          setIsLoading(false)
        })

    }
   }, [coords])
   
  const clima = weather?.weather[0].description
  const cod = weather?.weather[0].id
  let fondo =""

  if (cod>=200 && cod<=232) fondo = "app fondo_1"
  if (cod>=300 && cod<=504 || cod>=520 && cod<=531 || cod==771) fondo = "app fondo_2"
  if (cod==511) fondo = "app fondo_3"
  if (cod>=600 && cod<=622) fondo = "app fondo_4"  
  if (cod==800) fondo = "app fondo_5"  
  if (cod>=801 && cod<=804) fondo = "app fondo_6"  
  if (cod==701) fondo = "app fondo_7"
  if (cod==711) fondo = "app fondo_8"
  if (cod>=721 && cod<=741) fondo = "app fondo_9" 
  if (cod==731 || cod==751 || cod==751) fondo = "app fondo_10"  
  if (cod==781) fondo = "app fondo_11"  
  
  return (

    <div className = {fondo}>
      {
        isLoading ?
        <div className='container'>
          <div className='cubo'>
            <div className="loading">
              <h1>Loanding</h1>
            </div>
          </div>
        </div>
        :
          <WeatherCard
            weather = {weather}
            temp = {temp}  
          />
      }
    </div>
  )
}

export default App
