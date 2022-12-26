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
	contact: "Contact"
};

export default function getText(key) {
	return messages[key] || key;
}
