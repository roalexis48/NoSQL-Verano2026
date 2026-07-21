const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const PORT = 3000;

app.use(morgan("dev"));

mongoose.connect("mongodb://127.0.0.1:27017/netflix")
.then(() => {
    console.log("Conectado correctamente a MongoDB (netflix)");
})
.catch((error) => {
    console.error("Error al conectar con MongoDB:", error);
});

// Esquema de Películas
const peliculaSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true, trim: true },
        genero: { type: String, required: true, trim: true },
        año: { type: Number, required: true },
        duracion: { type: Number, required: true },
        idioma: { type: String, required: true, trim: true },
        calificacion: { type: Number, required: true },
        nc: { type: String, trim: true }
    },
    { timestamps: true }
);

// Esquema de Series
const serieSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true, trim: true },
        genero: { type: String, required: true, trim: true },
        año: { type: Number, required: true },
        temporadas: { type: Number, required: true },
        episodios: { type: Number, required: true },
        idioma: { type: String, required: true, trim: true },
        calificacion: { type: Number, required: true },
        nc: { type: String, trim: true }
    },
    { timestamps: true }
);

const Pelicula = mongoose.model("Pelicula", peliculaSchema, "peliculas");
const Serie = mongoose.model("Serie", serieSchema, "series");


// 1. Obtener todas las películas
app.get("/peliculas", async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las películas",
            error: error
        });
    }
});

// 2. Obtener una película por ID
app.get("/peliculas/:id", async (req, res) => {
    try {
        const id = req.params.id; 
        const pelicula = await Pelicula.findById(id);
        if (!pelicula) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la película",
            error: error
        });
    }
});

// 3. Registrar una nueva película
app.post("/peliculas", async (req, res) => {
    try {
        const { titulo, genero, año, duracion, idioma, calificacion, nc } = req.body;
        
        if (!titulo || !genero || !año || !duracion || !idioma || !calificacion) {
            return res.status(400).json({
                mensaje: "Faltan datos obligatorios de la película"
            });
        }

        const nuevaPelicula = new Pelicula({
            titulo, genero, año, duracion, idioma, calificacion, nc
        });

        const peliculaGuardada = await nuevaPelicula.save();
        res.status(201).json({
            mensaje: "Película registrada correctamente",
            pelicula: peliculaGuardada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al guardar la película",
            error: error
        });
    }
});

// 4. Actualizar una película por ID
app.put("/peliculas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, genero, año, duracion, idioma, calificacion, nc } = req.body;

        if (!titulo || !genero || !año || !duracion || !idioma || !calificacion) {
            return res.status(400).json({
                mensaje: "Faltan datos obligatorios de la película"
            });
        }

        const peliculaActualizada = await Pelicula.findByIdAndUpdate(
            id,
            { titulo, genero, año, duracion, idioma, calificacion, nc },
            { new: true, runValidators: true }
        );

        if (!peliculaActualizada) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        res.json({
            mensaje: "Película actualizada correctamente",
            pelicula: peliculaActualizada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar la película",
            error: error
        });
    }
});

// 5. Eliminar una película por ID
app.delete("/peliculas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const peliculaEliminada = await Pelicula.findByIdAndDelete(id);

        if (!peliculaEliminada) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        res.json({
            mensaje: "Película eliminada correctamente",
            pelicula: peliculaEliminada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar la película",
            error: error
        });
    }
});


// 1. Obtener todas las series
app.get("/series", async (req, res) => {
    try {
        const series = await Serie.find();
        res.json(series);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las series",
            error: error
        });
    }
});

// 2. Obtener una serie por ID
app.get("/series/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const serie = await Serie.findById(id);
        if (!serie) {
            return res.status(404).json({
                mensaje: "Serie no encontrada"
            });
        }
        res.json(serie);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la serie",
            error: error
        });
    }
});

// 3. Registrar una nueva serie
app.post("/series", async (req, res) => {
    try {
        const { titulo, genero, año, temporadas, episodios, idioma, calificacion, nc } = req.body;

        if (!titulo || !genero || !año || !temporadas || !episodios || !idioma || !calificacion) {
            return res.status(400).json({
                mensaje: "Faltan datos obligatorios de la serie"
            });
        }

        const nuevaSerie = new Serie({
            titulo, genero, año, temporadas, episodios, idioma, calificacion, nc
        });

        const serieGuardada = await nuevaSerie.save();
        res.status(201).json({
            mensaje: "Serie registrada correctamente",
            serie: serieGuardada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al guardar la serie",
            error: error
        });
    }
});

// 4. Actualizar una serie por ID
app.put("/series/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, genero, año, temporadas, episodios, idioma, calificacion, nc } = req.body;

        if (!titulo || !genero || !año || !temporadas || !episodios || !idioma || !calificacion) {
            return res.status(400).json({
                mensaje: "Faltan datos obligatorios de la serie"
            });
        }

        const serieActualizada = await Serie.findByIdAndUpdate(
            id,
            { titulo, genero, año, temporadas, episodios, idioma, calificacion, nc },
            { new: true, runValidators: true }
        );

        if (!serieActualizada) {
            return res.status(404).json({
                mensaje: "Serie no encontrada"
            });
        }

        res.json({
            mensaje: "Serie actualizada correctamente",
            serie: serieActualizada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar la serie",
            error: error
        });
    }
});

// 5. Eliminar una serie por ID
app.delete("/series/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const serieEliminada = await Serie.findByIdAndDelete(id);

        if (!serieEliminada) {
            return res.status(404).json({
                mensaje: "Serie no encontrada"
            });
        }

        res.json({
            mensaje: "Serie eliminada correctamente",
            serie: serieEliminada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar la serie",
            error: error
        });
    }
});

app.listen(PORT, () => {
    console.log("Servidor iniciado en http://localhost:" + PORT);
});