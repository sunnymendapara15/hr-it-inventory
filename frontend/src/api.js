const API_BASE = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:5244';

const defaultHeaders = {
  Accept: 'application/json'
};

async function request(path, options = {}) {
  const headers = { ...defaultHeaders, ...(options.headers || {}) };

  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const text = await response.text();
  let payload = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    const message =
      payload?.title || payload?.message || payload?.error || response.statusText || 'Request failed';
    throw new Error(message);
  }

  return payload;
}

export function fetchInventory() {
  return request('/api/inventory');
}

export function createInventoryItem(payload) {
  return request('/api/inventory', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
