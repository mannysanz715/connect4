
// ? -------------------- consts ---------------------------
const winningCombos = [[],]



let player1 = '#a63a50'
let player2 = '#E6AA68'
let boardArr = []
let currentPlayer
let winner
let draw


// ? -----------------  CachedElements -------------
const gameBoard = document.querySelector('.board-container')

const boardSlots = document.querySelectorAll('.circle')

const resetBtn = document.getElementById('reset')

const message = document.getElementById('message')

// ? ----------------------- EventListeners ---------------

gameBoard.addEventListener('click', play)

resetBtn.addEventListener('click', init)





// ? ----------------------------------- Functions ---------------------------

init()

function init () {
  currentPlayer = 1
  winner = false
  draw = false
  boardSlots.forEach(element =>{
    element.style.backgroundColor = ''
  })
  boardArr = []
  createBoard()
}

function createBoard(){
  for(let i = 0; i < gameBoard.children.length; i++){
    boardArr.push([null,null,null,null,null,null])
  }
}


function play(event){
  checkForWinner()
  let clickedSlot = event.target
  if(clickedSlot.parentElement.className !== 'board-container'){
    dropPiece(event)
  }
  updateMessage()
}

function dropPiece(event){
  let clickedSlot = event.target
  let column = event.target.parentElement.classList[0]
  for(let i = 5; i > -1; i--){
    if(boardArr[column][i] == null){
      boardArr[column][i] = currentPlayer
      if(currentPlayer === 1) clickedSlot.parentElement.children[i].style.backgroundColor = player1 
      else if(currentPlayer === -1) clickedSlot.parentElement.children[i].style.backgroundColor = player2
      checkForDraw()
      switchPlayer()
      console.log(boardArr)
      return
    }
  }
}

function checkForWinner(){
  
}

function checkForDraw(){
  let checkVal = 0
  boardArr.forEach(arr =>{
    arr.forEach(el =>{
      checkVal += Math.abs(el)
    })
  })
  if(checkVal === 42){
    draw = true
  }
  console.log(checkVal)
  
  
}

function switchPlayer(){
  currentPlayer *= -1
}

function collisionDetection(){
  
}

function updateMessage (){
  if(draw === true){
    message.textContent = 'Game is a Draw'
  }
  else if(currentPlayer === 1){
    message.textContent = "Red's turn"
  }else if(currentPlayer === -1){
    message.textContent = "Yellow's turn"
  }
}


console.log(boardSlots)