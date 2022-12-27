export function getDomainName() {
	const url = document.createElement("a");
	url.setAttribute("href", document.location.href);
	let hostname = url.hostname;
	if (hostname.startsWith("www")) {
		hostname = hostname.replace("www.", "");
	}
	return hostname;
}
