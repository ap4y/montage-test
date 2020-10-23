const apiURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export default function request(
  path: string,
  method: string = 'GET',
  payload: object | null = null
) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const opts = payload
    ? { headers, method, body: JSON.stringify(payload) }
    : { headers, method };
  return fetch(`${apiURL}/api/${path}`, opts).then((res) => res.json());
}
