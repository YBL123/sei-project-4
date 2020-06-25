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

//  talk about relationships and building the backend briefly

//  inset code snippets

// reviews + rating as an example + how teh user was populated to make sure the username could be accessed for reviews

// insert screenshot of all insomnia requests
![insomnia](insomnia.png )

### Wireframe

![fam wireframe](readme-wireframe.png )

As well as the ERD model, we created a wireframe to plan out the architecture of the app. We both feel as though this is a super useful step in the planning stage. It helps to visualize the upcoming project and although we gave ourselves room for change, it was a great point of reference.
We added a list of "must have" and "nice to have". We then assigned a deadline for ourselves for when the list of "must have" had to be completed and when we wanted to be MVP ready. If we had extra time left we would look at the "nice to have" list.

I will give an overview of the app’s architecture and delve into more detail on some of the features I built.

### Home 

- latest posts (built together)

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

To begin, what we are doing here is renaming data: with post. Now we don't need to use this.state. Everything is on post.

Knowing that post is an array, inside of the useEffect we are making the result ternary, using the variable to specify. The variable 'max' is only created with post length if post exists. (- 1 because length is not the same as the index number).

```javascript
setRecentPost(recentPost) 
```
sets post with the index that has the greatest value to the state. Now it can also be reused using recentPost.

We pass the post variable as an argument inside the dependency array. Now every time post changes, it will trigger this function to run.
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

### Show 

- actually ended up only using one "medium" 

![fam show](fam-show.png )
//component for all 3 unlike the wireframe.

// talk about reviews and ratings here
// add screenshots and code snippets

### Register
![fam register](fam-register.png )
--> screenshot

### Login
![fam login](fam-login.png )
--> screenshot

### Favourites
![fam favourites](fam-favourites.png )
--> brief description
---> screenshot

### Reviews --->  
only a user that is logged in can post reviews. tHEY MUST ADD A RATING TO POST THE REVIEW. A red message will appear informing the user of so if they try to post a review without a rating. 
Anyone can view the reviews even if not logged in. But they can not make a post. 
Wrapped in authentication ternary in render.
### Ratings --> plug-in




## Challenges
* The biggest challenges were as follows:
* Planning and building the relationships in the backend using Python and Django. 
* Working with serializers and populated serializers 
* Working in a new language we had just learnt - Python
* Working with Hooks
* Writing the logic for reviews and ratings.
* Working with a lot of nested data on our models
 
## Wins
* The greatest win for this project was how well we worked together as a team.

* Working with Hooks
* Working with python
* Making the app responsive in it’s design


## Future Improvements
* More filter options and being able to filter in favourites/profile page too. Being able to filter by year, month.
* Calendar feature for the art exhibitions - so that a user can add exhibitions to their personal calendar that they can check on and get alerts.
* Have actual media, i.e film and songs for those two components. Netflix, Spotify merge.

