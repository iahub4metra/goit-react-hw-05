import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/genre/movie';

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzlmYmFmZWEwZjE4NTVlOTg3MjUxNWZjMmZkZDA3YiIsIm5iZiI6MTcyMTMzNTI3MC42MTg1Miwic3ViIjoiNjY5OTY1ZjZlMDBmMTM4N2FlMThjMGFlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dS0HNLRUdZLKfvJK0yD5Lqb3jrTO4QrVUWP27js8U88'
  }
};

const getGenres = async () => {
    const response = await axios.get('/list?language=en', options);
    return response.data
}

export default getGenres