





// ? -------------------- consts ---------------------------
const winningCombos = [[]]

const player1 = 'red'
const player2 = 'yellow'

let currentPlayer = -1


// ? -----------------  CachedElements -------------
const gameBoard = document.querySelector('.board-container')

const boardSlots = document.querySelectorAll('.circle')


// ? ----------------------- EventListeners ---------------

gameBoard.addEventListener('click', changeColor)







// ? ----------------------------------- Functions ---------------------------

init()

function init(){
  
  render()
}

function render(){

}

function changeColor(event){
  let column = event.target.parentElement.className
  let row = []
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

}

function collisionDetection(){

}

function updateMessage (){

}

