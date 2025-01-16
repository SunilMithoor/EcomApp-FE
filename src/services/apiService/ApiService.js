import axiosInstance from "../../libraries/axois/index";
import log from "loglevel";

export const getData = () => {
  return axiosInstance
    .get("/users")
    .then((response) => {
      return response; // Extract data from response
    })
    .catch((error) => {
      log.error("Error fetching users:", error);
      throw error; // Rethrow the error for the caller to handle
    });
};
