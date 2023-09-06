import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const fetchPosts = () => axios.get(API);
export const createPost = (newPost) => axios.post(API, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${API}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${API}/${id}`)
export const likePost = (id) => axios.patch(`${API}/${id}/likePost`)


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);