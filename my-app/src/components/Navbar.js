import React from "react"

export default function Navbar(props) {
    const [search, setSearch] = React.useState("")
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            props.getData(event.target.value)
        }
      }
    return (
        <nav>
            <input type = {"text"} className="search--box" placeholder="Enter your search here" onKeyDown = {handleKeyPress}>
            </input>
        </nav>
    )
}