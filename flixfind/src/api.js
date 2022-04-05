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

const getWatchList = async () => {
  const promise = axios.get(apiUri + '/listmovie', {
      params: {listId: 1}
  });
  return await promise.then(response => response.data).then(
    response => { 
      console.log(response);
      return response; 
    });
}

const addToWatchList = async (params) => {
  const promise = axios.post(apiUri + '/listmovie', {
    listId: 1, movieId: params
});
return await promise.then(response => response.data).then(
  response => { 
    return response; 
  });
}
const removeFromWatchList = async (params) => {
  const promise = axios.delete(apiUri + '/listmovie', {data: {
    listId: 1, movieId: params
}});
return await promise.then(response => response.data).then(
  response => { 
    return response; 
  });
}

const getRatings = async (params) => {

  console.log("Fetch ratings")
  const promise = axios.get(apiUri + '/ratings', {
      params: params
  });
  return await promise.then(response => response.data).then(
    response => { 
      console.log(response);
      return response; 
    });
}

const addRating = async (params) => {
  const promise = axios.post(apiUri + '/ratings', {
    userId: params.userId, movieId: params.movieId, dateTime: null, ratingScore: params.ratingScore
  });
  return await promise.then(response => response.data).then(
    response => { 
      return response; 
    });
}

// const updateRating = async () => {
//   const promise = axios.put(apiUri + '/ratings', {
//     userId: params.userId, movieId: params.movieId, updatedRating: params.updatedRating
//   });
//   return await promise.then(response => response.data).then(
//     response => { 
//       return response; 
//     });
// }

const removeRating = async (params) => {
  const promise = axios.delete(apiUri + '/ratings', {data: {
    userId: params.userId, movieId: params.movieId
}});
return await promise.then(response => response.data).then(
  response => { 
    return response; 
  });
}


// const getCourseListMeta = () => {
//     const promise = axios.get(`${apiUri}/2021-sp/summary`);
//     return promise.then(response => response.data);
// }

const FlixService = { getAllMovies, getPlatforms, getWatchList, addToWatchList, removeFromWatchList, getRatings, addRating, removeRating };

export default FlixService;