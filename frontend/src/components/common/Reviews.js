import React from 'react'

import { createReview, getSingleMedium, deleteReview } from '../../lib/api'
import { isOwner, getPayload, isAuthenticated } from '../../lib/auth'
import Ratings from 'react-ratings-declarative'


class Reviews extends React.Component {
  state = {
    medium: null,
    content: '',
    rating: 0,
    rows: '3',
    reviewsStatus: true,
    buttonText: 'Show More Reviews',
    errorMessage: null,
    reviewUserIds: null
  }

  async getData() { //* this function can be called whenever you need to update the info on the page
    try {
      const mediumId = this.props.mediumId
      const res = await getSingleMedium(mediumId)
      this.setState({ medium: res.data })

      //* checking if there's a medium in state, if so triggering oneReviewOnly
      if (this.state.medium) {
        return this.oneReviewOnly()
      } else {
        return
      }

    } catch (error) {
      console.log(error)
    }
  }
  componentDidMount() {
    this.getData() //* calling the getData function as soon as the page loads to display the info straight away
  }

    //! FINDING USER IDS IN MEDIUM.REVIEWS AND SETTING THEM TO STATE WITH reviewUserIds: reviewOwner
    oneReviewOnly = async () => {
      try {
        const reviewOwner = this.state.medium.reviews.map(review => {
          return review.owner.id
        })
        this.setState({ reviewUserIds: reviewOwner }) //* setting state to result of above map function
      } catch (error) {
        console.log(error)
      }
      this.hasUserPostedReview() 
    }

    //! HAS THE USER ALREADY POSTED A REVIEW
    //* can use this function as a "checker function" to see if it's true or false before the return in the render. Determining whether or not to render the code. Conditional rendering
    hasUserPostedReview = () => {
      const currentUser = getPayload().sub
      return this.state.reviewUserIds.some(reviwUserId => reviwUserId === currentUser) //* single version of array I'm looping through. Seeing if reviewUserId is === to currentUser. Should return true if the currentUser has left a review already
    }


  //! RATING
  changeRating = ( newRating ) => {
    try {
      this.setState({
        rating: newRating
      })
    } catch (error) {
      console.log(error)
    }
  }


  //! Reviews
  reviewHandleChange = event => {
    const content = event.target.value //* saving what the user types into the Review box
    this.setState({ content }) //* setting state with their review
  }

  reviewHandleSubmit = async event => {
    event.preventDefault()
    const mediumId = this.props.mediumId
    if (this.state.rating === 0 || this.state.rating > 5) {
      this.setState({ errorMessage: 'Please Add A Rating To Your Review' }) //* if user tried to post a review without adding a rating
      return
    }
    try {
      this.setState({ errorMessage: null }) //* if user has added a rating to review or there was an error message before then we can set the error message back to null
      await createReview({ content: this.state.content, rating: this.state.rating, medium: mediumId }, mediumId) //* the add review function requires a text field so you can pass it through like so - also it needs to match the order that you're using the arguments in your api.js file
      this.setState({ content: '', rating: 0 }) //* setting the review box back to empty
      this.getData() //* calling this getData function again to reload the page with the new database info and display your new review straight away!
    } catch (err) {
      console.log(err.response.data)
    }

  }

  reviewHandleDelete = async event => {
    event.preventDefault()

    try {
      const reviewId = event.target.getAttribute('review-id')

      const mediumId = this.state.medium.id

      await deleteReview(mediumId, reviewId)

    } catch (err) {
      console.log(err)
    }
    this.getData()
  }

  showMoreReviewsHandleClick = async () => {
    //* now the rows will be equal to the comments array lenght and all the comments will be shown
    const newRows = this.state.medium.reviews.length
    this.setState({ rows: newRows })
    this.getData()

  }

  ShowLessReviewsHandleClick = async () => {
    const lessRows = '3'
    this.setState({ rows: lessRows })
    this.getData()
  }

  toggleReviewsHandleClick = async event => {
    event.preventDefault()
    const show = this.state.reviewsStatus

    if (show) {
      this.setState({ reviewsStatus: false, buttonText: 'Show Less Reviews' })
      this.showMoreReviewsHandleClick()
    } else {
      this.setState({ reviewsStatus: true, buttonText: 'Show More Reviews' })
      this.ShowLessReviewsHandleClick()
    }
  }

  render() {
    if (!this.state.medium) return null
    if (!this.state.reviewUserIds) return null

    const { medium, content, buttonText, rating, rows } = this.state //* content field in state

    return (
      <>
        <div className="media-content">
          
          {!this.hasUserPostedReview() && isAuthenticated() ? <form onSubmit={this.reviewHandleSubmit}>
            <div className="field">
              <p className="control">
                <textarea
                  className="textarea"
                  placeholder="Enter Your Review Here"
                  name="content"
                  onChange={this.reviewHandleChange}
                  value={content}
                />
              </p>
            </div>
            <div className="field">
              <p className="control reviews-p-button-wrap">
                <button type="submit" className="button post-review-button">Post Review</button>
              </p>
              <br />
            </div>
          </form> : null}
          
          
          {this.state.errorMessage ? <div style={{ color: 'red' }}>{this.state.errorMessage}</div> : null }
          {!this.hasUserPostedReview() && isAuthenticated() ? 
            <Ratings
              rating={rating}
              widgetDimensions="40px"
              widgetRatedColors="gold"
              changeRating={this.changeRating}
            >
              <Ratings.Widget widgetHoverColor="gold"/>
              <Ratings.Widget widgetHoverColor="gold"/>
              <Ratings.Widget widgetHoverColor="gold"/>
              <Ratings.Widget widgetHoverColor="gold"/>
              <Ratings.Widget widgetHoverColor="gold"/>
            </Ratings> : null
          } 
          <div>
            <article className="media">
              <div className="media-content">
                <div className="content">
                  {medium.reviews.slice(0, rows).map((review, index) => {
                    return (
                      <div className="item" key={index}>
                        <p>
                          <strong>{review.owner.username}</strong>
                        </p>
                        <p> {review.content} </p>
                        <Ratings
                          rating={review.rating}
                          widgetRatedColors="gold"
                          widgetDimensions="20px"
                          widgetSpacings="3px"
                        >
                          <Ratings.Widget widgetHoverColor="gold"/>
                          <Ratings.Widget widgetHoverColor="gold"/>
                          <Ratings.Widget widgetHoverColor="gold"/>
                          <Ratings.Widget widgetHoverColor="gold"/>
                          <Ratings.Widget widgetHoverColor="gold"/>
                        </Ratings>
                        {isOwner(review.owner.id) &&
                        <button className="review-delete-button" review-id={review.id}
                          onClick={this.reviewHandleDelete}>Delete
                        </button>}
                        <hr />
                      </div>
                    )
                  })}
                  {this.state.medium.reviews.length > 3 &&
                  <button className="button show-more-less-button" onClick={this.toggleReviewsHandleClick}>{buttonText}</button>}
                </div>
              </div>
            </article>
          </div>
        </div> 
      </>
    )
  }

}

export default Reviews
