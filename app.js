const botones = document.querySelectorAll(".btn-agregar");
const lista = document.querySelector("#lista-carrito");
const msgVacio = document.querySelector("#msg-vacio");
const badge = document.querySelector("#badge");
const totalSpan = document.querySelector("#total");

let cantidadItems = 0;
let totalAcumulado = 0;

botones.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const nombre = boton.dataset.nombre;
    const precio = Number(boton.dataset.precio);

    agregarAlCarrito(nombre, precio);
  });
});

function agregarAlCarrito(nombre, precio) {
  msgVacio.style.display = "none";

  const li = document.createElement("li");            //Crear elemento "li" del carrito

  const texto = document.createElement("span");      //Crear el texto del producto
  texto.textContent = `${nombre} - $${precio}`;

  const btnEliminar = document.createElement("button");      //Crear el boton de Eliminar
  btnEliminar.textContent = "X";
  btnEliminar.classList.add("btn-eliminar");

  li.appendChild(texto);            //Agregar al "li"
  li.appendChild(btnEliminar);      //Agregar al "li"
  lista.appendChild(li);            //Agregar "li" al carrito

  const selecBtnEliminar = li.querySelector(".btn-eliminar");          //Seleccionar boton de Eliminar en el "li"

  selecBtnEliminar.addEventListener("click", function () {            //Instruccion para eliminar un producto del carrito
    eliminarItem(li, precio);
  });

  totalAcumulado += precio;
  cantidadItems++;

  updateTotal();
  updateBadge();
}

function eliminarItem(li, precio) {
  li.remove();

  totalAcumulado -= precio;
  cantidadItems--;

  updateTotal();
  updateBadge();

  if (cantidadItems === 0) {
    msgVacio.style.display = "block";
  }
}

function updateBadge() {
  badge.textContent = cantidadItems;
}

function updateTotal() {
  totalSpan.textContent = "$" + totalAcumulado.toLocaleString("es-CO", {minimumFractionDigits: 2});
}

const btnVaciar = document.querySelector("#btn-vaciar");

btnVaciar.addEventListener("click", function () {                                     //Instruccion para Vaciar el carrito
  lista.querySelectorAll("li:not(#msg-vacio)").forEach((li) => li.remove());          //Eliminar todos los productos del carrito, excepto el msj
  
  cantidadItems = 0;
  totalAcumulado = 0;

  updateTotal();
  updateBadge();

  msgVacio.style.display = "block";
});
