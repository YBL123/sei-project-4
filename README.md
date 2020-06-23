<img align="left" width="50" height="50" src="GA.png" alt="GA logo">

# Project 4: FAM
![fam title](readme-fam.png )

## Overview
Welcome to FAM.  This is a curated app. Each month we share ‘Our Favourites For The Month’ for film, art and music. 

Users can filter the posts by month in the index pages,  should they want to look at previous posts.

Signing up gives users the ability to access the favourites feature. This allows them to curate their own favourites list. 

Once signed up they are also able to leave reviews and ratings on our curated posts.

## Team
I loved collaborating in a team on my previous project and so I chose to work in a pair for this project.

* [Eleanor Byass](https://github.com/ebyass)

## Deployment
The website is deployed on Heroku and can be found [here](http://plntify-app.herokuapp.com/)

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
pipenv install django==2.2.9
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

 ERD Model

//  insert image of model

//  talk about relationships and building the backend briefly

//  inset code snippets

// include examples of models

### Wireframe

![fam wireframe](readme-plntify-wireframe.png


// talk about the main components 

I will give an overview of the app’s architecture and delve into more detail on some of the features I built




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
* 
