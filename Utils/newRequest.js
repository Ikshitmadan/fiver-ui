import axios from 'axios'
export const newRequest=axios.create({
    baseURL:"https://mern-stack-hijh.onrender.com",
    withCredentials:true
})