import messages from "../constants/message";

const SignInSignUpValidations = (field, value, passwordValue) => {
  let message = "";
  switch (field) {
    case "name":
      if (!value.trim()) message = messages.name_required;
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) message = messages.valid_email;
      break;
    case "password":
      if (value.length < 6) message = messages.password_min_chars;
      break;
    case "confirmPassword":
      if (value.length < 6) {
        message = messages.password_min_chars;
      } else if (value !== passwordValue) {
        message = messages.password_not_match;
      }
      break;
    case "mobile":
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(value)) message = messages.valid_mobile_no;
      break;
    default:
      break;
  }
  return message;
};

export default SignInSignUpValidations;
