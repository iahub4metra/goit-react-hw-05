import axios from "axios";

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzlmYmFmZWEwZjE4NTVlOTg3MjUxNWZjMmZkZDA3YiIsIm5iZiI6MTcyMTMzNTI3MC42MTg1Miwic3ViIjoiNjY5OTY1ZjZlMDBmMTM4N2FlMThjMGFlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dS0HNLRUdZLKfvJK0yD5Lqb3jrTO4QrVUWP27js8U88'
  }
};

const getCast = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options);
    return response.data
}

export default getCast