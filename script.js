let mass = 0;
let planetCount = 0;
let planetCost = 10;
let massPerClick = 1;
let achievements = [];

function generateMass() {
    mass += massPerClick;
    document.getElementById('mass').textContent = mass;
    checkAchievements();
}

function buyPlanet() {
    if (mass >= planetCost) {
        mass -= planetCost;
        planetCount++;
        planetCost = Math.floor(planetCost * 1.5);
        document.getElementById('mass').textContent = mass;
        document.getElementById('planetCount').textContent = planetCount;
        document.getElementById('planetCost').textContent = planetCost;
        checkAchievements();
    }
}

function buyUpgrade() {
    const upgradeCost = 50;
    if (mass >= upgradeCost) {
        mass -= upgradeCost;
        massPerClick *= 2;
        document.getElementById('mass').textContent = mass;
        document.getElementById('upgradeBtn').style.display = 'none';
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

// Initial UI update
document.getElementById('mass').textContent = mass;
document.getElementById('planetCount').textContent = planetCount;
document.getElementById('planetCost').textContent = planetCost;