const grid = new Muuri(".grid", {
  layout: {
    rounding: false,
  },
});

window.addEventListener("load", () => {
  grid.refreshItems().layout();
  document.querySelector("#grid").classList.add("imagenes-cargadas");

  const enlaces = document.querySelectorAll("#categorias a");
  enlaces.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      enlaces.forEach((enlace) => enlace.classList.remove("activo"));
      event.target.classList.add("activo");

      const categoria = event.target.innerHTML.toLowerCase();
      categoria === "todos"
        ? grid.filter("[data-categoria]")
        : grid.filter(`[data-categoria="${categoria}"]`);
    });
  });
});
