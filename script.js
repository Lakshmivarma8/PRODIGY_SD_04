document.addEventListener("DOMContentLoaded",()=>{
    createSudokuGrid();
});

function createSudokuGrid(){
    const gridContainer=document.getElementById("sudoku-grid");
    for(let i=0;i<81;i++){
        const input = document.createElement("input");
        input.type="number";
        input.min=1;
        input.max=9;
        input.value="";
        gridContainer.appendChild(input);
    }
}
function getSudokuGrid() {
    const inputs = document.querySelectorAll("#sudoku-grid input");
    const grid = [];
    let row = [];
    inputs.forEach((input, index) => {
        if (index > 0 && index % 9 === 0) {
            grid.push(row);
            row = [];
        }
        row.push(input.value ? parseInt(input.value) : 0);
    });
    grid.push(row);
    return grid;
}

function setSudokuGrid(grid, originalGrid){
    const inputs = document.querySelectorAll("#sudoku-grid input");
    inputs.forEach((input,index)=>{
        const row = Math.floor(index/9);
        const col = index%9;
        input.value=grid[row][col]? grid[row][col]:"";
        if (originalGrid[row][col]===0 && grid[row][col]!==0){
            input.classList.add("solved");
        }
    });
}

function isValid(board, row, col, num){
    for(let i = 0;i<9;i++){
        if(board[row][i]===num || board[i][col]===num){
            return false;
        }
        const subGridRow = 3*Math.floor(row/3)+ Math.floor(i/3);
        const subGridCol = 3*Math.floor(col/3)+(i%3);
        if(board[subGridRow][subGridCol]===num){
            return false;
        }
    }
    for (let i = 0; i < 9; i++) {
        if ((row === col && board[i][i] === num) || (row + col === 8 && board[i][8 - i] === num)) {
            return false;
        }
    }
    return true;
}

function solveSudokuHelper(board){
    for(let row=0;row<9;row++){
        for(let col=0;col<9;col++){
            if(board[row][col]===0){
                for(let num=1;num<=9;num++){
                    if(isValid(board,row,col,num)){
                        board[row][col] = num;
                        if(solveSudokuHelper(board)){
                            return true;
                        }
                        board[row][col]=0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(){
    const grid = getSudokuGrid();
    const originalGrid = JSON.parse(JSON.stringify(grid));
    console.log("Initial Grid:", grid); 
    if(solveSudokuHelper(grid)){
        setSudokuGrid(grid,originalGrid);
    }
    else{
        alert("No solution exists for this.!!");
    }
}