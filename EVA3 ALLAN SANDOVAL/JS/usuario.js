//Variables globales
var g_id_usuario ="";

function agregarUsuario(){

var dv = document.getElementById("txt_dv").value;
var nombre_usuario = document.getElementById("txt_nombre_usuario").value;
var apellido_usuario = document.getElementById("txt_apellido_usuario").value;
var email_usuario = document.getElementById("txt_email_usuario").value;
var celular_usuario = document.getElementById("txt_celular_usuario").value;
var username_usuario = document.getElementById("txt_username_usuario").value;
var password_usuario = document.getElementById("txt_password_usuario").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

const raw = JSON.stringify({
  "dv": dv,
  "nombre_usuario": nombre_usuario,
  "apellido_usuario": apellido_usuario,
  "email_usuario": email_usuario,
  "celular_usuario": celular_usuario,
  "username": username_usuario,
  "password": password_usuario,
  "fecha_registro": fechaHoraActual
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
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

function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML  +=
  `<tr>
  <td>${element.id_usuario}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>}
  <td>${element.username}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosActualizar(p_id_usuario);

}
function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);

}
function obtenerDatosEliminar(p_id_usuario) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_usuario) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr) {
  var id_usuario = element.id_usuario;
  var nombre_usuario = element.nombres;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este tipo de gestión? <b><div class ='alert alert-danger'>"+ id_usuario + "  "+ nombre_usuario +"</div> </b> <hr>";
}
function completarFormulario(element,index,arr) {
  var nombre_usuario = element.id_usuario;
  document.getElementById('txt_nombre_usuario').value = nombre_usuario;

}
function actualizarUsuario(){
  var nombre_usuario = document.getElementById("txt_nombre_usuario").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "nombre_usuario": nombre_usuario
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
  .then((response) => {
    if(response.status == 200){
      location.href="listar.html";
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

}
function eliminarUsuario(){

  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
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