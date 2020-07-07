<img align="left" width="50" height="50" src="GA.png" alt="GA logo">

# Project 4: FAM
![fam title](readme-fam.png )

## Overview
Welcome to FAM.  This is a curated app. Each month we share ‘Our Favourites For The Month’ for film, art and music. 

Users can filter the posts by month in the index pages,  should they want to look at previous posts.

Signing up gives users the ability to access the favourites feature. This allows them to curate their own favourites list. 

Once signed up they are also able to leave reviews and ratings on our curated posts.

My teammate and I had 8 days to build a full stack application. We began by planning out our models’ relationships using an ERD model. We then built the foundation of our backend in Django together in pair programming.  We both wanted to work full stack on this project and so once the foundation was laid we split responsibilities. I worked full stack on the reviews and ratings. I was also responsible for building the login, register and the seeds.  The rest of the front end and styling was split 50/50. We had also explored using React Hooks in some of our components as we both really loved the concept of useState and useEffect.


## Team
I loved collaborating in a team on my previous project and so I chose to work in a pair for this project.

* [Eleanor Byass](https://github.com/ebyass)

## Deployment
The website is deployed on Heroku and can be found [here](https://the-fam.herokuapp.com/)

(After one hour of inactivity Heroku puts the dyno to sleep. The first request may be be wakening it up again and so the first request the router sends will have some delay).

## Built With
* Python
* Django
* PostgreSQL
* React
* React Hooks
* Insomnia
* Axios
* Sass
* Bulma
* Git
* GitHub

## Getting Started

To download the source code click the clone button. Run the following commands in the terminal:

### Frontend: 

* To install all the packages in the frontend directory:
```terminal
yarn 
```

* To run the app in your localhost:
* In front :
```terminal
yarn start
```

### Backend: 

To install all the packages in the root directory: 
* Install Django and a shell in the root directory: 
```terminal
pip install pipenv
```

```terminal
pipenv install django
```

```terminal
pipenv shell
```

* Create the postgreSQL database: 

```terminal
pipenv install psycopg2-binary  
```

```terminal
createdb fam  
```

* Migrate everything from the backend
```terminal
python manage.py migrate  
```

* To seed your database run the following command, in the following order:
```terminal
python manage.py loaddata jwt_users/seeds.json
```
```terminal
python manage.py loaddata genres/seeds.json
```
```terminal
python manage.py loaddata categories/seeds.json
```
```terminal
python manage.py loaddata mediums/seeds.json
```
```terminal
python manage.py loaddata posts/seeds.json
```

## Brief
**Solo or Group?**
You are free to work alone or in a group. Both ways have their pros and cons. Remember if you are working in a team that you are all on the same page and working towards the same goal.

* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
* **React Hooks** is optional for this project

## Website Architecture

### ERD Model

![erd model](erd.png )

We began this project by building the above ERD model. It was super beneficial for us to really understand the realtionships between our models and the attributes that each model would need to have. We would often refer back to this model whilst working through the backend.

![insomnia](insomnia.png )
We used insomnia to test out all of our requests. These are all the requests we built for this project.

### Wireframe

![fam wireframe](readme-wireframe.png )

As well as the ERD model, we created a wireframe to plan out the architecture of the app. We both feel as though this is a super useful step in the planning stage. It helps to visualize the upcoming project and although we gave ourselves room for change, it was a great point of reference.
We added a list of "must have" and "nice to have". We then assigned a deadline for ourselves for when the list of "must have" had to be completed and when we wanted to be MVP ready. If we had extra time left we would look at the "nice to have" list.

I will give an overview of the app’s architecture and delve into more detail on some of the features I built.

### Home 

The home page displays the latest post. The latest post in this case is for the month of June. We chose to split the post into our three categories; film, art and music. These three categories are each represented by an image uploaded to the post model. These images will be updated the next time a post is made. When a user clicks on one of these three images they will taken to the correlating index page.

In order to always display the latest post in the home page we built the following function together:

```javascript
function Home() {

  const { data: post, error } = useFetch(getAllPosts)
  const [ recentPost, setRecentPost ] = useState('') 

  useEffect(() => {
    const max = post ? post.length - 1 : null 

    const recentPost = max ? post[max] : null

    setRecentPost(recentPost) 

  },[post]) 
  ```
![fam home](fam-home.png )

What we did here is renamed data: with post. Now we don't need to use this.state. Everything is on post.

Knowing that post is an array, inside of the useEffect we are making the result ternary, using the variable to specify. The variable 'max' is only created with post length if post exists. (- 1 because length is not the same as the index number).

```javascript
setRecentPost(recentPost) 
```
Sets post with the index that has the greatest value to the state. Now it can also be reused using recentPost.

We passed the post variable as an argument inside the dependency array. Now every time post changes, it will trigger this function to run.
Now we can access and display the most recent post. 
As seen below, the link is wrapped around each category image. Once clicked the user is taken to the appropriate index page.

```javascript
          <h2 className='info-wrapper index-page-h2'>{recentPost.info}</h2>
          <div className='home-wrapper'>
            <div className='home-item-wrapper'>
              <h3 className='home-medium-main-title-film'>{recentPost.film_title}</h3>
              <Link to={'/film'}>
                <img className='home-image-film responsive-home-image' src={recentPost.image_film} alt={recentPost.title} />
              </Link>
            </div>
```

### Index 

- Film, Music, Art

![fam index](fam-index.png)

The index pages can be accesed from the home page as mentioned above or via the navbar. Here the user can see the list of favourites for the month in their chosen cateogry. The user is also able to filter by month should they want to see previous posts. (We have the months of May and June for demo purposes).

Each image in the index is wrapped with a link 

```javascript
      <Link to={`/mediums/${medium.id}/`}>
        <img className='medium-image-index'src={medium.image} alt={medium.title} />
      </Link>
```

### Show 

![fam show](fam-show.png )

In contrast to our wireframe I found that it was only really necessary for us to have one show component. In that component I just added all the possibilities that a 'medium' can have. The show page only displays the attributes that are contained on the medium that was clicked on in the index page.

```javascript
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
```

### Reviews  

```python 
class Review(models.Model):
    content = models.TextField(max_length=300)
    #! RATING
    #* small number that must be positive. Minium number of 1, max of 5. Any number in between.
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='reviews', 
        on_delete=models.CASCADE
        )
    medium = models.ForeignKey(
        'mediums.Medium',
        related_name='reviews',
        on_delete=models.CASCADE
        )
```
I added rating to the review model as I knew that we would only want a user to be able to post a review if they also added a rating to their review.

In the reviews model serializers.py I am using the PopulatedReviewSerializer to attach the user to reviews. This way the username can later be accessed and displayed in the frontend and authentication can be applied so only the owner of the review can delete their review.

```python
class PopulatedReviewSerializer(ReviewSerializer):
    owner = UserSerializer()
```

In the medium model serializers.py;

The reviews have a many to many relationship to the medium model. I added them to the PopulatedMediumSerializer as they live on the medium. By attaching the populated review the user will now also be accessible via the medium. 

```python
from reviews.serializers import PopulatedReviewSerializer
...
class PopulatedMediumSerializer(MediumSerializer): #* Read serializer, used when you want to send populated data 
#! Singular = One to Many
#! Plural = Many to Many
    genres = GenreSerializer(many=True)
    category = CategorySerializer()
    reviews = PopulatedReviewSerializer(many=True) #* using populated review to get the user in
```

![fam show review](show-reviews.png )
I made the reviews an independent component so that it could be reused should we want the option to add reviews anywhere else on the app.

Only a user that is logged in can post reviews. They must add a rating to post a review. A red message will appear informing the user of so if they try to post a review without a rating. 
The reviews are wrapped in a ternary. Anyone can view the reviews even if not logged in. But they can not make a post - and the option to do so will not appear unless a user is logged in. 

```javascript
{isAuthenticated() && (
...
          <div className="medium-show-row">
            <Reviews mediumId={medium.id} />
          </div>
        </div>
      )}
```

In the reviews component:
```javascript
class Reviews extends React.Component {
  state = {
...
    reviewsStatus: true,
```
Setting state with reviewsStatus.

```javascript
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
```
Now the getData function is called as soon as the page loads and displays the information straight away.

```javascript
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
```
Here I mapped through reviews to find the the owner of the review. 

```javascript
    //! HAS THE USER ALREADY POSTED A REVIEW
    //* can use this function as a "checker function" to see if it's true or false before the return in the render. Determining whether or not to render the code. Conditional rendering
    hasUserPostedReview = () => {
      const currentUser = getPayload().sub
      return this.state.reviewUserIds.some(reviwUserId => reviwUserId === currentUser) //* single version of array I'm looping through. Seeing if reviewUserId is === to currentUser. Should return true if the currentUser has left a review already
    }
```
In this hasUserPostedReview function I am checking to see if the user logged in matches the id of the owner of the review.

In the return I have wrapped the reviews and ratings with a ternary. Now a user can only leave a review and rating if they are logged in. They may also only leave one review per medium.

```javascript
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
```

![fam show review no rating no post allowed](show-review-no-rating.png )

```javascript
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
```

### Ratings

For the ratings I used the following plug-in and followed the documenation provided: 
```javascript
   "react-ratings-declarative": "^3.4.1"
```

### Register
![fam register](fam-register.png )
Users can be redirected to sign in if they already have an account.

### Login
![fam login](fam-login.png )
Users can be redirected to register if they don't already have an account.

### Favourites
![fam favourites](fam-favourites.png )
Our favourites feature can only be accesed by registered and logged in Users. This feature allows users to add or remove favourites and curate their own lists. Users are able to interact with this feature by clicking on the add/remove favourites button on the medium show page.
The user's favourites can be accessed via the navbar. Here the user can click on any of the three buttons titled Film, Art and music, to see the the list they have curated for each category.

## Challenges
* Planning and understanding the relationships between our models
* Working with serializers and populated serializers 
* Working in a new language we had just learnt - Python
* Working with Hooks for the firs time
* Writing the logic for reviews and ratings
* Working with a lot of nested data on our models
 
## Wins
* The greatest win for this project was how well we worked together as a team
* Meeting all of our deadlines and completing all of our 'must haves'
* Working with Hooks
* Working with Django and Python - really enjoyed exploring and working with them for the first time.
* Making the app responsive (iPhone X)
* Happy with the minimal design. Especially pleased with my design for the favourites page and the side navbar I created


## Future Improvements
* More filter options and being able to filter in favourites/profile page too. Being able to filter by year and month, genre.
* Calendar feature for the art exhibitions - so that a user can add exhibitions to their personal calendar that they can check on and get alerts.
* Having actual media, i.e film and songs for those two components. 
* Being able to edit reviews - I have update review in views.py for the reviews model but didn't have time to implement it in the frontend.
* Making the app responsive for more screen sizes.

## Key Learnings
This was my final project. It was really rewarding to see how far I had come and what I was now able to build and accomplish. It was really exciting to be able to pick up another language (Python), and being able to work with Django for the backend. It was challenging at times but I really enjoyed both. It made me think about the different use cases and the advantages and disadvantages of using PostgreSQL as opposed to NoSQL. Experimenting with using hooks was also an enjoyable challenge. 
This project cemented my abilitiy to prioritise must have feautures and meeting deadlines and the importance of thorough and well-thought out planning. It also reinforced the importance of communication, which leads to great collaboration. 

