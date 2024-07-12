function valorRadioSexo() {
  // Obtener todos los radio buttons con nombre 'sexo'
  const radios = document.getElementsByName("sexo");
  let valorSeleccionadoSexo = "";

  // Iterar sobre los radio buttons para encontrar el seleccionado
  for (const radio of radios) {
    if (radio.checked) {
      valorSeleccionadoSexo = radio.value;
      break;
    }
  }

  return valorSeleccionadoSexo;
}

function valorRadioModalidad() {
  const radios = document.getElementsByName("modalidad");
  let valorSeleccionadoModalidad = "";

  for (const radio of radios) {
    if (radio.checked) {
      valorSeleccionadoModalidad = radio.value;
      break;
    }
  }

  return valorSeleccionadoModalidad;
}

function modificar() {
  let id = document.getElementById("id").value;
  let nombre_ingresado = document.getElementById("nombre").value;
  let apellido_ingresado = document.getElementById("apellido").value;
  let dni_ingresado = document.getElementById("dni").value;
  let edad_ingresado = document.getElementById("edad").value;
  let sexo_ingresado = valorRadioSexo();
  let domicilio_ingresado = document.getElementById("domicilio").value;
  let telefono_ingresado = document.getElementById("telefono").value;
  let email_ingresado = document.getElementById("email").value;
  let imagen_ingresado = document.getElementById("imagen").value;
  let modalidad_ingresado = valorRadioModalidad();
  let comentario_ingresado = document.getElementById("comentario").value;

  let datos = {
    nombre: nombre_ingresado,
    apellido: apellido_ingresado,
    dni: dni_ingresado,
    edad: edad_ingresado,
    sexo: sexo_ingresado,
    domicilio: domicilio_ingresado,
    telefono: telefono_ingresado,
    email: email_ingresado,
    imagen: imagen_ingresado,
    modalidad: modalidad_ingresado,
    comentario: comentario_ingresado,
  };

  console.log(datos);

  let url = "https://registroalumnos.pythonanywhere.com/update/" + id;
  var options = {
    body: JSON.stringify(datos),
    method: "PUT",

    headers: { "Content-Type": "application/json" },
    // el navegador seguirá automáticamente las redirecciones y
    // devolverá el recurso final al que se ha redirigido.
    redirect: "follow",
  };
  fetch(url, options)
    .then(function () {
      console.log("modificado");
      alert("Registro modificado");

      //Puedes utilizar window.location.href para obtener la URL actual, redirigir a otras páginas
      window.location.href = "../index.html";
    })
    .catch((err) => {
      this.error = true;
      console.error(err);
      alert("Error al Modificar");
    });
}
