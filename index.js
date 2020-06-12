const gridContainer = document.querySelector("#grid")
const btnSwitch = document.querySelector('#switch')
const templateItem  = item => (`
  <div
  class="item"
  data-categoria="${item.categoria}"
  data-etiquetas="${item.etiquetas}"
  data-descripcion="${item.descripcion}"
  >
    <div class="item-contenido">
      <img src="${item.path}" alt="${item.descripcion}" loading="lazy"/>
    </div>
  </div>
`)

imagesList().map(item => {
  gridContainer.innerHTML += templateItem(item)
  console.log(templateItem(item))
})

btnSwitch.addEventListener('click', () => {
  document.body.classList.toggle('oscuro')
  btnSwitch.classList.toggle('activo')

  if(document.body.classList.contains('oscuro')) {
    localStorage.setItem('modo-oscuro', 'true')
  } else {
    localStorage.setItem('oscuro', 'false')
  }
})

if(localStorage.getItem('oscuro') === 'true') {
  document.body.classList.add('oscuro')
  btnSwitch.classList.add('activo')
} else {
  document.body.classList.remove('oscuro')
  btnSwitch.classList.remove('activo')
}

const grid = new Muuri(".grid", {
  layout: {
    rounding: false,
  },
});

const enlaces = document.querySelectorAll("#categorias a");
  enlaces.forEach((elemento) => {
    elemento.addEventListener("click", (evento) => {
      evento.preventDefault();
      enlaces.forEach((enlace) => enlace.classList.remove("activo"));
      evento.target.classList.add("activo");

      const categoria = evento.target.innerHTML.toLowerCase();
      categoria === "todos"
        ? grid.filter("[data-categoria]")
        : grid.filter(`[data-categoria="${categoria}"]`);
    });
  });

  document
    .querySelector("#barra-busqueda")
    .addEventListener("input", (evento) => {
      const busqueda = evento.target.value;
      grid.filter((item) =>
        item.getElement().dataset.etiquetas.includes(busqueda)
      );
    });

  const overlay = document.querySelector("#overlay");

  document.querySelectorAll(".grid .item img").forEach((elemento) => {
    elemento.addEventListener("click", () => {
      const ruta = elemento.getAttribute("src");
      const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
      overlay.classList.add("activo");
      document.querySelector("#overlay img").src = ruta;
      document.querySelector("#overlay .descripcion").innerHTML = descripcion;
    });
  });

  document
    .querySelector("#btn-cerrar-popup")
    .addEventListener("click", (event) => {
      event.preventDefault();
      overlay.classList.remove("activo");
    });

  overlay.addEventListener("click", (event) => {
    event.target.id === "overlay" && overlay.classList.remove("activo");
  });

window.addEventListener("load", () => {
  grid.refreshItems().layout();
  gridContainer.classList.add("imagenes-cargadas");
});
