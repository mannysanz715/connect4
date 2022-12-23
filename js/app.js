

let clickSound = new Audio('./assets/click.mp3')
let resetSoundAudio = new Audio('./assets/resetSound.mp3')
// ? -------------------- consts ---------------------------
const winningCombos = [[0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32,31], [14, 15, 16, 17],
  [27, 26, 25, 24],[21, 22, 23, 24],
  [20, 19, 18, 17],[28, 29, 30, 31],
  [13, 12, 11, 10],[35, 36, 37, 38], [5,10,15,20],
  [6, 5, 4, 3],[0, 7, 14, 21],
  [41, 34, 27, 20],[1, 8, 15, 22],
  [40, 33, 26, 19],[2, 9, 16, 23],[39, 32, 25, 18],
  [3, 10, 17, 24],[38, 31, 24, 17],
  [4, 11, 18, 25],[37, 30, 23, 16],
  [5, 12, 19, 26],[36, 29, 22, 15],
  [6, 13, 20, 27],[35, 28, 21, 14],
  [0, 8, 16, 24],[41, 33, 25, 17],
  [7, 15, 23, 31],[34, 26, 18, 10],
  [14, 22, 30, 38],[27, 19, 11, 3],
  [35, 29, 23, 17],[6, 12, 18, 24],
  [28, 22, 16, 10],[13, 19, 25, 31],
  [21, 15, 9, 3],[20, 26, 32, 38],[36, 30, 24, 18],
  [5, 11, 17, 23],[37, 31, 25, 19],
  [4, 10, 16, 22],[2, 10, 18, 26],
  [39, 31, 23, 15],[1, 9, 17, 25],
  [40, 32, 24, 16],[9, 17, 25, 33],
  [8, 16, 24, 32],[11, 17, 23, 29],
  [12, 18, 24, 30],[1, 2, 3, 4],
  [5, 4, 3, 2],[8, 9, 10, 11],
  [12, 11, 10, 9],[15, 16, 17, 18],
  [19, 18, 17, 16],[22, 23, 24, 25],
  [26, 25, 24, 23],[29, 30, 31, 32],
  [33, 32, 31, 30],[36, 37, 38, 39],
  [40, 39, 38, 37],[7, 14, 21, 28],
  [8, 15, 22, 29],[9, 16, 23, 30],[10, 17, 24, 31],[11, 18, 25, 32],[12, 19, 26, 33], [13, 20, 27, 34]]




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


console.log(title)
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
  console.log(title.className)
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
  console.log(winner)
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

