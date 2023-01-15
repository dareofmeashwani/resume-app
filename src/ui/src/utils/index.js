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
