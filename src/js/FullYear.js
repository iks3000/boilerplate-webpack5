
export default function FullYear() {
  const fullYear = document.querySelector("#fullYear");

  fullYear.innerHTML = new Date().getFullYear();
  fullYear.setAttribute('datetime', new Date().getFullYear());
}
