const canvas = document.getElementById('game')
const ct = canvas.getContext('2d');

class Snakebd{
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7
let tileCount = 20
let tileSize = canvas.width / tileCount-2
let headX = 10
let headY = 10
let xSpeed = 0
let ySpeed = 0
const snakeBd =[]
let tailLength =2

let foodX = 5
let foodY = 5

let score = 0

const newSound = new Audio('food.mp3')

function drawGame() {
    changeSnakePosition()
    let result = isGameOver()
    if (result){
        return
    }
    clearScreen()

    eatFood()
    drawFood()
    drawSnake()

    drawScore()
        if(score>3){
            speed = 11;
        }
    if(score>5){
        speed =16
    }
    setTimeout(drawGame, 200)
}
function isGameOver() {
    let gameOver = false

    if(ySpeed===0 && xSpeed ===0){
        return false
    }
    //wall
    if(headX<0){
        gameOver = true
    }
    else if(headX===tileCount){
        gameOver = true
    }
    else if(headY<0){
        gameOver = true
    }
    else if(headY===tileCount){
        gameOver = true
    }
    for (let i = 0; i < snakeBd.length; i++) {
        let bd = snakeBd[i]
        if(bd.x===headX && bd.y===headY){
            gameOver = true
            break
        }
    }
    if(gameOver){
        ct.fillStyle = 'white'
        ct.font = '50px Verdana'

        if(gameOver) {
            ct.fillStyle = 'white'
            ct.font = '50px Verdana'

            var gradient = ct.createLinearGradient(0, 0, canvas.width, 0)
            gradient.addColorStop('0', 'magenta')
            gradient.addColorStop('0.5', 'blue')
            gradient.addColorStop('1.0', 'red')

            ct.fillStyle = gradient;

            ct.fillText('Thua rồi =((', canvas.width / 6.5, canvas.height / 2)
        }
        ctx.fillText("Thua rồi =((", canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}
function drawScore() {
    ct.fillStyle = 'white'
    ct.font = '10px Verdana'
    ct.fillText('Score: ' + score, canvas.width-50,10)
}
function  clearScreen() {
    ct.fillStyle = 'black'
    ct.fillRect(0,0,canvas.width,canvas.height)
}

function drawSnake() {

    ct.fillStyle ='green'
    for(let i = 0; i<snakeBd.length;i++){
        let bd =snakeBd[i]
        ct.fillRect(bd.x*tileCount,bd.y*tileCount,tileSize,tileSize)
    }
    snakeBd.push(new Snakebd(headX,headY))
    while (snakeBd.length>tailLength){
        snakeBd.shift()
    }
    ct.fillStyle = 'red'
    ct.fillRect(headX * tileCount, headY * tileCount,tileSize,tileSize)
}

function drawFood() {
    ct.fillStyle = 'red';
    ct.fillRect(foodX*tileCount,foodY*tileCount,tileSize,tileSize)

}

function eatFood() {
    if(foodX===headX&&foodY===headY){
        foodX = Math.floor(Math.random()*tileCount)
        foodY = Math.floor(Math.random()*tileCount)
        tailLength++
        score++
        newSound.play()
    }
    
}

function changeSnakePosition(){
    headY = headY + ySpeed
    headX = headX + xSpeed
}

document.body.addEventListener('keydown', keyDown)

function keyDown(event) {
    //lên
    if(event.keyCode == 38){
        if(ySpeed==1)
            return
        xSpeed = 0;
        ySpeed = -1
    }
    //xuông
    if(event.keyCode == 40){
        if(ySpeed==-1)
            return
        xSpeed = 0;
        ySpeed = 1
    }
    //trái
    if(event.keyCode == 37){
        if(xSpeed==1)
            return
        xSpeed = -1;
        ySpeed = 0
    }
    //phải
    if(event.keyCode == 39){
        if(xSpeed==-1)
            return
        xSpeed = 1;
        ySpeed = 0
    }
}

drawGame()