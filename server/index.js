const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const controller = require("./controller")

app.use(bodyParser.json());



app.get("/api/favorites", controller.readFavorites)

app.post("/api/favorites", controller.addFavorites)

app.put("/api/favorites/:id", controller.updateFavorites)

app.delete("/api/favorites/:id", controller.deleteFavorite)

app.get("/api/search", controller.searchOnServer)

const PORT = 4000;
app.listen(PORT, () => console.log(`Ship docked at port ${PORT}`));
