import React from "react"
import Card from "./components/Card"
import Navbar from "./components/Navbar"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CardSearch from "./components/CardSearch"
export default function App() {
    const settings = {  // from slick neostack to set carousel properties
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
    //search location and get information for this location
    const [searchData, setSearchData] = React.useState("") 
    const [favouritePlaces, setFavouritePlaces] = React.useState(new Set(JSON.parse(localStorage.getItem("favourite--places"))))
    //array contains favourite places
    const [cardArray, setCardArray] = React.useState([...favouritePlaces])

    let secondClass = ""
    //collect data using fetch
    const handleData = React.useCallback((data) => {
        setSearchData(prevData => data)
    },[]);

    //add clickback feature after searching
    const clickBack = React.useCallback(() => {
        setSearchData(prevData => "")
        setCardArray(prevFavouritePlaces => [...favouritePlaces])
    },[favouritePlaces]);

    //https://stackoverflow.com/questions/58806883/how-to-use-set-with-reacts-usestate
    const addFavouritePlace = React.useCallback((place) => {
      setFavouritePlaces (prevSet => new Set([...prevSet, place]))
    },[]);

    const removeFavouritePlace = React.useCallback((place) => {
      setFavouritePlaces (prevSet => new Set([...prevSet].filter(x => x !== place)))
    },[]);
  
    const favouriteCard = cardArray.map((prevElement) => {
      localStorage.setItem("favourite--places", JSON.stringify(cardArray))
      return <Card location = {prevElement}/>
    })
    
    if (searchData !== "") secondClass = "blur"
    return (
        <div className = "main--container">
            <Navbar getData = {handleData}/>
            <Slider key = {cardArray} className={`favourite--places ${secondClass}`} {...settings}>
                {favouriteCard}
            </Slider>
            {searchData && <CardSearch key = {searchData} location = {searchData} back = {clickBack} favouriteList = {favouritePlaces}
            addFav = {addFavouritePlace} removeFav = {removeFavouritePlace}/>}
        </div>
        
    )
}


