import axios from "axios";
import data from "../../staticdata/cart.json";

// export const fetchCartItems = () => {
//   return axios
//     .get("staticdata/data.json")
//     .then((response) => {
//       return response.data; // Extract data from response
//     })
//     .catch((error) => {
//       console.error("Error fetching items:", error);
//       throw error; // Rethrow the error for the caller to handle
//     });
// };

export const fetchCartItems = () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(data); // Simulate axios response with static JSON data
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
};
