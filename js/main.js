const hammer = document.querySelector('.hammer')
const holes = document.querySelectorAll('.hole')
const content = document.querySelector('.content')
const button = document.getElementById('button')

const scoreBoard = document.querySelector('.score')
const speedBoard = document.querySelector('.speed')
const timerBoard = document.querySelector('.timer')

const SCORE_ADDITION = 50

const MOLE = './assets/img/mole1.png'
const MOLE_WACKED = './assets/img/molehit.png'

const SPEED_START = 1250
const SPEED_FASTER = 50
const SPEED_UPDATE = 100
const SPEED_MIN = 750

const SPEEDS = [
    { max: SPEED_START, txt: "SLOW"},
    { max: SPEED_START - SPEED_UPDATE, txt: "MEDIUM"},
    { max: SPEED_START - (2 * SPEED_UPDATE), txt: "FAST"},
    { max: SPEED_START - (4 * SPEED_UPDATE), txt: "RIDICULOUS"}
]

let score = 0
let speed = SPEED_START
let time = 60


/// Hamer
window.addEventListener('mousemove', e => {
    hammer.style.top = e.pageY + 'px'
    hammer.style.left = e.pageX + 'px'
})

window.addEventListener('mousedown', () => {
    hammer.classList.add('active')
})

window.addEventListener('mouseup', () => {
    hammer.classList.remove('active')
})

///speed
const getSpeedText = (speed) => {
    let curSpeed = SPEEDS.filter( s => speed <= s.max)
    return(curSpeed[curSpeed.length - 1].txt)
}

const setSpeed = () => {
    if (score % SPEED_UPDATE === 0 && speed > SPEED_MIN) {
        speed -= SPEED_FASTER
        speedBoard.textContent = getSpeedText(speed)
    }
}

///score
const setScore = () => {
    score += SCORE_ADDITION
    scoreBoard.textContent = score
    setSpeed()
}

/// countdowm
const countDown = () => {
    time--
    timerBoard.textContent = `${ time }`

    if (time == 0) {
        clearInterval(countDownTimerId)
        content.style.display = 'none'
        button.style.display = 'block'
    }
}

///random hole
const getRandomHole = () => {
    return(Math.floor(Math.random() * holes.length))
}

/// mole
const createMole = () => {
    const img = document.createElement('img')
    img.classList.remove('mole')
    img.classList.add('mole')
    img.src = MOLE

    img.addEventListener('click', () => {
        setScore()
        img.src = MOLE_WACKED
    })

    return(img)
}

/// game engine
const main = () => {
    const hole = holes[getRandomHole()]
    let timer = null
    const img = createMole()
    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        main()
    }, speed)  
}

/// GO!
let countDownTimerId

function startGame() {
    score = 0
    scoreBoard.textContent = score
    speed = SPEED_START
    speedBoard.textContent = getSpeedText(speed) 
    time = 60

    content.style.display = 'block'
    button.style.display= 'none'

    countDownTimerId = setInterval(countDown, 1000)
    
}
main()  





