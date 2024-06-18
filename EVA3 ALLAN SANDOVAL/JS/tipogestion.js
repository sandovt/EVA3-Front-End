//Variables globales
var g_id_tipo_gestion ="";

function agregarTipoGestion(){

var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

const raw = JSON.stringify({
  "nombre_tipo_gestion": nombre_tipo_gestion,
  "fecha_registro": fechaHoraActual
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/tipo_gestion", requestOptions)
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

function listarTipoGestion(){
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


  
  fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_tipo_gestion').DataTable(dataTableOptions);
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_tipo_gestion tbody").innerHTML  +=
  `<tr>
  <td>${element.id_tipo_gestion}</td>
  <td>${element.nombre_tipo_gestion}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_tipo_gestion}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_tipo_gestion}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosActualizar(p_id_tipo_gestion);

}
function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosEliminar(p_id_tipo_gestion);

}
function obtenerDatosEliminar(p_id_tipo_gestion) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_tipo_gestion) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr) {
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este tipo de gestión? <b><div class ='alert alert-danger'>"+ nombre_tipo_gestion +"</div> </b> <hr>";
}
function completarFormulario(element,index,arr) {
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('txt_nombre_tipo_gestion').value = nombre_tipo_gestion;

}
function actualizarTipoGestion(){
  var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "nombre_tipo_gestion": nombre_tipo_gestion
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/tipo_gestion/"+ g_id_tipo_gestion, requestOptions)
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

function eliminarTipoGestion(){

  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/tipo_gestion/"+ g_id_tipo_gestion, requestOptions)
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