module.exports = {
  email: "Email",
  mobile: "Mobile",
  mobile_no: "Mobile Number",
  password: "Password",
  login: "Login",
  signin: "Sign In",
  signup: "Sign Up",
  email_msg: "Enter your Email Id",
  mobile_no_msg: "Enter your Mobile number",
  password_msg: "Enter Password",
  coupon_code_msg: "Enter coupon code",
  or: "OR",
  no_data_available: "No data available",
  coupon_already_applied: (code) => `Coupon "${code}" is already applied.`,
  coupon_applied_successfully: (code) =>
    `Coupon "${code}" applied successfully.`,
  coupon_removed: (code) => `Coupon "${code}" removed.`,
  shopping_cart: "Shopping Cart",
  items_count: (data) => `${data} items in cart`,
  no_desc_available: "No description available",
  view_more: "View more",
  view_less: "View less",
  ratings: "Ratings",
  total: "Total",
  discount_off: (data) => `${data} off`,
  checkout: "Checkout",
  promotions: "Promotions",
  name_required: "Name is required.",
  valid_email: "Enter a valid email.",
  password_min_chars: "Password must be at least 6 characters.",
  password_not_match: "Passwords do not match.",
  valid_mobile_no: "Enter a valid 10-digit number.",
  sign_in_continue: "Sign-in to continue",
  fill_in_details: "Fill the details to register",
  enter_otp: "Enter OTP",
  send_otp: "Send OTP",
  verify_login: "Verify & Login",
  didnt_recieve_otp: "Didn't receive otp? ",
  resend_otp: "Resend OTP",
  dont_have_account: "Don't have an account? ",
  already_have_account: "Already have an account? ",
  register: "Register",
  name: "Name",
  enter_name: "Enter your Name",
  confirm_password: "Confirm Password",
  enter_confirm_password: "Enter Confirm Password",
};