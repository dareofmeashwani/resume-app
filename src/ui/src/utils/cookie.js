export const removeCookieToken = (key) => {
	document.cookie = key + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
export const clearAllCookie = () => {
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i];
		const eqPos = cookie.indexOf("=");
		const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
};
export const getAllCookie = () => {
	var pairs = document.cookie.split(";");
	var cookies = {};
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split("=");
		cookies[(pair[0] + "").trim()] = unescape(pair.slice(1).join("="));
	}
	return cookies;
};
export const getCookie = (key) => {
	return getAllCookie()[key];
};
export const getCookieToken = () => {
	return getAllCookie()["session_id"];
};
export const checkCookie = (key) => {
	return !!getAllCookie()[key];
};
