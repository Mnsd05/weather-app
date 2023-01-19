import React from "react"
import { DivCard } from "../styled/Card.style"

export default function Card(props) {
    const [time,setTime] = React.useState({
        hours: "",
        minutes: "",
        seconds: "",
        day:"",
        dayOfMonth:"",
        month:"",
        year:"",
    })
    
    const [weatherData, setWeatherData] = React.useState({})
    const [count, setCount] = React.useState(false)
    const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const Month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    if (count) {
        setCount(false)
        setInterval(() => {
        const date = new Date()
        setTime(prevTime => {
            let curHours = (date.getHours()) + weatherData.timeZone / 3600 - 8
            let curDay = weekDay[date.getDay()]
            if (curHours > 23) {
                curHours -= 24
                curDay = weekDay[(date.getDay() + 1) % 7]
            }
            else if (curHours < 0) {
                curHours += 24
                curDay = weekDay[(date.getDay() - 1) % 7]
            }
            const curMinutes = (date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes())
            const curSeconds = (date.getSeconds() < 10 ? `0${date.getSeconds()}`: date.getSeconds())
            
            return {
                hours: curHours,
                minutes: curMinutes,
                seconds: curSeconds,
                day: curDay,
                dayOfMonth: date.getDate(),
                month: Month[date.getMonth()],
                year: date.getFullYear(),
            }
        })
    }, 1000)
    }
    React.useEffect(() => {
        async function getResponse() {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${props.location}&appid=941b0a48084f661c8074fc9a54e11ee7`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setWeatherData({
                timeZone: data.timezone,
                location: data.name,
                temp: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
            })
            setCount(true)
        }
        getResponse()

    },[])
    let image = ""
    if (time.hours < 18 && time.hours > 6) {
        if (weatherData.description === "few clouds" || weatherData.description === "scattered clouds" || weatherData.description === "broken clouds" || weatherData.description === "overcast clouds") image = "./images/cloudyday.jpg"
        else if (weatherData.description === "clear sky") image = "./images/sunnyday.jpg"
        else if (weatherData.description === "light rain" || weatherData.description === "light intensity shower rain") image = "./images/rainyday.png"
    } else {
        if (weatherData.description === "few clouds" || weatherData.description === "scattered clouds" || weatherData.description === "broken clouds" || weatherData.description === "overcast clouds") image = "./images/night.jpg"
        else if (weatherData.description === "clear sky") image = "./images/night.jpg"
        else if (weatherData.description === "light rain" || weatherData.description === "light intensity shower rain") image = "./images/rainynight.jpg"
    }
  


    return (
        <DivCard className="card--container" imageSrc = {image} >
            <h3>{time.hours === "" ? "" : `${time.hours}:${time.minutes}:${time.seconds}`}</h3>
            {/* <h1>{time.day}</h1> */}
            <h3>{weatherData.location}</h3>
            <h1 className="temp">{`${Math.floor(weatherData.temp) - 273}`}&#176;</h1>
            <h4>{weatherData.description}</h4>
            <div className="extra--weather">
                <img src = "./images/humidity.png" width = {20}px></img>
                <span className="humidity">{weatherData.humidity}</span>
                <img src = "./images/pressure.png" width = {20}px></img>
                <span>{weatherData.pressure}</span>
            </div>
        </DivCard>
    )
}
// `https://api.openweathermap.org/data/2.5/weather?q=${props.location}&appid=941b0a48084f661c8074fc9a54e11ee7`
// {
//     "coord": {
//       "lon": 103.8501,
//       "lat": 1.2897
//     },
//     "weather": [
//       {
//         "id": 802,
//         "main": "Clouds",
//         "description": "scattered clouds",
//         "icon": "03d"
//       }
//     ],
//     "base": "stations",
//     "main": {
//       "temp": 301.97,
//       "feels_like": 306.21,
//       "temp_min": 299.1,
//       "temp_max": 305.23,
//       "pressure": 1007,
//       "humidity": 74
//     },
//     "visibility": 6000,
//     "wind": {
//       "speed": 5.14,
//       "deg": 120
//     },
//     "clouds": {
//       "all": 40
//     },
//     "dt": 1673686176,
//     "sys": {
//       "type": 1,
//       "id": 9470,
//       "country": "SG",
//       "sunrise": 1673651498,
//       "sunset": 1673694883
//     },
//     "timezone": 28800,
//     "id": 1880252,
//     "name": "Singapore",
//     "cod": 200
//   }

