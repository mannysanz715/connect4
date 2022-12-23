
let clickSound = new Audio('./assets/click.mp3')
let resetSoundAudio = new Audio('./assets/resetSound.mp3')


// ? -------------------- Consts ---------------------------
const winningCombos = [[0, 1, 2, 3],[1,2,3,4],[2,3,4,5], [6,7,8,9],[7,8,9,10],[8,9,10,11],[12,13,14,15],[13,14,15,16],[14,15,16,17],[18,19,20,21],[19,20,21,22],[20,21,22,23],[24,25,26,27],[25,26,27,28],[26,27,28,29],[30,31,32,33],[31,32,33,34],[32,33,34,35],[36,37,38,39],[37,38,39,40],[38,39,40,41],[0,6,12,18],[6,12,18,24],[12,18,24,30],[18,24,30,36],[1,7,13,19],[7,13,19,25],[13,19,25,31],[19,25,31,37],[2,8,34,20],[8,34,20,26],[34,20,26,32],[20,26,32,38],[3,9,15,21],[9,15,21,27],[15,21,27,33],[21,27,33,39],[4,10,16,22],[10,16,22,28],[16,22,28,34],[22,28,34,40],[5,11,17,23],[11,17,23,29],[17,23,29,35],[23,29,35,41],[0,7,14,21],[6,13,20,23],[12,19,26,33],[18,25,32,39],[1,8,15,22],[7,14,21,28],[13,20,27,34],[19,26,33,40],[2,9,16,23],[8,15,22,28],[14,21,28,35],[20,27,34,41],[36,31,26,21],[37,32,27,22],[38,33,28,23],[30,25,20,15],[31,26,21,16],[24,19,34,9],[25,20,15,10],[26,21,16,11],[18,13,8,3],[19,14,9,4],[20,15,10,5]]


// ? ----------------------- Variables -------------------

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




// ? ------------------------ Functions ---------------------------

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

