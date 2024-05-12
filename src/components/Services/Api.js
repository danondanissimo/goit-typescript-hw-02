import axios from "axios";

export const requestImagesByQuery = async (query = " ", page) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=15bILPgVSwAopp0mw0bPEJJdp4YTgyFAjjldIAYzJmA`
  );
  return response;
};
