export function getDomainName() {
	const url = document.createElement("a");
	url.setAttribute("href", document.location.href);
	let hostname = url.hostname;
	if (hostname.startsWith("www")) {
		hostname = hostname.replace("www.", "");
	}
	return hostname;
}

export function errorHelper(formik, values) {
	return {
		error: formik.errors[values] && formik.touched[values] ? true : false,
		helperText:
			formik.errors[values] && formik.touched[values]
				? formik.errors[values]
				: null
	};
}

export function capitalizeString(text) {
    return text && typeof (text) === "string" ? text[0].toUpperCase() + text.slice(1) : text;
}

export function downloadContent(url){
	const link = document.createElement("a");
	link.download = url.substr(url.lastIndexOf("/")+1);
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}