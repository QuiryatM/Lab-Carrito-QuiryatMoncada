const botones = document.querySelectorAll('.btn-agregar');
const lista = document.querySelector('#lista-carrito');
const msgVacio = document.querySelector('#msg-vacio');

let totalAcumulado = 0;
let cantidadItems = 0;
botones.forEach(function (boton) {
  boton.addEventListener('click', function () {
    const nombre = this.dataset.nombre;
    const precio = Number(this.dataset.precio);
    agregarAlCarrito(nombre, precio);
  });
});

function agregarAlCarrito(nombre, precio) {
  msgVacio.style.display = 'none';
  const li = document.createElement('li');
  
  const texto = document.createElement('span');
  texto.textContent = `${nombre} - $${precio}`
  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'X';
  li.appendChild(texto);
  li.appendChild(btnEliminar);
  
  lista.appendChild(li);
  totalAcumulado += precio;
  cantidadItems ++;
  btnEliminar.addEventListener('click', function() {
    eliminarItem(li, precio)
  })
}
function eliminarItem(li) {
    li.remove();
}