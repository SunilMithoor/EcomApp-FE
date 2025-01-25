import axios from "axios";
import cartData from "../../staticdata/cart.json";
import notificationsData from "../../staticdata/notifications.json";
import searchData from "../../staticdata/search.json";
import wishlistData from "../../staticdata/wishlist.json";
import homeData from "../../staticdata/home.json";
import menuDropdownData from "../../staticdata/menu_dropdown.json";
import menuData from "../../staticdata/menu.json";

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

function fetchCartItems() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(cartData); // Simulate axios response with static JSON data
      }, 5000);
    } catch (error) {
      reject(error);
    }
  });
}

const emailSignInSuccessResponse = {
  success: true,
  message: "Logged in successfully!",
};
const emailSignInFailureResponse = {
  success: false,
  message: "Log in unsuccessful!",
};

function emailSignIn() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(emailSignInSuccessResponse); // Simulate axios response with static JSON data
      }, 3000);
    } catch (error) {
      reject(error);
    }
  });
}

const mobileOtpGenerateSuccessResponse = {
  success: true,
  message: "OTP has been sent to your mobile number.",
};
const mobileOtpGenerateFailureResponse = {
  success: false,
  message: "OTP generation  is unsuccessful!",
};
const mobileOtpGenerate = () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(mobileOtpGenerateSuccessResponse); // Simulate axios response with static JSON data
      }, 3000);
    } catch (error) {
      reject(error);
    }
  });
};

const mobileSignInSuccessResponse = {
  success: true,
  message: "Logged in successfully!",
};
const mobileSignInFailureResponse = {
  success: false,
  message: "Log in unsuccessful!",
};

function mobileSignIn() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(mobileSignInFailureResponse); // Simulate axios response with static JSON data
      }, 3000);
    } catch (error) {
      reject(error);
    }
  });
}

const signUpSuccessResponse = {
  success: true,
  message: "Signed up successfully!",
};
const signUpFailureResponse = {
  success: false,
  message: "Sign up unsuccessful!",
};
function signUp() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(signUpFailureResponse); // Simulate axios response with static JSON data
      }, 3000);
    } catch (error) {
      reject(error);
    }
  });
}

const subscriberSuccessResponse = {
  success: true,
  message: "Thank you! Your subscription was successful!!",
};
const subscriberFailureResponse = {
  success: false,
  message: "We’re sorry! Your subscription could not be completed.",
};
function addSubscriber() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(subscriberFailureResponse); // Simulate axios response with static JSON data
      }, 3000);
    } catch (error) {
      reject(error);
    }
  });
}

const homeSuccessResponse = {
  success: true,
  message: "Success",
};
const homeFailureResponse = {
  success: false,
  message: "Failure",
};

function fetchHome() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(homeData); // Simulate axios response with static JSON data
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
}

function fetchNotifications() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(notificationsData); // Simulate axios response with static JSON data
      }, 5000);
    } catch (error) {
      reject(error);
    }
  });
}

function fetchSearch() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(searchData); // Simulate axios response with static JSON data
      }, 5000);
    } catch (error) {
      reject(error);
    }
  });
}

function fetchWishlists() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(wishlistData); // Simulate axios response with static JSON data
      }, 5000);
    } catch (error) {
      reject(error);
    }
  });
}

function fetchMenuDropDowns() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(menuDropdownData); // Simulate axios response with static JSON data
      }, 5000);
    } catch (error) {
      reject(error);
    }
  });
}

export {
  addSubscriber,
  fetchCartItems,
  fetchNotifications,
  emailSignIn,
  mobileSignIn,
  signUp,
  mobileOtpGenerate,
  fetchHome,
  fetchSearch,
  fetchWishlists,
  fetchMenuDropDowns,
};
