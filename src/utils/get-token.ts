export default function getToken(): string {
  return window.localStorage.getItem('token') || '';
}
