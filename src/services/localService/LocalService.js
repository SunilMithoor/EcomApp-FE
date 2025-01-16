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

function fetchCartItems() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(data); // Simulate axios response with static JSON data
      }, 1000);
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
  message: "Subscribed successfully!",
};
const subscriberFailureResponse = {
  success: false,
  message: "Subscription was  unsuccessful!",
};
function addSubscriber() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(subscriberSuccessResponse); // Simulate axios response with static JSON data
      }, 3000);
    } catch (error) {
      reject(error);
    }
  });
}

export {
  addSubscriber,
  fetchCartItems,
  emailSignIn,
  mobileSignIn,
  signUp,
  mobileOtpGenerate,
};
