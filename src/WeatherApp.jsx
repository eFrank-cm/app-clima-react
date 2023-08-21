import React, { useState } from 'react'

export const WeatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '32cc4c9a51b3cd4e72bb3ef5eba11ba3'
    const [ciudad, setCuidad] = useState('')
    const [dataClima, setDataClima] = useState(null)
    const difKelvin = 273.15

    const handleCambioCiudad = (event) => {
        setCuidad(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(ciudad)
        if(ciudad.length > 0){
            fetchClima()
        }
    }

    const fetchClima = async() => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)

        }catch(error){
            console.log('Ocurrio el siguiente problema: ', error)
        }
    }

    
    return (
        <div className='container'>
            <h1>Aplicacion del Clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                />
                <button type='submit'>Buscar</button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                        <p>Condicion Meteorologica: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="icon" />
                    </div>
                )
            }
        </div>
    )
}
