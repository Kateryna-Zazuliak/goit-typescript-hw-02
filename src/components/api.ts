import axios from "axios";

export type ImageType = {
  id: string;
  urls: { full: string; small: string };
  alt_description: string;
  user: { name: string };
  description: string;
  likes: number;
};

export type Data = {
  results: ImageType[];
  total: number;
  total_pages: number;
};

export const fetchVisionGallery = async (
  query: string,
  pageNumber = 1
): Promise<Data> => {
  const API_KEY = "9kvSPr3cipTM7TgBi9S2uaYrAR_dw3vICaSyR4jAWh8";
  const BASE_URL = "https://api.unsplash.com/search/photos/";

  const params = new URLSearchParams({
    client_id: API_KEY,
    query: query,
    page: pageNumber.toString(),
    orientation: "landscape",
    per_page: "12",
  });
  const response = await axios.get<Data>(`${BASE_URL}?${params.toString()}`);
  return response.data;
};
