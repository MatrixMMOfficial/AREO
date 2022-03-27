const delHeaders = ['cache-control', 'content-security-policy', 'content-encoding', 'content-length', 'cross-origin-opener-policy', 'cross-origin-opener-policy-report-only', 'report-to', 'strict-transport-security', 'x-content-type-options', 'x-frame-options'];

function filterHeaders(headers) {
	for (let header of delHeaders)
		delete headers[header];

	return headers;
}

export { filterHeaders };
