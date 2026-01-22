//---------------------
// VARIABLES DU PROGRAMME
const ROW = 6;
const COL = 7;

let round = 0

let grid = [];

let colorJ1 = "#1CB5BC";
let colorJ2 = "#E72D73";

let gameOver = false;

const winJ1Panel = document.getElementById("winJ1_panel");
const winJ2Panel = document.getElementById("winJ2_panel");
const equalityPanel = document.getElementById("equality_panel");
const leaveButton = document.querySelector(".leave_button");
const leavePanel = document.getElementById("leave_panel");
const buttonNo = document.getElementById("button_no");
//---------------------


//---------------------
// -- FONCTION DU PROGRAMME --

// DRAW GRID
function createGrid() {

    const gridContainer = document.getElementById("grid");

    for (let r = 0; r < ROW; r++) {
        grid[r] = []

        for (let c = 0; c < COL; c++) {
            grid[r][c] = 0;
        }
    }

    for (let c = 0; c < COL; c++) {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col")

        for (let r = 0; r < ROW; r++) {
            const caseDiv = document.createElement("div");
            caseDiv.classList.add("case");
            caseDiv.dataset.row = r;
            caseDiv.dataset.col = c;

            colDiv.appendChild(caseDiv);
        }
        gridContainer.appendChild(colDiv);

    }
}

// COLUMNS LISTENER
function intColumnsListener() {
    
    const columns = document.querySelectorAll(".col");
    
    for ( let c = 0; c < columns.length; c++){
        columns[c].addEventListener("click", function (){
            if (gameOver) {return}
            onClickColumns(c);
        });
    }
}

// CLICK COLONNE
function onClickColumns(colIndex){

    for ( let r = ROW - 1; r >= 0; r--){
        grid[r][colIndex];

        if (grid[r][colIndex] === 0){
            const elmt = document.querySelector(`[data-row="${r}"][data-col="${colIndex}"]`);
            
            if (round % 2 === 0){
                elmt.style.backgroundColor = colorJ1;
                grid[r][colIndex] = 1;
            
            } else {
                elmt.style.backgroundColor = colorJ2;
                grid[r][colIndex] = 2;
            }
            checkHorizontal(r, colIndex);
            checkVertical(r, colIndex);
            checkDiagRight(r, colIndex);
            checkDiagLeft(r, colIndex);

            round++;
            return;            
        }
    }
}

// FONCTION CURRENT PLAYER
function getCurrentPlayer(){
    if (round % 2 === 0){
        return 1;
    }

    return 2;
}

// FONCTION CHECK EN HORIZONTALE
function checkHorizontal(rowIndex, colIndex){
    let countHorizontal = 0;
    let nbCol = colIndex;

    while (nbCol < COL && grid[rowIndex][nbCol] === getCurrentPlayer()){
        countHorizontal++;
        nbCol++;
    }

    nbCol = colIndex - 1;
    while (nbCol >= 0 && grid[rowIndex][nbCol] === getCurrentPlayer()){
        countHorizontal++;
        nbCol--;
    }
    victory(countHorizontal, round);
}

// FONCTION CHECK EN VERTIACALE
function checkVertical(rowIndex, colIndex){
    let countVertical = 0;
    let nbRow = rowIndex;

    while (nbRow < ROW && grid[nbRow][colIndex] === getCurrentPlayer()){
        countVertical++;
        nbRow++;
    }

    nbRow = rowIndex - 1;
    while (nbRow >= 0 && grid[nbRow][colIndex] === getCurrentPlayer()){
        countVertical++;
        nbRow--;
    }
    victory(countVertical, round);
}

// FONCTION CHECK EN DIAGONALE DROITE
function checkDiagRight(rowIndex, colIndex){ 
    let countDiag = 0;
    let nbCol = colIndex;
    let nbRow = rowIndex;

    // bas gauche ↙
    while (nbCol >= 0 &&  nbRow < ROW && grid[nbRow][nbCol] === getCurrentPlayer()){
        countDiag++;
        nbCol--;
        nbRow++;
    }

    // haut droit ↗
    nbCol = colIndex + 1;
    nbRow = rowIndex - 1;
    while (nbCol < COL && nbRow >= 0 && grid[nbRow][nbCol] === getCurrentPlayer()){
        countDiag++;
        nbCol++;
        nbRow--;
    }
    victory(countDiag, round);
}

// FONCTION CHECK EN DIAGONALE GAUCHE
function checkDiagLeft(rowIndex, colIndex){ 
    let countDiag = 0;
    let nbCol = colIndex;
    let nbRow = rowIndex;

    // bas droit ↘
    while (nbCol < COL &&  nbRow < ROW && grid[nbRow][nbCol] === getCurrentPlayer()){
        countDiag++;
        nbCol++;
        nbRow++;
    }

    // haut gauche ↖
    nbCol = colIndex - 1;
    nbRow = rowIndex - 1;
    while (nbCol >= 0 && nbRow >= 0 && grid[nbRow][nbCol] === getCurrentPlayer()){
        countDiag++;
        nbCol--;
        nbRow--;

    }
    victory(countDiag, round);
}

// FONCTION CONDITION DE VICTOIRE
function victory(count, round){
    if (count >= 4){
        document.getElementById("grid").style.pointerEvents = "none";
        
        if (getCurrentPlayer() === 1){
            winJ1Panel.style.display = "flex";
        } else {
            winJ2Panel.style.display = "flex";
        }
        return gameOver = true;
    }
    
    if (round >= 41){
        document.getElementById("grid").style.pointerEvents = "none";
        equalityPanel.style.display = "flex";
        return gameOver = true;
    }
}


createGrid()
intColumnsListener()
//---------------------


leaveButton.addEventListener("click", function (){
    leavePanel.style.display = "flex";
});

buttonNo.addEventListener("click", function (){
    leavePanel.style.display = "none";
});