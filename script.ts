const BASE_URL:string = "https://nbaserver-q21u.onrender.com";

const PlayerCardPG =  document.getElementById("Player-card-PG") as HTMLDivElement;
const PlayerCardSG = document.getElementById("Player-card-SG") as HTMLDivElement;
const PlayerCardSF = document.getElementById("Player-card-SF") as HTMLDivElement;
const PlayerCardPF = document.getElementById("Player-card-PF") as HTMLDivElement;
const PlayerCardC = document.getElementById("Player-card-C") as HTMLDivElement;

const PositionPlayer = document.getElementById("Position-player-select") as HTMLSelectElement;
const points = document.getElementById("points") as HTMLInputElement;
const twoPercent = document.getElementById("two-percent") as HTMLInputElement;
const threePercent = document.getElementById("three-percent") as HTMLInputElement;
const butSearchPlayer = document.getElementById("but-search-Players") as HTMLButtonElement;

const table = document.getElementById("table") as HTMLTableSectionElement;

const saveGroup = document.getElementById("save-group") as HTMLButtonElement;

document.getElementById("form")!.addEventListener('submit', function(event) {
    event.preventDefault();
});
points.addEventListener('click', ()=>{document.getElementById("p-points")!.textContent = points.value;})
twoPercent.addEventListener('click', ()=>{document.getElementById("p-two-percent")!.textContent = twoPercent.value;})
threePercent.addEventListener('click', ()=>{document.getElementById("p-three-percent")!.textContent = threePercent.value;})
butSearchPlayer.addEventListener('click', ()=>{CreateObject();});

async function CreateObject():Promise<void>{
    const playerData: DataPlayersSearch = {
        position: PositionPlayer.value,
        twoPercent: +twoPercent.value,
        threePercent: +threePercent.value,
        points: +points.value
    };
    table.innerHTML = " ";
    twoPercent.value = "0";
    threePercent.value ="0";
    points.value = "0";
    document.getElementById("p-three-percent")!.textContent = "three percent";
    document.getElementById("p-two-percent")!.textContent = "two percent";
    document.getElementById("p-points")!.textContent = "points";
    CreateTablePlayers(await SearchByParameters(playerData));
}

function CreateTablePlayers(listPlayers:Player[]){
    listPlayers.forEach((obj)=>{
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
        
        const div = document.createElement("td");
        
        const add = document.createElement("button");
        add.textContent = `Add ${obj.playerName.split(" ")[0]} to Current Team`;
        add.addEventListener('click', ()=>{CreatePlayerCard(obj);})
        div.appendChild(add);

        tr.appendChild(div);
        table.appendChild(tr);
    })
    
}

function CreatePlayerCard(plyer:Player){
    const PlayerCar = document.getElementById(`${plyer.position}`) as HTMLDivElement;
   
    PlayerCar.textContent = " ";

    const pPlayerName = document.createElement("p");
    pPlayerName.textContent = plyer.playerName.toString();
    PlayerCar.appendChild(pPlayerName);

    const pThreePercent = document.createElement("p");
    pThreePercent.textContent = `Three Percents : ${plyer.threePercent} `;
    PlayerCar.appendChild(pThreePercent);

    const pTwoPercent = document.createElement("p");
    pTwoPercent.textContent = `Three Percents : ${plyer.twoPercent} `;
    PlayerCar.appendChild(pTwoPercent);

    const pPoints = document.createElement("p");
    pPoints.textContent = `Points : ${plyer.points} `;
    PlayerCar.appendChild(pPoints);
}


interface Player{
    position: string;
    twoPercent: Number;
    threePercent: Number;
    points: Number;
    playerName: String;
}

interface DataPlayersSearch{
    position: string;
    twoPercent: Number;
    threePercent: Number;
    points: Number;
}

async function SearchByParameters(DataPlayers:DataPlayersSearch):Promise<Player[]>{
    try{
        
        const response = await fetch(`${BASE_URL}/api/filter`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(DataPlayers)
        });
        
        if(!response.ok){
            throw new Error("network error")
        }
        const listPlayers:Player[] = await response.json();
        return listPlayers;
    }catch(error){
        console.error(error);
        throw new Error("error");
    }
}
