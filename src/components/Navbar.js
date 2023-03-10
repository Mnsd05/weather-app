import React from "react"
export default function Navbar(props) {
    const [currentClass, setCurrentClass] = React.useState("")
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            props.getData(event.target.value)
        }
      }
    const handleClickDropdown = () => {
        setCurrentClass(prevClass => { 
            if (prevClass === "" || prevClass === "rotate--back") {
                return "rotate"
            } else {
                return "rotate--back"
            }
        })
    }
    return (
        <nav>
            <button className="dropdown">
                <div>Features</div>
                <img className = {currentClass} src = "images/triangle.png" alt = "" width = {10}px 
                onClick={handleClickDropdown}></img>
                </button>
            <input type = {"text"} className="search--box" placeholder="Enter your search here" onKeyDown = {handleKeyPress}>
            </input>
        </nav>
    )
}