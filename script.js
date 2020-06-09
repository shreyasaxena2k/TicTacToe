 const X_class='x'
const CIRCLE_class='circle'
const WINNING_COMBINATION=[
    [0,1,2,],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]

const board=document.getElementById('board')
const winningMsgElement =document.getElementById('winning-msg')
const cellElements=document.querySelectorAll('[data-cell]')
const restartButton= document.getElementById('restart-btn')
const winningMsgTextElement=document.querySelector('[data-winning-msg-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    circleTurn=false
cellElements.forEach(cell =>{
    cell.classList.remove(X_class)
    cell.classList.remove(CIRCLE_class)
    cell.removeEventListener('click',handleClick)
   cell.addEventListener('click',handleClick, {once: true})
})
setBoardHoverClass()
    winningMsgElement.classList.remove('show')
}
 
function handleClick(e){
    // placeMark
    // check for win
    // chech for draw
    // switch turn
    const cell=e.target
    const currentClass= circleTurn? CIRCLE_class: X_class

    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false) 
        // console.log('win')
    }else if (isDraw()){
        endGame(true)
    }else{
    swapTurns()
    setBoardHoverClass()
    }
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)

}

function swapTurns(){
    circleTurn=!circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_class)
    board.classList.remove(CIRCLE_class)
    if(circleTurn){
        board.classList.add(CIRCLE_class)
    }else{
        board.classList.add(X_class)

    }
}

function checkWin(currentClass){
    return WINNING_COMBINATION.some(combinition=>{
        return combinition.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw){
    if(draw){
        winningMsgTextElement.innerText='DRAW!'
    }
    else{
        winningMsgTextElement.innerText=`${circleTurn ? "O's" : "X's"} WINS!`
    }
    winningMsgElement.classList.add('show')
}

function isDraw(){
    return[...cellElements].every(cell=>{
        return cell.classList.contains(X_class) || cell.classList.contains(CIRCLE_class)

    })
}