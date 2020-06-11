import React, { useEffect, useState }  from 'react'
import { getSingleMedium, getSingleUser, addFavourite, deleteFavourite } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect, useParams } from 'react-router-dom'
import Spinner from '../common/Spinner'
import Reviews from '../common/Reviews'
import moment from 'moment'
import { isAuthenticated } from '../../lib/auth'


function MediumShow() {
  const { id } = useParams()
  const { data: medium, loading, error } = useFetch(getSingleMedium, id)
  const { data: user } = useFetch(getSingleUser)
  const [ mediumToMap, setMediumToMap ] = useState([]) //* setting state here
  // eslint-disable-next-line no-unused-vars
  const [ userFavourites, setUpdateFavourites ] = useState([])
  const [ isFavourite, setIsFavourite ] = useState(null) //! changed from false to empty object becasue that's what you are getting returned. Then changed it to null, so if there is an object inside there it will be true 

	

	
  useEffect(() => {
    const getGenreOfMedium = medium ? medium.genres.map(item => item) : null //* if medium is loaded -> continue to medium.genres.map -> if it's not this return null

    setMediumToMap(getGenreOfMedium) //* setting getGenreOfMedium to state

    const listOfFavourites = user ? user.favourites.map(item => item) : null 
    
    const mediumId = medium ? medium.id : null
    
    const isItAlreadyAFave = listOfFavourites ? listOfFavourites.find(faveMedium => faveMedium.medium.id === mediumId) : null //! Changed from .some to .find becasue we want to find the whole object not just return a boolean
    //! Just changed faveMedium.id to faveMedium.medium.id becasue it's dounble nested (want to compare 2 mediumIds not favouriteId and mediumId)
    setIsFavourite(isItAlreadyAFave)

	


    //! ** The if else was here originally but didn't make sense to be inside the useEffect becasue it wouldn't know about any state change at this point 

  },[medium, user]) //* every time medium  and user change. It will trigger this function to run

  //! There was an if else statement here checking if the medium was a favourite or not and changing the button text accordingly, but don't need that anymore with the ternary inside the button text in return **
	
  const handleClick = async (e) => {

    const mediumId = e.target.value

    if (isFavourite){

      console.log('Is already a favourite')
      const result = await deleteFavourite(isFavourite.id)
      setUpdateFavourites(result.data)
      setIsFavourite(null)

    } else {
      const res = await addFavourite(mediumId)
      const medium = res.data
      setIsFavourite(medium)
    }

  }
	


  if (error) {
    return <Redirect to="/notfound" />
  }

  return (
    <div>

      <br />

      {loading ?
        <Spinner />
        :
        <div>

          <h1>{medium.title}</h1>

          <br />

          {mediumToMap ? mediumToMap.map(mediumGenre => (  //* like this.state. using mediumToMap from state
            <h1 key={mediumGenre.id}>{mediumGenre.name}</h1> //* this the genre
          )) : null }
          

          <h1>{medium.creator}</h1>
          <h1>{medium.duration}</h1>
          <h1>{medium.price}</h1> 
          <h1>{moment(medium.start_date).format('MMM Do YY')} - {moment(medium.end_date).format('MMM Do YY')}</h1>
          <h1>{medium.art_gallery_location}</h1>
          <h1>{medium.art_gallery}</h1>
          <p>{medium.info}</p>
          <h2>{medium.year}</h2>
          <img src={medium.image} alt={medium.title} />
          {/* <video src={medium.trailer} /> */}
          <br/>
          {isAuthenticated() && <button onClick={handleClick} value={medium.id}>{ isFavourite ? 'Remove from favourites' : 'Add to favourites' }</button>}
          <Reviews
            mediumId={medium.id}
          />
          
        </div>
      }
    </div>
  )
}
export default MediumShow 