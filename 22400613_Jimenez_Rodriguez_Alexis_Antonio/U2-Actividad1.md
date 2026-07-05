\## Consultas

* 1. Mostrar todos los libros publicados después del año 2022
* db.libros.find({"año": {$gt: 2022}})

* 2. Mostrar los usuarios cuya edad sea mayor o igual a 21
* db.usuarios.find({"edad": {$gte: 21}})


* 3. Mostrar los libros con menos de 350 paginas
* db.libros.find({"paginas": {$lt: 350}})

* 4. Mostrar los usuarios cuya edad sea menor o igual a 20 años
* db.usuarios.find({"edad": {$lte: 20}})

* 5. Mostrar los libros cuya categoria sea diferente de "Programacion
* db.libros.find({"categoria": {$ne: "Programacion"}})

* 6. Mostrar los usuarios que estudien "Ingenieria Informatica" y esten en sexto semestre o superior
* db.usuarios.find({"carrera": "Ingenieria Informatica", "semestre": {$gte: 6}})

* 7. Mostrar los libros cuya categoría sea Programación o Bases de Datos
* db.libros.find({"categoria": {$in: ["Programacion", "Bases de Datos"]}})

* 8. Mostrar los prestamos que no han sido devueltos y cuya duracion sea mayor a 8 dias
* db.prestamos.find({"devuelto": false, "diasPrestamo": {$gt: 8}})

* 9. Mostrar los libros cuyo titulo empiece con la letra "M"
* db.libros.find({"titulo": {$regex: "^M"}})

* 10. Mostrar los usuarios cuyo nombre empiece con la letra A
* db.usuarios.find({"nombre": {$regex: "^A"}})

* 11. Mostrar los libros cuyo titulo contenga la palabra "Base"
* db.libros.find({"titulo": {$regex: "Base"}})

* 12. Mostrar unicamente el nombre y la carrera de todos los usuarios
* db.usuarios.find({}, {"nombre": 1, "carrera": 1, "_id": 0})

* 13. Mostrar unicamente el titulo y el autor de todos los libros
* db.libros.find({}, {"titulo": 1, "autor": 1, "_id":0})

* 14. Mostrar unicamente el usuario y el libro de todos los prestamos
* db.prestamos.find({}, {"usuario": 1, "libro": 1, "_id":0})

* 15. Mostrar los libros ordenados por año de publicacion, del mas reciente al mas antiguo
* db.libros.find().sort({"año": -1})

* 16. Mostrar los usuarios ordenados alfabeticamente por nombre
* db.usuarios.find().sort({"nombre": 1})

* 17. Mostrar los prestamos ordenados por la cantidad de dias de prestamo, del mayor al menor
* db.prestamos.find().sort({ "diasPrestamo": -1})

* 18. Mostrar unicamente el titulo y el año de los libros publicados a partir de 2022, ordenados del mas reciente al mas antiguo
* db.libros.find({"año": {$gte: 2022}},{"titulo": 1, "año": 1, "_id": 0}).sort({"año": -1})

* 19. Mostrar el nombre y la carrera de los usuarios cuya carrera sea "Ingeniería en Sistemas Computacionales" o "Ingeniería Informatica"
* db.usuarios.find({ "carrera": {$in: ["Ingenieria en Sistemas Computacionales", "Ingenieria Informatica"]}}, {"nombre": 1, "carrera": 1, "_id": 0})


* 20. Mostrar los prestamos no devueltos, ordenados por la cantidad de días de préstamo de mayor a menor, mostrando únicamente el usuario, el libro y los días de prestamo
* db.prestamos.find({"devuelto": false}, {"usuario": 1, "libro": 1, "diasPrestamo": 1, "_id": 0}).sort({"diasPrestamo": -1})


