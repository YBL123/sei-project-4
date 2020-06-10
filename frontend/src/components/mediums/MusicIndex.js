import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect, Link } from 'react-router-dom'
// import Spinner from '../common/Spinner'
import moment from 'moment'

function MusicIndex() {
  const { data: post, error } = useFetch(getAllPosts)
  const [recentPost, setRecentPost] = useState('') //* setting state here. 
  const [dateOfPosts, setDateOfPosts] = useState('')
  const [postsToRender, setFilteredPosts] = useState('')
  const [selectHasBeenUsed, setSelectHasBeenUsed] = useState(false)

  useEffect(() => {
    const max = post ? post.length - 1 : null //* making the result ternary. Doing it here rather than the render, using the varaible to specify. Only creates variable max with post length if post exists. (-1 becaue length is not the same as the index number)

    const recentPost = max ? post[max] : null

    setRecentPost(recentPost) //* sets post with index that has the greatest value to state -> it can be resued using recentPost

    const dateOfPosts = post ? post.map(post => ( //* Mapping over the 

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
    console.log('HERE', postsToRender)
    return setFilteredPosts(postsToRender)
  }

  if (error) {
    return <Redirect to="/notfound" />
  }





  return (
    <div>
      <h1>Music Index</h1>

      <select onChange={handleChange} >

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

      {selectHasBeenUsed ? (
        postsToRender.map(post => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <h2>{post.music_title}</h2>
            {post.mediums.map((medium) =>
              medium.category === 3 ? (
                <div key={medium.id}>
                  <h1>{medium.title}</h1>
                  <h1>{medium.creator}</h1>
                  <h1>{medium.duration}</h1>
                  <Link to={`/mediums/${medium.id}`}>
                    <img src={medium.image} alt={medium.title} />
                  </Link>
                </div>
              ) : null
            )}
          </div>
        ))


      ) : recentPost ? (
        <div>
          <h1>{recentPost.title}</h1>
          <h2>{recentPost.music_title}</h2>
          {recentPost.mediums.map((medium) =>
            medium.category === 3 ? ( //* music is category 3
              
              <div key={medium.id}>
                <h1>{medium.title}</h1>
                <h1>{medium.creator}</h1>
                <h1>{medium.duration}</h1>
                <Link to={`/mediums/${medium.id}`}>
                  <img src={medium.image} alt={medium.title} />
                </Link>
                {/* <video src={medium.video} /> */}
              </div>
            ) :
              null
          )}
        </div>
      ) : null}
    </div>
  )

}

export default MusicIndex

