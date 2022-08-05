
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const WeathersCard = ({lat, lon}) => {
    const [weatherInfo, setWeatherInfo] = useState()
    const [tempChange, setTempChange] = useState()
    const [tempMax, setTempMax] = useState()
    const [tempMin, setTempMin] = useState()
    const [celsius, setCelsius] = useState()

    useEffect(() => {
        if(lat) {
            const ApiKey = `a80bb1033055480ef860a81905234849`;
            const UrlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}`;

            axios.get(UrlApi)
                .then(res =>{
                    setWeatherInfo(res.data)
                    const gradesTemp = {
                        celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                        farenheit: `${Math.round(res.data.main.temp - 273.15) * 9/5 +32} °F`
                    }
                    setTempChange(gradesTemp)

                    const tempMax = {
                        celsiusMax: `${Math.round(res.data.main.temp_max - 273.15)} °C`,
                        farenheitMax: `${Math.round(res.data.main.temp_max - 273.15) * 9/5 + 32} °F`
                    }
                    setTempMax(tempMax)

                    const tempMin = {
                        celsiusMin: `${Math.round(res.data.main.temp_min - 273.15)} °C`,
                        farenheitMin: `${Math.round(res.data.main.temp_min - 273.15) * 9/5 + 32} °F`
                    }
                    setTempMin(tempMin)
                })
                .catch(error => console.log(error))
        }
    }, [lat, lon])

    console.log(weatherInfo);

    const handleClick = () => setCelsius(!celsius)

  return (
    <div>
        <article className='weather__card'>
            <div className="weather__head">
                <h1>SIVANA´s Weather</h1>
                <h3><b>{`${weatherInfo?.name}`}, {`${weatherInfo?.sys.country}`}</b></h3>
            </div>
            <div className="weather__general">
                <div className="weather__icon">
                    <img src={weatherInfo && `http://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@4x.png`} alt="" />
                    <h2>{celsius ? tempChange?.celsius : tempChange?.farenheit}</h2>
                    <button onClick={handleClick} className='weather__button'><b>{celsius ? 'Change to °F' : 'Change to °C'} <i className="fi fi-ss-shuffle"></i></b></button>
                </div>
                <div className="weather__info">
                    <ul>
                        <li className='weather__status'><span>"{`${weatherInfo?.weather[0].description}`}"</span></li>
                        <li><i className="fi fi-rr-wind"></i><b> Wind speed: </b><span>{`${weatherInfo?.wind.speed}`} m/s </span></li>
                        <li><i className="fi fi-rs-clouds-sun"></i><b> Clouds: </b><span>{`${weatherInfo?.clouds.all}`}%</span></li>
                        <li><i className="fi fi-ss-smog"></i><b> Pressure: </b><span>{`${weatherInfo?.main.pressure}`} hPa</span></li>
                        <li><i className="fi fi-rr-summer"></i><b> Max-temperature: </b><span>{celsius ? tempMax?.celsiusMax : tempMax?.farenheitMax}</span></li>
                        <li><i className="fi fi-rr-temperature-low"></i><b> Min-temperature: </b><span>{celsius ? tempMin?.celsiusMin : tempMin?.farenheitMin}</span></li>
                    </ul>
                </div>
            </div>  
        </article>
    </div>
  )
}

export default WeathersCard