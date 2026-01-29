async function loadComponent(id, file) {
  const res = await fetch(file);
  document.getElementById(id).innerHTML = await res.text();
}

loadComponent("header", "/components/header.html");
loadComponent("footer", "/components/footer.html");
loadComponent("navbarmobile", "/components/navbarmobile.html");


document.addEventListener('click', e => {
  if (e.target.id === 'btn-menu-mobile') {
    document.querySelector('.menu-mobile')?.classList.toggle('active');
  }
});

document.addEventListener('click', e => {
  if (e.target.id === 'btn-cerrar-menu') {
    document.querySelector('.menu-mobile')?.classList.remove('active');
  }
});