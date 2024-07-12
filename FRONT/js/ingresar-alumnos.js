function valorRadioSexo() {
  // Obtener todos los radio buttons con nombre 'sexo'
  const radios = document.getElementsByName("sexo");
  let valorSeleccionado = "";

  // Iterar sobre los radio buttons para encontrar el seleccionado
  for (const radio of radios) {
    if (radio.checked) {
      valorSeleccionado = radio.value;
      break;
    }
  }

  return valorSeleccionado;
}

function valorRadioModalidad() {
  const radios = document.getElementsByName("modalidad");
  let valorSeleccionado = "";

  for (const radio of radios) {
    if (radio.checked) {
      valorSeleccionado = radio.value;
      break;
    }
  }

  return valorSeleccionado;
}

function guardar() {
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

  console.log(
    nombre_ingresado,
    apellido_ingresado,
    dni_ingresado,
    edad_ingresado,
    sexo_ingresado,
    domicilio_ingresado,
    telefono_ingresado,
    email_ingresado,
    imagen_ingresado,
    modalidad_ingresado,
    comentario_ingresado
  );

  // Se arma el objeto de js
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

  let url = "https://registroalumnos.pythonanywhere.com/registro";
  var options = {
    body: JSON.stringify(datos),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  fetch(url, options)
    .then(function () {
      console.log("creado");
      alert("Grabado");
      window.location.href = "../index.html";
    })
    .catch((err) => {
      alert("Error al grabar");
      console.error(err);
    });
}
