

import React, { useEffect, useState } from 'react'
import {
  getSingleMedium,
  getSingleUser,
  addFavourite,
  deleteFavourite
} from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect, useParams } from 'react-router-dom'
import Spinner from '../common/Spinner'
import Reviews from '../common/Reviews'
import { isAuthenticated } from '../../lib/auth'
function MediumShow() {
  const { id } = useParams()
  const { data: medium, loading, error } = useFetch(getSingleMedium, id)
  const { data: user } = useFetch(getSingleUser)
  const [mediumToMap, setMediumToMap] = useState([]) //* setting state here
  // eslint-disable-next-line no-unused-vars
  const [userFavourites, setUpdateFavourites] = useState([])
  const [isFavourite, setIsFavourite] = useState(null) //! changed from false to empty object becasue that's what you are getting returned. Then changed it to null, so if there is an object inside there it will be true
	
  useEffect(() => {
    if (!medium ) return
    if (!user ) return

    const getGenreOfMedium = medium.genres.map((item) => item) //* if medium is loaded -> continue to medium.genres.map -> if it's not this return null
    const listOfFavourites = user.favourites.map((item) => item) || [] //* adding an 'or' here means that if the user has no favourites listOfFavourites will be an empty array rather than undefined so it shouldnt error
    const mediumId = medium.id //* you can remove this if you want and just use medium.id in the find function but totally up to you
    const isItAlreadyAFave = listOfFavourites.find((faveMedium) => faveMedium.medium.id === mediumId) //! Changed from .some to .find becasue we want to find the whole object not just return a boolean
    //! Just changed faveMedium.id to faveMedium.medium.id becasue it's dounble nested (want to compare 2 mediumIds not favouriteId and mediumId)
    //* setting everything to state here:
    setMediumToMap(getGenreOfMedium)
    setIsFavourite(isItAlreadyAFave)
    setUpdateFavourites(listOfFavourites)
    //! ** The if else was here originally but didn't make sense to be inside the useEffect becasue it wouldn't know about any state change at this point
  }, [medium, user]) //* every time medium  and user change. It will trigger this function to run
  //! There was an if else statement here checking if the medium was a favourite or not and changing the button text accordingly, but don't need that anymore with the ternary inside the button text in return **
  const handleClick = async (e) => {
    const mediumId = e.target.value
    if (isFavourite) {
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
      {loading ? (
        <Spinner />
      ) : (
        <div className="medium-show-flex">
          <div className="fam-title-index-container">
            <h1 className="home-tile-fam">FAM</h1>
          </div>
          <div className="medium-show-row">
            <div className="favourite-show-button-wrap">
              {isAuthenticated() && (
                <button className="add-to-favourites-button" onClick={handleClick} value={medium.id}>
                  {isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                </button>
              )}
            </div>
          </div>
          <div className="medium-show-row">
            <div className="medium-show-image-div">
              <img className="medium-show-image" src={medium.image} alt={medium.title} />
            </div>
            <div className="medium-show-text">
              <div>
                <h1 className="medium-show-medium-title">{medium.title}</h1>
                {mediumToMap
                  ? mediumToMap.map((
                    mediumGenre //* like this.state. using mediumToMap from state
                  ) => (
                    <h1 className="medium-show-medium-genre" key={mediumGenre.id}>{mediumGenre.name}</h1> //* this the genre
                  ))
                  : null}

                <h1 className="medium-show-medium-creator">{medium.creator}</h1>
                <h1 className="medium-show-medium-duration">{medium.duration}</h1>
                <h1 className="medium-show-medium-date">
                  {medium.start_date} {medium.end_date}
                </h1>
                <h1 className="medium-show-medium-art-gallery-location">{medium.art_gallery_location}</h1>
                <h1 className="medium-show-medium-art-gallery">{medium.art_gallery}</h1>
                <h2 className="medium-show-medium-year">{medium.year}</h2> 
                <h1 className="medium-show-medium-price">{medium.price}</h1>
                <p className="medium-show-medium-info">{medium.info}</p>
                
              </div>
            </div>
          </div>
          <div className="medium-show-row">
            <Reviews mediumId={medium.id} />
          </div>
        </div>
      )}
    </div>
  )
}
export default MediumShow