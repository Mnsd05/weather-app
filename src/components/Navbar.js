import React from "react"
export default function Navbar(props) {
    const [currentClass, setCurrentClass] = React.useState("")
    const [openStatus, setOpenStatus] = React.useState("")
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
        setOpenStatus(prevStatus => {
            if (prevStatus === "" || prevStatus === "close") {
                return "open"
            } else {
                return "close"
            }
        })
    }

    return (
        <nav>
            <button className="dropdown" onClick={handleClickDropdown}>
                <div>Features</div>
                <img className = {currentClass} src = "images/triangle.png" alt = "" width = {10}px></img>
            </button>
            <div className={`feature--list ${openStatus}`} >
                <div className="feature--line">
                    <img className = "feature--image" src = "./images/predict.png"></img><span>Prediction</span>
                </div>
                <div className="feature--line">
                    <img className = "feature--image" src = "./images/bug.png"></img><span>Report bug</span>
                </div>
                <div className="feature--line">
                    <img className = "feature--image" src = "./images/alert.png"></img><span>Alert</span>
                </div>
            </div>
            <input type = {"text"} className="search--box" placeholder="Enter your search here" onKeyDown = {handleKeyPress}>
            </input>
        </nav>
    )

}