

let clickSound = new Audio('./assets/click.mp3')
let resetSoundAudio = new Audio('./assets/resetSound.mp3')
// ? -------------------- consts ---------------------------
const winningCombos = [[0, 1, 2, 3], ]




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

const title = document.getElementById('title')

// ? ----------------------- EventListeners ---------------

gameBoard.addEventListener('click', play)

resetBtn.addEventListener('click', init)

gameBoard.addEventListener('click', shakeBoard)

resetBtn.addEventListener('click', resetSound)




// ? ----------------------------------- Functions ---------------------------

init()

function init () {
  currentPlayer = 1
  winner = false
  draw = false
  title.classList.add('animate__rotateInDownRight')
  setTimeout(function(){
    title.classList.remove('animate__rotateInDownRight');
  }, 1000);
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

function shakeBoard(e){
  if(e.target.parentElement.classList[0]==='board-container'){
    e.target.parentElement.classList.add('animate__shakeX')
    setTimeout(function(){
      e.target.parentElement.classList.remove('animate__shakeX');
    }, 1000);
  }
  clickSound.play()
}

function resetSound (){
  resetSoundAudio.play()
}


function play(event){
  let clickedSlot = event.target
  if(clickedSlot.parentElement.className[0] !== 'board-container'){
    dropPiece(event)
    checkForWinner()
  }
  updateMessage()
}

function dropPiece(event){
  let clickedSlot = event.target
  let column = event.target.parentElement.classList[0]
  if(!winner){
    for(let i = 5; i > -1; i--){
      if(boardArr[column][i] === null){
        boardArr[column][i]
        boardArr[column][i] = currentPlayer
        if(currentPlayer === 1) clickedSlot.parentElement.children[i].style.backgroundColor = player1 
        else if(currentPlayer === -1) clickedSlot.parentElement.children[i].style.backgroundColor = player2
        clickSound.loop = false
        clickSound.play()
        checkForDraw()
        switchPlayer()
        return
      }
    }
  }
}

function checkForWinner(){
  let boardForCheck = []
  boardArr.forEach(arr =>{
    arr.forEach(el =>{
      boardForCheck.push(el)
    })
  })

  for(let i = 0; i < winningCombos.length; i++){
    if(Math.abs(boardForCheck[winningCombos[i][0]] + boardForCheck[winningCombos[i][1]] + boardForCheck[winningCombos[i][2]] + boardForCheck[winningCombos[i][3]]) === 4){
    winner = true
    } 
  }
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
}

function switchPlayer(){
  currentPlayer *= -1
}


function updateMessage (){
  let playerRed = 'Red'
  let playerYellow = 'Yellow'
  let player
  if(currentPlayer === -1){
    player = playerRed
  }else{
    player = playerYellow
  }
  if (draw === true) message.textContent = 'Game is a Draw'
  else if(winner === true) message.textContent = `${player} wins`
  else if(currentPlayer === 1) message.textContent = "Red's turn"
  else if(currentPlayer === -1) message.textContent = "Yellow's turn"
}

