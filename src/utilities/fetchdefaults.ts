import axios from "axios";

export const fetchDefault = async (query: string) => {
  const response = await axios.get(
    `https://pcfy.redberryinternship.ge/api/${query}`
  );

  return response.data;
};
