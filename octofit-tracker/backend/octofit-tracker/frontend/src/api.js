const configuredCodespaceName = process.env.REACT_APP_CODESPACE_NAME;
const browserCodespaceName =
  typeof window === 'undefined'
    ? null
    : window.location.hostname.match(/^(.*)-\d+\.app\.github\.dev$/)?.[1];
const codespaceName = configuredCodespaceName || browserCodespaceName;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function getApiUrl(resource) {
  return `${API_BASE_URL}/${resource}/`;
}

export function getApiCollection(data) {
  if (Array.isArray(data)) {
    return data;
  }

  return Array.isArray(data?.results) ? data.results : [];
}