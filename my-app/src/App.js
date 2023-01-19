import React from "react"
import Card from "./components/Card"
import Navbar from "./components/Navbar"
import Carda from "./components/Carda"
export default function App() {
    const [searchData, setSearchData] = React.useState("")
    let secondClass = ""
    const handleData = (data) => {
        setSearchData(data)
    }
    const clickBack = () => {
        setSearchData("")
    }
    if (searchData !== "") secondClass = "blur"
    return (
        <div className = "main--container">
            <Navbar getData = {handleData}/>
            <section className={`favourite--places ${secondClass}`}>
                <Card location = "Singapore" />
                <Card location = "London" />
                <Card location = "New York" />
            </section>
            {searchData && <Carda key = {searchData} location = {searchData} back = {clickBack}/>}
        </div>
        
    )
}


