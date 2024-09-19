"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://nbaserver-q21u.onrender.com";
const PlayerCardPG = document.getElementById("Player-card-PG");
const PlayerCardSG = document.getElementById("Player-card-SG");
const PlayerCardSF = document.getElementById("Player-card-SF");
const PlayerCardPF = document.getElementById("Player-card-PF");
const PlayerCardC = document.getElementById("Player-card-C");
const PositionPlayer = document.getElementById("Position-player-select");
const points = document.getElementById("points");
const twoPercent = document.getElementById("two-percent");
const threePercent = document.getElementById("three-percent");
const butSearchPlayer = document.getElementById("but-search-Players");
const table = document.getElementById("table");
document.getElementById("form").addEventListener('submit', function (event) {
    event.preventDefault();
});
butSearchPlayer.addEventListener('click', () => { CreateSearch(); });
function CreateSearch() {
    return __awaiter(this, void 0, void 0, function* () {
        const playerData = {
            position: PositionPlayer.value,
            twoPercent: +twoPercent.value,
            threePercent: +threePercent.value,
            points: +points.value
        };
        table.innerHTML = " ";
        twoPercent.value = "0";
        threePercent.value = "0";
        points.value = "0";
        CreateTablePlayers(yield addScooter(playerData));
    });
}
function CreateTablePlayers(listPlayers) {
    listPlayers.forEach((obj) => {
        const tr = document.createElement("tr");
        const playerName = document.createElement("td");
        playerName.textContent = obj.playerName.toString();
        tr.appendChild(playerName);
        const position = document.createElement("td");
        position.textContent = obj.position;
        tr.appendChild(position);
        const points = document.createElement("td");
        points.textContent = obj.points.toString();
        tr.appendChild(points);
        const twoPercent = document.createElement("td");
        twoPercent.textContent = obj.twoPercent.toString();
        tr.appendChild(twoPercent);
        const threePercent = document.createElement("td");
        threePercent.textContent = obj.threePercent.toString();
        tr.appendChild(threePercent);
        const div = document.createElement("div");
        const add = document.createElement("button");
        add.textContent = `Add ${obj.playerName.split(" ")[0]} to Current Team`;
        // add.addEventListener('click', ()=>{Delete(obj.id);})
        div.appendChild(add);
        tr.appendChild(div);
        table.appendChild(tr);
    });
}
function CreateGroup(plyer) {
}
const playerData = {
    position: "C",
    twoPercent: 45,
    threePercent: 38,
    points: 4
};
function addScooter(DataPlayers) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${BASE_URL}/api/filter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(DataPlayers)
            });
            if (!response.ok) {
                throw new Error("network error");
            }
            const listPlayers = yield response.json();
            return listPlayers;
        }
        catch (error) {
            console.error(error);
            throw new Error("error");
        }
    });
}
//  addScooter(playerData).then((res) => { console.log(res);})
