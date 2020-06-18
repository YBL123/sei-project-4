import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect, Link } from 'react-router-dom'
// import Spinner from '../common/Spinner'
import moment from 'moment'

function ArtIndex() {
  const { data: post, error } = useFetch(getAllPosts)
  const [recentPost, setRecentPost] = useState('') //* setting state here. 
  const [dateOfPosts, setDateOfPosts] = useState('')
  const [postsToRender, setFilteredPosts] = useState('')
  const [selectHasBeenUsed, setSelectHasBeenUsed] = useState(false)

  useEffect(() => {
    const max = post ? post.length - 1 : null //* making the result ternary. Doing it here rather than the render, using the varaible to specify. Only creates variable max with post length if post exists. (-1 becaue length is not the same as the index number)

    const recentPost = max ? post[max] : null

    setRecentPost(recentPost) //* sets post with index that has the greatest value to state -> it can be resued using recentPost

    const dateOfPosts = post ? post.map(post => (

      { ...post, date_posted: moment(post.date_posted).format('LL') } //* Change date into usable format - set these fromatted date posts to state
    )) : null

    setDateOfPosts(dateOfPosts)



  }, [post]) //* every time post changes. It will trigger this function to run

  const handleChange = (e) => {
    setSelectHasBeenUsed(true)
    const selectedMonth = e.target.value
    const postsToRender = dateOfPosts.filter(post =>
      post.date_posted.includes(selectedMonth)

    )
    return setFilteredPosts(postsToRender)
  }

  if (error) {
    return <Redirect to="/notfound" />
  }





  return (
    <div>
      <div className="fam-title-index-container">
        <h1 className="home-tile-fam">FAM</h1>
      </div>

      <div className='select-wrapper'>
        <select onChange={handleChange} className='select-dropdown  fadeInUp'>

          <option >Filter By Month</option>
          <option value="January">JANUARY</option>
          <option value="February">FEBRUARY</option>
          <option value="March">MARCH</option>
          <option value="April">APRIL</option>
          <option value="May">MAY</option>
          <option value="June">JUNE</option>
          <option value="July">JULY</option>
          <option value="August">AUGUST</option>
          <option value="September">SEPTEMBER</option>
          <option value="October">OCTOBER</option>
          <option value="November">NOVEMBER</option>
          <option value="December">DECEMBER</option>
        </select>
      </div>
      <div>
        {selectHasBeenUsed ? (
          postsToRender.map(post => (
            <div className="medium-index-wrapper" key={post.id}>
              {/* <h1>{post.title}</h1> */}
              <h2 className='index-page-h2'>{post.art_title}</h2>
              {post.mediums.map((medium) =>
                medium.category === 1 ? (
                  <div className='medium-wrapper' key={medium.id}>
                    <div className="medium-info">
                      <h1 className='index-page-h1-title'>{medium.title}</h1>
                      <h1 className='index-page-h1'>{medium.creator}</h1>
                    </div>
                    <div className="medium-img">
                      <Link to={`/mediums/${medium.id}/`}>
                        <img className='medium-art-index' src={medium.image} alt={medium.title} />
                      </Link>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ))


        ) : recentPost ? (
          <div className="medium-index-wrapper">
            {/* <h1>{recentPost.title}</h1> */}
            <h2 className='index-page-h2'>{recentPost.art_title}</h2>
            {recentPost.mediums.map((medium) =>
              medium.category === 1 ? (
                <div className='medium-wrapper' key={medium.id}>
                  <div className="medium-info">
                    <h1 className='index-page-h1-title'>{medium.title}</h1>
                    <h1 className='index-page-h1'>{medium.creator}</h1>
                  </div>
                  <div className="medium-img">
                    <Link to={`/mediums/${medium.id}/`}>
                      <img className='medium-art-index' src={medium.image} alt={medium.title} />
                    </Link>
                    {/* <video src={medium.video} /> */}
                  </div>
                </div>
              ) :
                null
            )}
          </div>
        ) : null
        }
      </div >
    </div >
  )

}

export default ArtIndex