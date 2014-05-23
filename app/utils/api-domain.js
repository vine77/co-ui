export default function() {
  return (window.localStorage.apiDomain) ? '//' + window.localStorage.apiDomain : '//' + window.location.host + window.location.pathname.slice(0, -1);
}
