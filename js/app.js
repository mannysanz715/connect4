
// ? -------------------- consts ---------------------------
const winningCombos = [[]]

const player1 = '#a63a50'
const player2 = '#E6AA68'
const boardArr = []
let currentPlayer
let winner



// ? -----------------  CachedElements -------------
const gameBoard = document.querySelector('.board-container')

const boardSlots = document.querySelectorAll('.circle')


// ? ----------------------- EventListeners ---------------

gameBoard.addEventListener('click', changeColor)






// ? ----------------------------------- Functions ---------------------------

init()

function init () {
  currentPlayer = 1
  winner = false
  createBoard()
  render()
}

function createBoard(){
  for(let i = 0; i < gameBoard.children.length; i++){
    boardArr.push([null,null,null,null,null,null])
  }
}


function render(){

}

function changeColor(event){


  if(column !== 'board-container'){
    console.log(row, column) 
    
  }
}

function checkForWinner(){

}

function checkForTie(){

}

function dropPiece(){

}

function switchPlayer(){
  if(!winner){
    currentPlayer *= -1
  }

}

function collisionDetection(){

}

function updateMessage (){

}

