const express = require("express"),
    utils = require("./utils");

const app = express();

app.get("/notifications", (req, res) => {
    const car = utils.getRandomCar();
    const elapsedTime = utils.getRandomElapsedTime();
    const name = utils.getRandomName();
    const icon = `https://zionauto.sg/cars/${car.icon}.webp`

    res.send({name, car: car.name, elapsedTime, icon})
})

app.listen(6567, () => {
    console.log("Notifications server started");
})