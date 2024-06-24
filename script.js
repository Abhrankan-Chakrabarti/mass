let mass = 0;
let planets = 0;
let planetCost = 10;

function updateDisplay() {
    document.getElementById('mass').innerText = mass;
    document.getElementById('planets').innerText = planets;
    document.getElementById('planetCost').innerText = planetCost;
    document.querySelector('button[onclick="buyPlanet()"]').disabled = mass < planetCost;
}

function generateMass() {
    mass += 1;
    updateDisplay();
}

function buyPlanet() {
    if (mass >= planetCost) {
        mass -= planetCost;
        planets += 1;
        planetCost = Math.floor(planetCost * 1.5);
        updateDisplay();
    }
}

updateDisplay();