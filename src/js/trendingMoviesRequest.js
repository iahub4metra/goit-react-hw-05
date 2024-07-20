import axios from "axios";

axios.defaults.baseURL ='https://api.themoviedb.org/3/trending/movie'

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzlmYmFmZWEwZjE4NTVlOTg3MjUxNWZjMmZkZDA3YiIsIm5iZiI6MTcyMTMzNTI3MC42MTg1Miwic3ViIjoiNjY5OTY1ZjZlMDBmMTM4N2FlMThjMGFlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dS0HNLRUdZLKfvJK0yD5Lqb3jrTO4QrVUWP27js8U88'
  }
};

const trendingRequest = async () => {
    const response = await axios.get('/week?language=en-US&per_page=10', options);
    return response.data
}

export default trendingRequest