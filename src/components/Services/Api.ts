import axios, { AxiosResponse } from "axios";

export interface Result {
  total: number,
  total_pages: number,
  results: ArrayOfImageObjects | [],
}

export interface ImagesObject {
  id: string,
  alt_description?: string,
  urls: {[key: string]: string},
  likes: number,

}

export type ArrayOfImageObjects = ImagesObject[];

export const requestImagesByQuery = async (query: string = " ", page: number): Promise<AxiosResponse<Result>> => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=15bILPgVSwAopp0mw0bPEJJdp4YTgyFAjjldIAYzJmA`
  );



  return response;
};
