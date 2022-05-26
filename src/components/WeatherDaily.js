import React from 'react'

const WeatherDaily = props =>{
    const {rain, tempMax, tempMin, weather} = props.info
    const {count} = props

    const currentDate = new Date()
    const newDate = new Date(currentDate.setDate(currentDate.getDate()+count)).toUTCString()
    const test = newDate.split(' ').slice(0,4)


    const adjustWeatherIcon = icon =>{
        switch(icon){
            case 'Clouds':
                return './assets/cloudy.png';
            case 'Rain':
                return './assets/rainy.png';
            case 'Clear':
                return './assets/clear.png';
            case 'Sunny':
                return './assets/sunny.png';
            default:
                return;
        }
    }

    return(
        <div className = 'weatherNode'>
            <h2>{test[0].slice(0,3)}</h2>
            <h3>{test[2]} {test[1]}</h3>
            <img src={adjustWeatherIcon(weather)} className = 'weather-icon'/>
            <p>Rain: {rain}%</p> 
            <p>Max: {tempMax}°</p>
            <p>Min: {tempMin}°</p>  
        </div>
    )
}

export default WeatherDaily