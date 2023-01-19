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
    const [favouritePlaces, setFavouritePlaces] = React.useState(new Set(["London", "Singapore", "New York"]))
    const [cardArray, setCardArray] = React.useState([...favouritePlaces])
    let secondClass = ""
    const handleData = (data) => {
        setSearchData(data)
    }
    const clickBack = () => {
        setSearchData("")
        setCardArray([...favouritePlaces])
    }
    //https://stackoverflow.com/questions/58806883/how-to-use-set-with-reacts-usestate
    const addFavouritePlace = (place) => {
      setFavouritePlaces (prevSet => new Set([...prevSet, place]))
    }
    const removeFavouritePlace = (place) => {
      setFavouritePlaces (prevSet => new Set([...prevSet].filter(x => x !== place)))
    }
  
    const favouriteCard = cardArray.map((prevElement) => {
      return <Card location = {prevElement}/>
    })
    
    if (searchData !== "") secondClass = "blur"
    return (
        <div className = "main--container">
            <Navbar getData = {handleData}/>
            <Slider key = {cardArray} className={`favourite--places ${secondClass}`} {...settings}>
                {favouriteCard}
            </Slider>
            {searchData && <Carda key = {searchData} location = {searchData} back = {clickBack} favouriteList = {favouritePlaces}
            addFav = {addFavouritePlace} removeFav = {removeFavouritePlace}/>}
        </div>
        
    )
}


