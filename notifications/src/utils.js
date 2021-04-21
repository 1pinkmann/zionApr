fs = require("fs");

let cars = fs.readFileSync(__dirname + "/../cars.txt").toString().split(/\r?\n/).trim();
let names = fs.readFileSync(__dirname + "/../names.txt").toString().split(/\r?\n/).trim();

const mappedCars = cars.map((car) => {
    const [icon, name] = car.split('  ');
    return { icon, name };
});

exports.getRandomName = () => {
    return names[getRandom(0, names.length - 1)];
}
exports.getRandomCar = () => {
    return mappedCars[getRandom(0, mappedCars.length - 1)];
}
exports.getRandomElapsedTime = () => {
    let dateNow = new Date();
    const from = dateNow.setUTCHours(9 - 8, 0, 0, 0);
    const to = dateNow.setUTCHours(18 - 8, 0, 0, 0);

    //create an offset for weekends
    if(dateNow.getDay() === 6){
        dateNow.setDate(dateNow.getDate() - 1);
    }else if(dateNow.getDay() === 0){
        dateNow.setDate(dateNow.getDate() - 2);
    }

    dateNow = Date.now();

    const elapsedSeconds = getRandom(
        to > dateNow? 0 : Math.round((dateNow - to) / 1000),
        Math.round((dateNow - from) / 1000));

    if(elapsedSeconds >= 86400){
        return `${Math.floor(elapsedSeconds / 60 / 60 / 24)} day(s)`;
    }else if(elapsedSeconds >= 3600){
        return `${Math.floor(elapsedSeconds / 60 / 60)} hour(s)`;
    }else{
        return `${Math.floor(elapsedSeconds / 60)} minute(s)`;
    }
}
//from and to are inclusive
function getRandom(min, max){
    //console.log(`Random between ${min} and ${max}`)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
