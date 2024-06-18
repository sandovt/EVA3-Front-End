//Variables globales
var g_id_resultado ="";

function agregarResultado(){

var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

const raw = JSON.stringify({
  "nombre_resultado": nombre_resultado,
  "fecha_registro": fechaHoraActual
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
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

function listarResultado(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  const dataTableOptions = {
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    pageLength: 5,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún resultado encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún resultado encontrado",
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


  
  fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_resultado').DataTable(dataTableOptions);
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_resultado tbody").innerHTML  +=
  `<tr>
  <td>${element.id_resultado}</td>
  <td>${element.nombre_resultado}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosActualizar(p_id_resultado);

}
function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosEliminar(p_id_resultado);

}
function obtenerDatosEliminar(p_id_resultado) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_resultado) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr) {
  var nombre_resultado = element.nombre_resultado;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este tipo de gestión? <b><div class ='alert alert-danger'>"+ nombre_resultado +"</div> </b> <hr>";
}
function completarFormulario(element,index,arr) {
  var nombre_resultado = element.nombre_resultado;
  document.getElementById('txt_nombre_resultado').value = nombre_resultado;

}
function actualizarResultado(){
  var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "nombre_resultado": nombre_resultado
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/resultado/"+ g_id_resultado, requestOptions)
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

function eliminarResultado(){

  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/resultado/"+ g_id_resultado, requestOptions)
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