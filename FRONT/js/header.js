document.addEventListener("DOMContentLoaded", function () {
  // Header para tabla alumnoswork
  if (document.getElementById("header")) {
    document.getElementById("header").innerHTML = `
            <nav class="menu">
                <a href="index.html">Alumnos Registrados</a>
                <a href="templates/form-alumnos.html">Registrar Alumno</a>
            </nav>
        `;
  }

  // Header para form y editar
  if (document.getElementById("headertemplate")) {
    document.getElementById("headertemplate").innerHTML = `
            <nav class="menu">
                <a href="../index.html">Alumnos Registrados</a>
                <a href="form-alumnos.html">Registrar Alumno</a>
            </nav>
        `;
  }
});
