const apiURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export default function request(path: string) {
  return fetch(`${apiURL}/api/${path}`).then((res) => res.json());
}
