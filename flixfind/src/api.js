// import axios from 'axios'

// const instance = axios.create({
//   baseURL: 'http://35.224.49.56/',
// });


// export const getMovies = ():  =>
//   instance.get('/movies').then(
//     (res) => res.data,
//     (err) => {
//       console.error(err);
//       return null;
//     },
//   );

import axios from 'axios';

const apiUri = 'http://localhost:80';

const getAllMovies = async (params) => {
    const promise = axios.get(apiUri + '/movies', {
        params: params
    });
    return await promise.then(response => response.data).then(
      response => { 
        return response; 
      });
}

const getPlatforms = async (params) => {
  const promise = axios.get(apiUri + '/platforms', {
      params: {movieId: params}
  });
  return await promise.then(response => response.data).then(
    response => { 
      return response; 
    });
}

// const getCourseListMeta = () => {
//     const promise = axios.get(`${apiUri}/2021-sp/summary`);
//     return promise.then(response => response.data);
// }

const FlixService = { getAllMovies, getPlatforms };

export default FlixService;