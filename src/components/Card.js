import React from "react"
import { DivCard } from "../styled/Card.style"

export default function Card(props) {
    const [time,setTime] = React.useState({
        hours: "",
        minutes: "",
        seconds: "",
    })
    
    const [weatherData, setWeatherData] = React.useState({
        timeZone: "",
        location: "",
        temp: "",
        description: "",
        humidity: "",
        pressure: "",
    })

    const [count, setCount] = React.useState(false)

    if (count) {
        setCount(false)
        setInterval(() => {
        const date = new Date()
        setTime(prevTime => {
            let currentSecondsCoutingFromMidnightUTC = (date.getHours() - 8) * 3600 + date.getMinutes() * 60 + date.getSeconds() 
            + weatherData.timeZone

            if (currentSecondsCoutingFromMidnightUTC >= 86400) {
                currentSecondsCoutingFromMidnightUTC -= 86400
            }
            else if (currentSecondsCoutingFromMidnightUTC < 0) {
                currentSecondsCoutingFromMidnightUTC += 86400
            }
            const displayedHours = Math.floor(currentSecondsCoutingFromMidnightUTC / 3600)
            const currentMinutes = Math.floor((currentSecondsCoutingFromMidnightUTC - displayedHours * 3600) / 60)
            const displayedMinutes = (currentMinutes < 10 ? `0${currentMinutes}`: currentMinutes)
            const currentSeconds = Math.floor((currentSecondsCoutingFromMidnightUTC - displayedHours * 3600 - displayedMinutes * 60))
            const displayedSeconds = (currentSeconds < 10 ? `0${currentSeconds}`: currentSeconds)
            
            return {
                hours: displayedHours,
                minutes: displayedMinutes,
                seconds: displayedSeconds,
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
        if (weatherData.description.includes("clouds")) image = "./images/cloudyday.jpg"
        else if (weatherData.description.includes("sky")) image = "./images/sunnyday.jpg"
        else if (weatherData.description.includes("rain")) image = "./images/rainyday.png"
        else if (weatherData.description.includes("snow")) image = "./images/snowday.jpg"
        else if (weatherData.description.includes("haze")) image = "./images/haze.jpg"
    } else {
        if (weatherData.description.includes("clouds")) image = "./images/night.jpg"
        else if (weatherData.description.includes("sky")) image = "./images/night.jpg"
        else if (weatherData.description.includes("rain")) image = "./images/rainynight.jpg"
        else if (weatherData.description.includes("snow")) image = "./images/snownight.jpg"
        else if (weatherData.description.includes("haze")) image = "./images/haze.jpg"
    }
    console.log(weatherData.timeZone);
    return (
        <DivCard className="card--container" imageSrc = {image} >
            <div className="weather--information">
                <h3>{time.hours === "" ? "" : `${time.hours}:${time.minutes}:${time.seconds}`}</h3>
                <h3>{weatherData.location}</h3>
                <h1 className="temp">{`${Math.floor(weatherData.temp) - 273}`}&#176;</h1>
                <h4>{weatherData.description}</h4>
                <div className="extra--weather">
                    <img src = "./images/humidity.png" width = {20}px></img>
                    <span className="humidity">{weatherData.humidity}</span>
                    <img src = "./images/pressure.png" width = {20}px></img>
                    <span>{weatherData.pressure}</span>
                </div>
            </div>
        </DivCard>
    )
}
