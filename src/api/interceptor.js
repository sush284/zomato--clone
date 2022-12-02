import axios from 'axios';
// For GET requests
axios.interceptors.request.use(
   (req) => {
      // Add configurations here
      return req;
   },
   (err) => {
      return Promise.reject(err);
   }
);

// For POST requests
axios.interceptors.response.use(
   (res) => {
      // Add configurations here
      if (res.status === 201) {
         console.log('Posted Successfully');
      }
      return res;
   },
   (err) => {
      return Promise.reject(err);
   }
);

// const instance1 = axios.create({
//     baseURL: 'https://localhost:9192',
//     timeout: 1000,
//     headers: {'token': localStorage.getItem('token')}
//   });

  
// const instance2 = axios.create({
//     baseURL: 'https://localhost:9192',
//     timeout: 1000,
//     headers: {'token': localStorage.getItem('token')}
//   });