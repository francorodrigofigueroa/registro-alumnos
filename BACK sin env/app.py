#  Importar las herramientas
# Acceder a las herramientas para crear la app web
from flask import Flask, request, jsonify

# Para manipular la DB
from flask_sqlalchemy import SQLAlchemy 

# Módulo cors es para que me permita acceder desde el frontend al backend
from flask_cors import CORS

# Crear la app
app = Flask(__name__)

# permita acceder desde el frontend al backend
CORS(app)


# Configurar a la app la DB
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario:contraseña@localhost:3306/nombre_de_la_base_de_datos'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/comision_241169'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Crear un objeto db, para informar a la app que se trabajará con sqlalchemy
db = SQLAlchemy(app)


# Definir la tabla 
class ALUMNOS(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    dni = db.Column(db.String(10), nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    sexo = db.Column(db.String(12), nullable=False)
    domicilio = db.Column(db.String(50), nullable=False)
    telefono = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(75), nullable=False )
    imagen = db.Column(db.String(400), nullable=False)
    modalidad = db.Column(db.String(50), nullable=False)
    comentario = db.Column(db.String(250))
    
    

    def __init__(self,nombre,apellido,dni,edad,sexo,domicilio,telefono,email,imagen,modalidad,comentario):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.apellido=apellido
        self.dni=dni
        self.edad=edad
        self.sexo=sexo
        self.domicilio=domicilio
        self.telefono=telefono
        self.email=email
        self.imagen=imagen
        self.modalidad=modalidad
        self.comentario=comentario       


# 8. Crear la tabla al ejecutarse la app
with app.app_context():

    db.create_all()

# Crear ruta de acceso
# / es la ruta de inicio
@app.route("/")
def index():
    return f'App Web para registrar alumnos'

# Crear un registro en la tabla Productos
@app.route("/registro", methods=['POST']) 
def registro():
    # {"nombre": "Felipe", ...} -> input tiene el atributo name="nombre"
    nombre = request.json["nombre"]
    apellido=request.json['apellido']
    dni=request.json['dni']
    edad=request.json['edad']
    sexo=request.json['sexo']
    domicilio=request.json['domicilio']
    telefono=request.json['telefono']
    email=request.json['email']
    imagen=request.json['imagen']
    modalidad=request.json['modalidad']
    comentario=request.json['comentario']

    nuevo_registro = ALUMNOS (nombre=nombre,apellido=apellido,dni=dni,edad=edad,sexo=sexo,domicilio=domicilio,telefono=telefono,email=email,imagen=imagen,modalidad=modalidad,comentario=comentario)
    db.session.add(nuevo_registro)
    db.session.commit()

    return "Solicitud de post recibida"
    

# Retornar todos los registros en un Json
@app.route("/alumnos",  methods=['GET'])
def alumnos():
    # Consultar en la tabla todos los registros
    # all_registros -> lista de objetos
    all_registros = ALUMNOS.query.all()

    # Lista de diccionarios
    data_serializada = []
    
    for objeto in all_registros:
        data_serializada.append({"id":objeto.id, "nombre":objeto.nombre, "apellido":objeto.apellido, "dni":objeto.dni, "edad":objeto.edad, "sexo":objeto.sexo, "domicilio":objeto.domicilio, "telefono":objeto.telefono, "email":objeto.email, "imagen":objeto.imagen, "modalidad":objeto.modalidad, "comentario":objeto.comentario })

    return jsonify(data_serializada)


# Modificar un registro
@app.route('/update/<id>', methods=['PUT'])
def update(id):
    # Buscar el registro a modificar en la tabla por su id
    alumno = ALUMNOS.query.get(id)

    # {"nombre": "Felipe"} -> input tiene el atributo name="nombre"
    nombre = request.json["nombre"]
    apellido = request.json["apellido"]
    dni = request.json["dni"]
    edad = request.json["edad"]
    sexo = request.json["sexo"]
    domicilio = request.json["domicilio"]
    telefono = request.json["telefono"]
    email = request.json["email"]
    imagen = request.json["imagen"]
    modalidad = request.json["modalidad"]
    comentario =request.json["comentario"]
    

    alumno.nombre=nombre
    alumno.apellido=apellido
    alumno.dni=dni
    alumno.edad=edad
    alumno.sexo=sexo
    alumno.domicilio=domicilio
    alumno.telefono=telefono
    alumno.email=email
    alumno.imagen=imagen
    alumno.modalidad=modalidad
    alumno.comentario=comentario
    
    
    db.session.commit()

    data_serializada = [{"id":alumno.id, "nombre":alumno.nombre, "apellido":alumno.apellido, "dni":alumno.dni, "edad":alumno.edad, "sexo":alumno.sexo, "domicilio":alumno.domicilio, "telefono":alumno.telefono, "email":alumno.email, "imagen":alumno.imagen, "modalidad":alumno.modalidad, "comentario":alumno.comentario}]
    
    return jsonify(data_serializada)

   
@app.route('/borrar/<id>', methods=['DELETE'])
def borrar(id):
    
    # Se busca a la productos por id en la DB
    alumno = ALUMNOS.query.get(id)

    # Se elimina de la DB
    db.session.delete(alumno)
    db.session.commit()

    data_serializada = [{"id":alumno.id, "nombre":alumno.nombre, "apellido":alumno.apellido, "dni":alumno.dni, "edad":alumno.edad, "sexo":alumno.sexo, "domicilio":alumno.domicilio, "telefono":alumno.telefono, "email":alumno.email, "imagen":alumno.imagen, "modalidad":alumno.modalidad, "comentario":alumno.comentario}]

    return jsonify(data_serializada)


if __name__ == "__main__":
    app.run(debug=True)

