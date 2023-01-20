const messages = {
	title: "Ashwani Kumar Verma",
	profile: "Profile",
	dashboard: "Dashboard",
	logout: "Logout",
	home: "Home",
	aboutMe: "About Me",
	meeting: "Meeting",
	gallery: "Gallery",
	downloads: "Downloads",
	contact: "Contact",
	signIn: "Sign In",
	signUp: "Sign Up",
	name: "Name",
	dontHaveAccount: "Don't have an account? Sign Up",
	haveAccountSignIn: "Already have an account? Sign in",
	forgetYourPassword: "Forgot password?",
	forgetPassword: "Forgot Password",
	sendResetLink: "Send Reset Link",
	password: "Password",
	emailAddress: "Email Address",
	gender: "Gender",
	passwordResetconfirmation:
		"An email with a confirmation link has been sent your email address.",
	inputEmailRequired: "Sorry the email is required",
	invalidEmailInputWarning: "This is not a valid email",
	inputPasswordRequired: "Sorry the password is required",
	inputPasswordMinLenWarning: "minimum 8 length of password needed",
	inputMobileNumberRequired: "Sorry the mobile number is required",
	inputInvalidMobileNumber: "Invalid Mobile Number",
	inputFirstNameRequired: "Sorry the firstname is required",
	inputBirthdayRequired: "Sorry the birthday is required",
	firstname: "First Name",
	lastname: "Last Name",
	mobile: "Mobile",
	birthday: "Birthday",
	subject: "Subject",
	details: "Details",
	writeToMe: "Write To Me",
	loginFailed:
		"Unable to login, please check detail for more information"
};

export default function getText(key) {
	return messages[key] || key;
}
