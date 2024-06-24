let mass = 0;
let planetCount = 0;
let planetCost = 10;
let massPerClick = 1;
let achievements = [];
let planets = [];

const planetImages = [
    { type: 'Earth-like Planet', filename: 'earth_like.webp' },
    { type: 'Gas Giant', filename: 'gas_giant.webp' },
    { type: 'Desert Planet', filename: 'desert_planet.webp' },
    { type: 'Ice Planet', filename: 'ice_planet.webp' },
    { type: 'Volcanic Planet', filename: 'volcanic_planet.webp' }
];

function generateMass() {
    mass += massPerClick;
    updateUI();
    checkAchievements();
}

function buyPlanet() {
    if (mass >= planetCost) {
        mass -= planetCost;
        planetCount++;
        planetCost = Math.floor(planetCost * 1.5);

        const planet = planetImages[planetCount % planetImages.length];
        let newPlanet = {
            name: `${planet.type} ${planetCount}`,
            massPerSecond: Math.floor(planetCost / 10),
            image: planet.filename
        };
        planets.push(newPlanet);
        updateUI();
        checkAchievements();
    }
}

function buyUpgrade() {
    const upgradeCost = 50;
    if (mass >= upgradeCost) {
        mass -= upgradeCost;
        massPerClick *= 2;
        document.getElementById('upgradeBtn').style.display = 'none';
        updateUI();
        checkAchievements();
    }
}

function checkAchievements() {
    if (mass >= 100 && !achievements.includes('Mass Master')) {
        achievements.push('Mass Master');
        addAchievement('Mass Master');
    }
    if (planetCount >= 5 && !achievements.includes('Planet Pioneer')) {
        achievements.push('Planet Pioneer');
        addAchievement('Planet Pioneer');
    }
}

function addAchievement(name) {
    const achievementList = document.getElementById('achievementList');
    const listItem = document.createElement('li');
    listItem.textContent = name;
    achievementList.appendChild(listItem);
}

function updateUI() {
    document.getElementById('mass').textContent = mass;
    document.getElementById('planetCount').textContent = planetCount;
    document.getElementById('planetCost').textContent = planetCost;
    updatePlanetList();
}

function updatePlanetList() {
    const planetList = document.getElementById('planetList');
    planetList.innerHTML = '';
    planets.forEach(planet => {
        const listItem = document.createElement('li');
        listItem.textContent = `${planet.name} - Mass per second: ${planet.massPerSecond}`;
        const img = document.createElement('img');
        img.src = planet.image;
        img.alt = planet.type;
        listItem.appendChild(img);
        planetList.appendChild(listItem);
    });
}

// Initial UI update
updateUI();
setInterval(() => {
    planets.forEach(planet => {
        mass += planet.massPerSecond;
    });
    updateUI();
}, 1000);