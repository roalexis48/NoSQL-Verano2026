const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;

app.use(morgan("dev"));


//Ejercicio 1 Numero par o impar
app.get("/par/:numero", (req, res) => {
    const numero = parseInt(req.params.numero);
    res.send(`
        <p style="color: black; font-size: 18px;">Ejercicio 1. Par o Impar</p>
        <p> El numero ${numero} es : ${numero % 2 === 0 ? "par" : "impar"}</p>  
        `);
});

//Ejercicio 2 Mayor de edad
app.get("/edad/:edad", (req, res) => {
    const edad = parseInt(req.params.edad);
    res.send(`
        <p style="color: black; font-size: 18px;">Ejercicio 2. Mayor de edad</p>
        <p> Eres ${edad >= 18 ? "mayor de edad" : "menor de edad"}</p>
        `);
});

//Ejercicio 3 Calculadora Suma
app.get("/calculadora/:suma/:a/:b", (req,res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(`                
        <p style="color: black; font-size: 18px;">Ejercicio 3. Suma</p>
        <p>${a} + ${b} = ${a+b}</p>
        `);
});

//Ejercicio 3 Calculadora Resta
app.get("/calculadora/:resta/:a/:b", (req,res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(`                
        <p style="color: black; font-size: 18px;">Ejercicio 3. Resta</p>
        <p>${a} + ${b} = ${a-b}</p>
        `);
    
});

//Ejercicio 3 Calculadora Multiplicacion
app.get("/calculadora/:multiplicar/:a/:b", (req,res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(`                
        <p style="color: black; font-size: 18px;">Ejercicio 3. Multiplicacion</p>
        <p>${a} + ${b} = ${a*b}</p>
        `);
    
});

//Ejercicio 3 Calculadora Division
app.get("/calculadora/:dividir/:a/:b", (req,res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(`                
        <p style="color: black; font-size: 18px;">Ejercicio 3. Division</p>
        <p>${a} + ${b} = ${a/b}</p>
        `);
});

//Ejercicio 4 Tabla de multplicar
app.get("/tabla/:n", (req, res) => {
    const n = parseInt(req.params.n);
    res.send(`
        <p style="color: black; font-size: 18px;">Ejercicio 4. Tabla de Multiplicar</p>
        Tabla de multiplicar de ${n}:
        ${n} * 1 = ${n * 1}
        ${n} * 2 = ${n * 2}
        ${n} * 3 = ${n * 3}
        ${n} * 4 = ${n * 4}
        ${n} * 5 = ${n * 5}
        ${n} * 6 = ${n * 6}
        ${n} * 7 = ${n * 7}
        ${n} * 8 = ${n * 8}
        ${n} * 9 = ${n * 9}
        ${n} * 10 = ${n * 10} 
        `);
});


//Ejercicio 5 Calificacion
app.get("/calificacion/:nota", (req,res) => {
    const nota = parseInt(req.params.nota);
    res.send(`
        <p style="color: black; font-size: 18px;">Ejercicio 5. Calificacion</p>
        ${nota < 70 ? "Reprobado" : ""}
        ${nota >= 70 ? "Aprobado" : ""}
        ${nota >= 80 ? "Muy bien" : ""}
        ${nota >= 90 ? "Excelente" : ""} 

        `); 
});




app.listen(PORT, () => {
    console.log("Servidor iniciado en http://localhost:" + PORT);
});