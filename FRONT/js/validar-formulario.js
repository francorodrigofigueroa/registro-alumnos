function validarFormulario() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const dni = document.getElementById("dni").value;
  const edad = document.getElementById("edad").value;
  const sexo = document.querySelector('input[name="sexo"]:checked');
  const domicilio = document.getElementById("domicilio").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const imagen = document.getElementById("imagen").value;
  const modalidad = document.querySelector('input[name="modalidad"]:checked');
  const comentario = document.getElementById("comentario").value;

  if (!nombre) {
    alert("El Nombre es obligatorio");
    return false;
  }

  if (!apellido) {
    alert("El Apellido es obligatorio");
    return false;
  }

  if (!dni || dni.length !== 8) {
    alert("El DNI es obligatorio y debe tener 8 dígitos");
    return false;
  }

  if (!edad || edad < 0 || edad > 120) {
    alert("La edad es obligatoria y debe estar entre 0 y 120");
    return false;
  }

  if (!sexo) {
    alert("El sexo es obligatorio");
    return false;
  }

  if (!domicilio) {
    alert("El domicilio es obligatorio");
    return false;
  }

  if (!telefono || (telefono.length > 0 && telefono.length >= 20)) {
    alert("El teléfono es obligatorio y debe tener menos de 20 dígitos");
    return false;
  }

  if (!email || !validarEmail(email)) {
    alert("El email es obligatorio y debe tener un formato válido");
    return false;
  }

  if (!imagen) {
    alert("La foto es obligatoria");
    return false;
  }

  if (!modalidad) {
    alert("La modalidad es obligatoria");
    return false;
  }

  if (comentario.length >= 120) {
    alert("El comentario debe tener hasta 120 caracteres");
    return false;
  }

  return true;
}

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]/;
  return re.test(String(email).toLowerCase());
}

function validarYGuardar() {
  if (validarFormulario()) {
    guardar();
  }
}

function validarYModificar() {
  if (validarFormulario()) {
    modificar();
  }
}
