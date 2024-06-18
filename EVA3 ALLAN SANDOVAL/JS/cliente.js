//Variables globales
var g_id_cliente ="";

function agregarCliente(){

var id_cliente = document.getElementById("txt_id_cliente").value;
var dv_cliente = document.getElementById("txt_dv_cliente").value;
var nombre_cliente = document.getElementById("txt_nombre_cliente").value;
var apellido_cliente = document.getElementById("txt_apellido_cliente").value;
var email_cliente = document.getElementById("txt_email_cliente").value;
var celular_cliente = document.getElementById("int_celular_gestion").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

const raw = JSON.stringify({
  "id_cliente": id_cliente,
  "dv_cliente": dv_cliente,
  "nombre_cliente": nombre_cliente,
  "apellido_cliente": apellido_cliente,
  "email_cliente": email_cliente,
  "celular_cliente": celular_cliente,
  "fecha_registro": fechaHoraActual
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
.then((response) => {
  if(response.status === 200){
    let alert = document.getElementById("alert-success");
    alert.classList.add("show");
    setTimeout(() => {
      location.href = "resultados.html";
    }, 2000); 
  }
  return response.json(); 
})
.then((result) => console.log(result))
.catch((error) => console.error(error));
}

function listarCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  const dataTableOptions = {
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    pageLength: 5,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún tipo de gestión encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún tipo de gestión encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};


  
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_cliente').DataTable(dataTableOptions);
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML  +=
  `<tr>
  <td>${element.id_cliente}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosActualizar(p_id_cliente);

}
function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosEliminar(p_id_cliente);

}
function obtenerDatosEliminar(p_id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr) {
  var nombre_cliente = element.nombres;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este tipo de gestión? <b><div class ='alert alert-danger'>"+ nombre_cliente +"</div> </b> <hr>";
}
function completarFormulario(element,index,arr) {
  var nombre_cliente = element.nombres;
  document.getElementById('txt_nombre_tipo_gestion').value = nombre_cliente;

}
function actualizarCliente(){
  var nombre_tipo_gestion = document.getElementById("txt_nombre_cliente").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "nombre_cliente": nombre_cliente
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
.then((response) => {
  if(response.status === 200){
    let alert = document.getElementById("alert-success");
    alert.classList.add("show");
    setTimeout(() => {
      location.href = "resultados.html";
    }, 2000); 
  }if(response.status === 400){
    let alert = document.getElementById("alert-danger");
    alert.classList.add("show");
    setTimeout(() => {
      location.href = "resultados.html";
    }, 2000); 
  }
  return response.json(); 
})
.then((result) => console.log(result))
.catch((error) => console.error(error));
}

function eliminarCliente(){

  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
.then((response) => {
  if(response.status === 200){
    let alert = document.getElementById("alert-success");
    alert.classList.add("show");
    setTimeout(() => {
      location.href = "resultados.html";
    }, 2000); 
  }if(response.status === 400){
    let alert = document.getElementById("alert-danger");
    alert.classList.add("show");
    setTimeout(() => {
      location.href = "resultados.html";
    }, 3000); 
  }
  return response.json(); 
})
.then((result) => console.log(result))
.catch((error) => console.error(error));
}

function obtenerFechaHora(){
    var fechaActual = new Date();
    var fechaFormateada = fechaActual.toLocaleString('es-ES',{
      hour12:false,
      year:'numeric',
      month:'2-digit',
      day:'2-digit',
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit'
    }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
  return fechaFormateada;
}