var board;
var score=0;
var rows=4;
var columns=4;
var l=false;
var r=false;
var u=false;
var d=false;

window.onload=function(){
    setBoard();
}

function setBoard(){
    board=[
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ];

    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            let tile=document.createElement("div");
            tile.id=i.toString()+"-"+j.toString();
            changeTile(tile,board[i][j]);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function changeTile(tile,num){
    tile.innerText="";
    tile.classList.value="";
    tile.classList.add("tile");
    if(num>0){
        tile.innerText=num.toString();
        if(num<=4096){
            tile.classList.add("x"+num.toString());
        }
        else{
            tile.classList.add("x8192");
        }
    }
}

function equalBoard(copyboard){
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            if(board[i][j]!=copyboard[i][j]){
                  return false;
            }
        }
    }
    return true;
}

document.addEventListener('keyup',(k) =>{
    if(k.code=="ArrowLeft"){
        let copyboard=[];
        for(let i=0;i<rows;i++){
            let temprow=[]
            for(let j=0;j<columns;j++){
                temprow.push(board[i][j]);
            }
        copyboard.push(temprow);
        }
        slideLeft();
        setTwo();
        if(equalBoard(copyboard)){
            l=true;
        }
        else{
            l=false;
            u=false;
            r=false;
            d=false;
        }

    }
    else if(k.code=="ArrowRight"){
        let copyboard=[];
        for(let i=0;i<rows;i++){
            let temprow=[]
            for(let j=0;j<columns;j++){
                temprow.push(board[i][j]);
            }
        copyboard.push(temprow);
        }
        slideRight();
        setTwo();
        if(equalBoard(copyboard)){
            r=true;
        }
        else{
            l=false;
            u=false;
            r=false;
            d=false;
        }
    }
    else if(k.code=="ArrowUp"){
        let copyboard=[];
        for(let i=0;i<rows;i++){
            let temprow=[]
            for(let j=0;j<columns;j++){
                temprow.push(board[i][j]);
            }
        copyboard.push(temprow);
        }
        slideUp();
        setTwo();
        if(equalBoard(copyboard)){
            u=true;
        }
        else{
            l=false;
            u=false;
            r=false;
            d=false;
        }
    }
    else if(k.code=="ArrowDown"){
        let copyboard=[];
        for(let i=0;i<rows;i++){
            let temprow=[]
            for(let j=0;j<columns;j++){
                temprow.push(board[i][j]);
            }
        copyboard.push(temprow);
        }
        slideDown();
        setTwo();
        if(equalBoard(copyboard)){
            d=true;
        }
        else{
            l=false;
            u=false;
            r=false;
            d=false;
        }
    }
    if(l && r && u && d){
        document.getElementById("Endgame").innerText="Game Lost!!";
        document.getElementById("Tryagain").innerText="Try again";
    }
    document.getElementById("score").innerText=score;
})

function setTwo(){
    if(!emptyTile()){
        return;
    }
    let found=false;
    while(!found){
        let r=Math.floor(Math.random()*rows);
        let c=Math.floor(Math.random()*columns);
        if(board[r][c]==0){
            board[r][c]=2;
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText="2";
            tile.classList.add("x2");
            found=true;
        }
    }
}

function emptyTile(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            if(board[i][j]==0){
                return true;
            }
        }
    }
    return false;
}
function filterZero(row){
    return row.filter(num => num!=0);
}
function slide(row){
    row=filterZero(row);
    for(let i=0;i<row.length-1;i++){
        if(row[i]==row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }
    row=filterZero(row);
    while(row.length<columns){
        row.push(0);
    }
    return row;
}

function slideLeft(){
    for(let i=0;i<rows;i++){
        let row=board[i];
        row=slide(row)
        board[i]=row;
        for(let j=0;j<columns;j++){
            let tile=document.getElementById(i.toString()+"-"+j.toString());
            changeTile(tile,board[i][j]);
        }
    }
}

function slideRight(){
    for(let i=0;i<rows;i++){
        let row=board[i];
        row.reverse();
        row=slide(row)
        board[i]=row.reverse();
        for(let j=0;j<columns;j++){
            let tile=document.getElementById(i.toString()+"-"+j.toString());
            changeTile(tile,board[i][j]);
        }
    }
}

function slideUp(){
    for(let j=0;j<columns;j++){
        let row=[board[0][j],board[1][j],board[2][j],board[3][j]];
        row=slide(row);
        for(let i=0;i<rows;i++){
            board[i][j]=row[i];
            let tile=document.getElementById(i.toString()+"-"+j.toString());
            changeTile(tile,board[i][j]);
        }
    }
}

function slideDown(){
    for(let j=0;j<columns;j++){
        let row=[board[0][j],board[1][j],board[2][j],board[3][j]];
        row.reverse();
        row=slide(row);
        row.reverse();
        for(let i=0;i<rows;i++){
            board[i][j]=row[i];
            let tile=document.getElementById(i.toString()+"-"+j.toString());
            changeTile(tile,board[i][j]);
        }
    }
}