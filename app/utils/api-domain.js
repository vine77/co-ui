export default function() {
  return (localStorage.apiDomain) ? '//' + localStorage.apiDomain : '//' + window.location.host + window.location.pathname.slice(0, -1);
}
