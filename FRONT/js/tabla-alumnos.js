const { createApp } = Vue;

createApp({
  data() {
    return {
      url: "https://registroalumnos.pythonanywhere.com/alumnos", // Retorna todos los registros de la tabla alumnos
      alumnos: [],
      error: false,
      cargando: true,
    };
  },

  //se llamama despues de que la instancia haya
  //teminado de procesar todas las opciones relacionadas con el estado
  created() {
    this.obtenerDatos(this.url);
  },

  methods: {
    // metodo para consumir la API en la route   /alumnos
    obtenerDatos(url) {
      // aca se consume la Api /alumnos
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.alumnos = data;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },

    // metodo para eliminar mediante ID
    eliminar(id) {
      const url = "https://registroalumnos.pythonanywhere.com/borrar/" + id;
      var options = {
        method: "DELETE",
      };
      fetch(url, options)
        .then((response) => response.json()) // or response.text()
        .then((response) => {
          alert("Eliminado correctamente");
          // Actualizar la lista de alumnos eliminando el alumno de la lista local
          this.alumnos = this.alumnos.filter((alumno) => alumno.id !== id);
        });
    },
  },
}).mount("#app");
