import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

const withHeaders = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } }
}

//! MEDIUMS

export const getAllMediums = () => {
  return axios.get(`${baseUrl}/mediums/`)
}

export const getSingleMedium = async id => {
  const result = await axios.get(`${baseUrl}/mediums/${id}/`)
  return result
}



//! POSTS

export const getAllPosts = async () => {
  const result = await axios.get(`${baseUrl}/posts/`)
  return result
  
}

export const getSinglePost = async id => {
  const result = axios.get(`${baseUrl}/posts/${id}/`)
  return result
}

//! REVIEWS

export const createReview = async ( reviewData, mediumId) => {
  const result = await axios.post(`${baseUrl}/reviews/${mediumId}/`, reviewData, withHeaders())
  return result
}

export const deleteReview = async ( medium, reviewId ) => {
  const result = await axios.delete(`${baseUrl}/reviews/${reviewId}/`, withHeaders())
  return result
}


//! Register

export const registerUser = async data => {
  const result = axios.post(`${baseUrl}/register/`, data)
  return result
}

//! Login

export const loginUser = async data => {
  const result = axios.post(`${baseUrl}/login`, data)
  return result
}

//! USER

export const getSingleUser = async () => {
  const result = await axios.get(`${baseUrl}/profile`, withHeaders())
  return result
}

//! ADD A FAVOURITE 


export const addFavourite = async (mediumId) => {
  const res = await axios.post(`${baseUrl}/favourites/`, { medium: mediumId }, withHeaders())
  return res
}

//! DELETE FAVOURITE

export const deleteFavourite = async (favouriteId) => {
  const res = await axios.delete(`${baseUrl}/favourites/${favouriteId}/`, withHeaders())
  return res 

}