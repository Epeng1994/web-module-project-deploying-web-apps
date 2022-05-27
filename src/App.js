import axios from 'axios'
import React, {useState} from 'react'
import './App.css';
import WeatherDaily from './components/WeatherDaily'
import CurrentWeather from './components/CurrentWeather'



function App() {
  
  const [city, setCity] = useState({
    cityName:'queens',
    cityState:'new york'
  })
  
  const [forecast, setForecast] = useState([])


  const handleChange = e =>{
    const {name, value} = e.target
    setCity({...city, [name]: value.toLowerCase()})
  }


  const calculateTempToFarenheit = temp =>{
    return Math.round((temp - 273.15)* 9/5 + 32)
  }


  //date, humidity/rain, high temp, low temp

  const handleSubmit =e=>{
    e.preventDefault()
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city.cityName}&limit=5&appid=${process.env.REACT_APP_weatherAPI}`)
      .then(res=>{
        //console.log(res.data)
        let result = res.data.find(a=>a.state.toLowerCase()===city.cityState) //single city object
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${Math.ceil(result.lat)}&lon=${Math.ceil(result.lon)}&exclude=hourly,minutely&appid=${process.env.REACT_APP_weatherAPI}`)
          .then(res=>{
            console.log(res.data.daily)
            let result = res.data.daily.map(a=>{
              return {
                rain:a.rain !== undefined ? Math.round(a.rain) : 0,
                tempMax:calculateTempToFarenheit(a.temp.max),
                tempMin:calculateTempToFarenheit(a.temp.min),
                weather: a.weather[0].main
              }
            })
            setForecast(result)
            console.log(forecast)
          })
          .catch(err=>{
            console.log(err)
          })
      })
      .catch(err=>{
        console.log(err)
      })
  }



  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src='./assets/weather.gif' alt='weather gif' className = 'weatherHeader'/>
        </div>
      <h2>Weather or Not?</h2>
      <form onSubmit={handleSubmit}>
        <input name = 'cityName' placeholder = 'enter a city' onChange={handleChange}/>
        <input name = 'cityState' placeholder = 'enter a state' onChange={handleChange}/>
        <button>Submit</button>
      </form>
      </header>
      7 day forecast
      {forecast[0] ? <CurrentWeather info = {forecast[0]}></CurrentWeather> : ''}
      <div className = 'weatherContainer'>
        {
          forecast.map((a,i)=>{
            if(i===0){
              return 
            }else{
              return(
                <WeatherDaily info={a} count = {i}/>
              )
            }
          })
        }
      </div>
    </div>
  );
}

export default App;
