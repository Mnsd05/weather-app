import React from "react"
import Card from "./components/Card"
import Navbar from "./components/Navbar"
import Carda from "./components/Carda"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default function App() {
    const settings = {  // from slick neostack
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
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
            <Slider className={`favourite--places ${secondClass}`} {...settings}>
                <Card location = "Singapore" />
                <Card location = "London" />
                <Card location = "New York" />
            </Slider>
            {searchData && <Carda key = {searchData} location = {searchData} back = {clickBack}/>}
        </div>
        
    )
}


