import React from "react"
import Card from "./components/Card"
export default function App() {
    return (
        <section className="favourite--places">
            <Card location = "Singapore" />
            <Card location = "London" />
            <Card location = "New York" />
        </section>
        
    )
}


