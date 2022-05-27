import React from 'react'

const CurrentWeather = props=>{
    const {rain, tempMax, tempMin, weather} = props.info

    
    return(
        <div>{rain} {tempMax} {tempMin} {weather}</div>
    )
}


export default CurrentWeather