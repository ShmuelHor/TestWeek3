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

document.getElementById("form")!.addEventListener('submit', function(event) {
    event.preventDefault();
});

butSearchPlayer.addEventListener('click', ()=>{CreateSearch();})

async function CreateSearch():Promise<void>{
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
    CreateTablePlayers(await addScooter(playerData));
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
        
        const div = document.createElement("div");
        
        const add = document.createElement("button");
        add.textContent = `Add ${obj.playerName.split(" ")[0]} to Current Team`;
        // add.addEventListener('click', ()=>{Delete(obj.id);})
        div.appendChild(add);

        tr.appendChild(div);
        
        table.appendChild(tr);
    })
}

function CreateGroup(plyer:Player){
    
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

const playerData: DataPlayersSearch = {
    position: "C",
    twoPercent: 45,
    threePercent: 38,
    points: 4
};


async function addScooter(DataPlayers:DataPlayersSearch):Promise<Player[]>{
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
//  addScooter(playerData).then((res) => { console.log(res);})

