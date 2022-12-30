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
	dontHaveAccount: "Don't have an account? Sign Up",
	haveAccountSignIn: "Already have an account? Sign in",
	forgetYourPassword: "Forgot password?",
	forgetPassword: "Forgot Password",
	sendResetLink: "Send Reset Link",
	password: "Password",
	emailAddress: "Email Address",
	gender: "Gender",
	passwordResetconfirmation: " An email with a confirmation link has been sent your email address."
};

export default function getText(key) {
	return messages[key] || key;
}
