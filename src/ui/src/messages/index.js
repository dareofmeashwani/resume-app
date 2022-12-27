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
	forgetPassword: "Forgot password?",
	password: "Password",
	emailAddress: "Email Address"
};

export default function getText(key) {
	return messages[key] || key;
}
