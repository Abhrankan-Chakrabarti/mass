let mass = 0;
let planetCount = 0;
let planetCost = 10;
let massPerClick = 1;
let achievements = [];
let planets = [];

const planetImages = [
    { type: 'Earth-like Planet', filename: 'earth_like.webp', description: 'A vibrant, blue-green planet with visible oceans and continents.' },
    { type: 'Gas Giant', filename: 'gas_giant.webp', description: 'A large planet with a thick atmosphere, primarily composed of gases.' },
    { type: 'Desert Planet', filename: 'desert_planet.webp', description: 'A rocky, arid planet with a reddish or yellowish surface.' },
    { type: 'Ice Planet', filename: 'ice_planet.webp', description: 'A cold, icy world with a white or pale blue surface, covered in ice and snow.' },
    { type: 'Volcanic Planet', filename: 'volcanic_planet.webp', description: 'A fiery planet with active volcanoes, lava flows, and a glowing, molten surface.' }
];

function playSound(soundId) {
    document.getElementById(soundId).play();
}

function generateMass() {
    mass += massPerClick;
    playSound('clickSound');
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
            image: planet.filename,
            description: planet.description
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
    playSound('achievementSound');
}

function updateBackground() {
    const baseSize = 100; // base size percentage
    const maxSize = 150;  // maximum size percentage
    const zoomFactor = Math.min(baseSize + planetCount, maxSize);
    document.body.style.backgroundSize = `${zoomFactor}%`;
}

function updateProgressBar() {
    const progress = Math.min((mass / planetCost) * 100, 100);
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function updateUI() {
    document.getElementById('mass').textContent = formatNumber(mass);
    document.getElementById('planetCount').textContent = formatNumber(planetCount);
    document.getElementById('planetCost').textContent = formatNumber(planetCost);
    updatePlanetList();
    updateBackground();
    updateProgressBar(); // Update progress bar
}

function updatePlanetList() {
    const planetList = document.getElementById('planetList');
    planetList.innerHTML = '';
    planets.forEach(planet => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${planet.name} - Mass per second: ${formatNumber(planet.massPerSecond)}
            <br>
            <img src="${planet.image}" alt="${planet.type}" title="${planet.description}" class="planet-img">
            <p>${planet.description}</p>`;
        planetList.appendChild(listItem);
    });
}

// Utility function to format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Initial UI update
updateUI();
setInterval(() => {
    planets.forEach(planet => {
        mass += planet.massPerSecond;
    });
    updateUI();
}, 1000);