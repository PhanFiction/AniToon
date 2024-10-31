const fetchCSRFToken = () => document.querySelector("meta[name='csrf-token']").getAttribute("content"); // Fetch CSRF token

export default fetchCSRFToken;