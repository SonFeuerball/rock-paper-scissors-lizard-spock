//fields
const roundSelectorSection = document.getElementById("roundSelectorSection");

const roundsRadioGroup = document.getElementById("roundsRadioGroup");
const opponentRadioGroup = document.getElementById("opponentRadioGroup");
const robotRadio = document.getElementById("robot");
const racoonRadio = document.getElementById("racoon");
const setRounds = document.getElementById("setRounds");

const gameSection = document.getElementById("gameSection");
const opponentFace = document.getElementById("opponentFace");
const gameComment = document.getElementById("gameComment");

const playerWonScreen = document.getElementById("playerWonScreen");
const racoonWins = document.getElementById("racoonWins");
const playerLostScreen = document.getElementById("playerLostScreen");
const drawScreen = document.getElementById("drawScreen");

const showRules = document.getElementById("showRules");
const restart = document.getElementById("restart");

//gameSection
const currentRound = document.getElementById("currentRound");
const maxRounds = document.getElementById("maxRounds");

const playerScoreTotal = document.getElementById("playerScore");
const compScoreTotal = document.getElementById("compScore");

const compMoveBackground = document.getElementById("compMove");
const tauntField = document.getElementById("tauntField");
const compHand = document.getElementById("compHand");

const playerRockButton = document.getElementById("playerRock");
const playerPaperButton = document.getElementById("playerPaper");
const playerScissorsButton = document.getElementById("playerScissors");
const playerLizardButton = document.getElementById("playerLizard");
const playerSpockButton = document.getElementById("playerSpock");

//aside
const flowSection = document.getElementById("flowSection");

//modal
const rulesModal = document.getElementById('rulesModal')
const closeRulesModal = document.getElementsByClassName('closeRulesModal')[0]

//sounds
const iamrobot = document.getElementById('iamrobot')
const laugh = document.getElementById('laugh')
const robotMusic = document.getElementById('robotMusic')
const racoonMusic = document.getElementById('racoonMusic')
//buttonSounds
const allButtonSounds = document.getElementById('allButtonSounds').querySelectorAll('audio')
//cheers
const allWinCheers = document.getElementById('winCheers').querySelectorAll('audio')
const allLoseCheers = document.getElementById('loseCheers').querySelectorAll('audio')
const allDrawCheers = document.getElementById('drawCheers').querySelectorAll('audio')

//title words
const titleWordArray = document.getElementById('titleWords').querySelectorAll('div')
//lets
let roundCount
let currentRoundCounter

let robotWinTaunts = [
    "i am superior.",
    "ha... ha... ha... .",
    "crawl back into your cave.",
    "last warning.",
    "execute: chill().",
    "the cake is a lie.",
    "who needs turing anayway.",
    "execute: smile().",
    "stupid creature."
]
let robotLoseTaunts = [
    "calculation error.",
    "stack overflow.",
    "blue screen of death.",
    "execute: rage().",
    "execute: suicidalOverconfidence().",
    "execute: turbo().",
    "this. how.",
    "your luck is finite.",
    "404.",
    "500."
]
let robotDrawTaunts = [
    "unsatisfactory.",
    "i'll be back.",
    "division by 0.",
    "that racoon. unsanitary.",
    "loot boxes.",
    "glitch.",
    "again."
]
let racoonWinTaunts = [
    "oh noo!",
    "gonna crai?",
    "ei steel chip from robotz! hihi",
    "nobodi purrfect! ei nobodi!",
    "home is wher trash is!",
    "pardy forever, eat whatever!",
    "need hug?",
    "all hail. ME!",
    "gneheheh!",
    "gotcha!",
    "lukki mi!"
]
let racoonLoseTaunts = [
    "wanna bet moneyz?",
    "dubble or nutting?",
    "ei work out, so ei can nom garbage!",
    "liv fast eat trash!",
    "ei can show u sum trash!",
    "letz get trashed!",
    "no ragrets!",
    "shud add shotgun!",
    "wat nao?"
]
let racoonDrawTaunts = [
    "lame!",
    "gonna steel arm from robotz!",
    "u adress? got trashcan?",
    "ei not fat, just easy to see!",
    "stai classy and little trashy!",
    "ei did see racoonicorn once!",
    "let be trash togetur!",
    "mam sai no? ask dad!",
    "furry important!",
    "boooring!"
]

let playerScore = 0
let compScore = 0
//🦝 i need!
let racoonCalculashun
let anotherImportantRacoonCalculashun = 0
//🦝 hihi.

let selectedOpponent

//init
let radioArray = Array.from(roundsRadioGroup.querySelectorAll('input'))
radioArray.forEach(radio => {
    radio.onclick = () => {
        beep.play()
    }
})

robotRadio.onclick = () => {
    iamrobot.play()
}
racoonRadio.onclick = () => {
    laugh.play()
}
robotMusic.addEventListener("ended", function () {
    robotMusic.play()
})
racoonMusic.addEventListener("ended", function () {
    racoonMusic.play()
})

//switch of title animations
setInterval(function () {
    titleWordArray.forEach(word => {
        word.className = ''
        let randomAnimNumber = Math.floor(Math.random() * 5)
        switch (randomAnimNumber) {
            case 0:
                word.classList.add('spinny')
                break
            case 1:
                word.classList.add('shaky')
                break
            case 2:
                word.classList.add('bouncy')
                break
            case 3:
                word.classList.add('shifty')
                break
            case 4:
                word.classList.add('rotaty')
                break
        }
    })
}, 3000)
//init end

//start of game
setRounds.onclick = function () {

    //radioRounds
    // let radioArray = Array.from(roundsRadioGroup.querySelectorAll('input'))
    radioArray.forEach(radio => {
        if (radio.checked) {
            roundCount = radio.value * 1
        }
    })
    //radioOpponent
    let opponentArray = Array.from(opponentRadioGroup.querySelectorAll('input'))
    opponentArray.forEach(radio => {
        if (radio.checked) {
            selectedOpponent = radio.value * 1
            //0 = robot
            //1 = migthyRacoon
            if (selectedOpponent === 0) {
                tauntField.classList.add('robotTaunt')
                tauntField.innerHTML = 'loading'
                opponentFace.innerHTML = "🤖"
                racoonMusic.pause()
                robotMusic.play()
            } else if (selectedOpponent === 1) {
                tauntField.classList.add('racoonTaunt')
                tauntField.innerHTML = '<i>grinning</i>'
                opponentFace.innerHTML = "🦝"
                robotMusic.pause()
                racoonMusic.play()
            }
        }
    })

    toggleGameView(true)

    maxRounds.innerHTML = roundCount
    currentRoundCounter = 1
    currentRound.innerHTML = currentRoundCounter

    //🦝 haha i calculashun!
    racoonCalculashun = (Math.floor(roundCount / 2))
    if (roundCount % 2 === 0) {
        racoonCalculashun -= 1
    }
    //🦝 hoomin not need, hoomin much tu smart :)
}

restart.onclick = function () {
    playerWonScreen.style.display = "none"
    playerLostScreen.style.display = "none"
    drawScreen.style.display = "none"
    removeAllAnimations()
    compHand.innerHTML = "?"
    tauntField.className = ''
    tauntField.innerHTML = ''
    flowSection.innerHTML = ""

    roundCount = 0
    playerScore = 0
    compScore = 0
    //🦝 haha for next time!
    racoonCalculashun = 0
    anotherImportantRacoonCalculashun = 0
    racoonWins.style.display = "none"

    playerScoreTotal.innerHTML = playerScore
    compScoreTotal.innerHTML = compScore
    gameComment.innerHTML = "Select your move:"
    toggleGameView(false)
}

function playerMove(playerMove) {

    playRandomClickSound()
    let compMove = calcCompMove()

    // 0 ROCK
    // 1 PAPER
    // 2 SCISSORS
    // 3 LIZARD
    // 4 SPOCK

    if (selectedOpponent === 0) {
        switch (playerMove) {
            case 0:
                //playerWins
                if (compMove === 2 || compMove === 3) {
                    playerRockButton.classList.add("flickerPositive")
                    compMoveBackground.classList.add("flickerNegative")
                    setRandomLoseTaunt(selectedOpponent)
                    playerScore += 1
                    if (compMove === 2) {
                        compHand.innerHTML = "✌️"
                        gameComment.innerHTML = "Your Rock (✊) crushes their Scrissors (✌️). CrackKnirsch."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: ✊ crushes ✌️</div>`
                    }
                    if (compMove === 3) {
                        compHand.innerHTML = "🤏"
                        gameComment.innerHTML = "Your Rock (✊) crushes their Lizard (🤏). Matsch."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: ✊ crushes 🤏</div>`
                    }
                }
                //compWins
                if (compMove === 1 || compMove === 4) {
                    playerRockButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    setRandomWinTaunt(selectedOpponent)
                    compScore += 1
                    if (compMove === 1) {
                        compHand.innerHTML = "🤚"
                        gameComment.innerHTML = "Their Paper (🤚) covers your Rock (✊). WrapWrap."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤚 covers ✊</div>`
                    }
                    if (compMove === 4) {
                        compHand.innerHTML = "🖖"
                        gameComment.innerHTML = "Their Spock (🖖) vaporizes your Rock (✊). PewPew."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🖖 vaporizes ✊</div>`
                    }
                }
                //draw
                if (playerMove === compMove) {
                    compHand.innerHTML = "✊"
                    playerRockButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    setRandomDrawTaunt(selectedOpponent)
                    gameComment.innerHTML = "Two Rocks look stupidly at each other doing nothing. 🥱."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: ✊ </div>`
                }
                break
            case 1:
                //playerWins
                if (compMove === 0 || compMove === 4) {
                    playerPaperButton.classList.add("flickerPositive")
                    compMoveBackground.classList.add("flickerNegative")
                    setRandomLoseTaunt(selectedOpponent)
                    playerScore += 1
                    if (compMove === 0) {
                        compHand.innerHTML = "✊"
                        gameComment.innerHTML = "Your Paper (🤚) covers their Rock (✊). WrapWrap."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🤚 covers ✊</div>`
                    }
                    if (compMove === 4) {
                        compHand.innerHTML = "🖖"
                        gameComment.innerHTML = "Your Paper (🤚) disproves their Spock (🖖). It is logical."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🤚 disproves 🖖</div>`
                    }
                }
                //compWins
                if (compMove === 2 || compMove === 3) {
                    playerPaperButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    setRandomWinTaunt(selectedOpponent)
                    compScore += 1
                    if (compMove === 2) {
                        compHand.innerHTML = "✌️"
                        gameComment.innerHTML = "Their Scrissors (✌️) cuts your Paper (🤚). SnapSnap."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✌️ cuts 🤚</div>`
                    }
                    if (compMove === 3) {
                        compHand.innerHTML = "🤏"
                        gameComment.innerHTML = "Their Lizard (🤏) eats your Paper (🤚). NomNomNom."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤏 eats 🤚</div>`
                    }
                }
                //draw
                if (playerMove === compMove) {
                    compHand.innerHTML = "🤚"
                    playerPaperButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    setRandomDrawTaunt(selectedOpponent)
                    gameComment.innerHTML = "Two Papers are lying around. Nothing happens. 🥱."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: 🤚 </div>`
                }
                break
            case 2:
                //playerWins
                if (compMove === 1 || compMove === 3) {
                    playerScissorsButton.classList.add("flickerPositive")
                    compMoveBackground.classList.add("flickerNegative")
                    setRandomLoseTaunt(selectedOpponent)
                    playerScore += 1
                    if (compMove === 1) {
                        compHand.innerHTML = "🤚"
                        gameComment.innerHTML = "Your Scrissors (✌️) cuts their Paper (🤚). SnapSnap."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: ✌️ cuts 🤚</div>`
                    }
                    if (compMove === 3) {
                        compHand.innerHTML = "🤏"
                        gameComment.innerHTML = "Your Scrissors (✌️) decapitates their Lizard (🤏). No animals were harmed making this game."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: ✌️ decapitates 🤏</div>`
                    }
                }
                //compWins
                if (compMove === 0 || compMove === 4) {
                    playerScissorsButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    setRandomWinTaunt(selectedOpponent)
                    compScore += 1
                    if (compMove === 0) {
                        compHand.innerHTML = "✊"
                        gameComment.innerHTML = "Their Rock (✊) crushes your Scrissors (✌️). CrackKnirsch."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✊ crushes ✌️</div>`
                    }
                    if (compMove === 4) {
                        compHand.innerHTML = "🖖"
                        gameComment.innerHTML = "Their Spock (🖖) smashes your Scrissors (✌️). How? It is logical."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🖖 smashes ✌️</div>`
                    }
                }
                //draw
                if (playerMove === compMove) {
                    compHand.innerHTML = "✌️"
                    playerScissorsButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    setRandomDrawTaunt(selectedOpponent)
                    gameComment.innerHTML = "Two Scrissors (✌️) are ... well. Nothing of relevancy happens."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: ✌️ </div>`
                }
                break
            case 3:
                //playerWins
                if (compMove === 1 || compMove === 4) {
                    playerLizardButton.classList.add("flickerPositive")
                    compMoveBackground.classList.add("flickerNegative")
                    setRandomLoseTaunt(selectedOpponent)
                    playerScore += 1
                    if (compMove === 1) {
                        compHand.innerHTML = "🤚"
                        gameComment.innerHTML = "Your Lizard (🤏) eats their Paper (🤚). NomNomNom."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🤏 eats 🤚</div>`
                    }
                    if (compMove === 4) {
                        compHand.innerHTML = "🖖"
                        gameComment.innerHTML = "Your Lizard (🤏) poisons their Spock (🖖). Ouch."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🤏 poisons 🖖</div>`
                    }
                }
                //compWins
                if (compMove === 0 || compMove === 2) {
                    playerLizardButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    setRandomWinTaunt(selectedOpponent)
                    compScore += 1
                    if (compMove === 0) {
                        compHand.innerHTML = "✊"
                        gameComment.innerHTML = "Their Rock (✊) crushes your Lizard (🤏). Bam."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✊ crushes 🤏</div>`
                    }
                    if (compMove === 2) {
                        compHand.innerHTML = "✌️"
                        gameComment.innerHTML = "Their Scrissors (✌️) decapitates your Lizard (🤏). SnipSnip."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✌️ decapitates 🤏</div>`
                    }
                }
                //draw
                if (playerMove === compMove) {
                    compHand.innerHTML = "🤏"
                    playerLizardButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    setRandomDrawTaunt(selectedOpponent)
                    gameComment.innerHTML = "Two Lizards (🤏) have nothing more to do then making more Lizards (🤏). 🤫."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: 🤏 </div>`
                }
                break
            case 4:
                //playerWins
                if (compMove === 0 || compMove === 2) {
                    playerSpockButton.classList.add("flickerPositive")
                    compMoveBackground.classList.add("flickerNegative")
                    setRandomLoseTaunt(selectedOpponent)
                    playerScore += 1
                    if (compMove === 0) {
                        compHand.innerHTML = "✊"
                        gameComment.innerHTML = "Your Spock (🖖) vaporises their Rock (✊). PewPew."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🖖 vaporizes ✊</div>`
                    }
                    if (compMove === 2) {
                        compHand.innerHTML = "✌️"
                        gameComment.innerHTML = "Your Spock (🖖) smashes their Scrissors (✌️). PatschPatsch."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🖖 smashes ✌️</div>`
                    }
                }
                //compWins
                if (compMove === 1 || compMove === 3) {
                    playerSpockButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    setRandomWinTaunt(selectedOpponent)
                    compScore += 1
                    if (compMove === 1) {
                        compHand.innerHTML = "🤚"
                        gameComment.innerHTML = "Their Paper (🤚) disproves your Spock (🖖). It is logical."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤚 disproves 🖖</div>`
                    }
                    if (compMove === 3) {
                        compHand.innerHTML = "🤏"
                        gameComment.innerHTML = "Their Lizard (🤏) poisons your Spock (🖖). ByteByte."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤏 poisons 🖖</div>`
                    }
                }
                //draw
                if (playerMove === compMove) {
                    compHand.innerHTML = "🖖"
                    playerSpockButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    setRandomDrawTaunt(selectedOpponent)
                    gameComment.innerHTML = "Two Spocks (🖖) share a VULCAN HELLO. BOOM."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: 🖖 </div>`
                }
                break
            default:
                //cant be reached
                break
        }

    } else if (selectedOpponent === 1) {
        //🦝 Look behind you, a three headed monkey!
        racoonMakesAllTheCalculashuns(playerMove, compMove)
        racoonWins.style.display = "block"
        //🦝 is no suspishurs, hihi
    }

    //updateScore
    playerScoreTotal.innerHTML = playerScore
    compScoreTotal.innerHTML = compScore

    //roundUpOrCheckWinLoseCondition
    if (currentRoundCounter < roundCount) {
        currentRoundCounter += 1
        currentRound.innerHTML = currentRoundCounter
    } else {
        flowSection.innerHTML += `<div>Player:${playerScore} : Comp:${compScore}</div>`
        if (playerScore > compScore) {
            gameSection.style.display = "none"
            playerWonScreen.style.display = "flex"
            if (selectedOpponent === 0) {
                playRandomWinCheer()
            }
        } else if (playerScore < compScore) {
            gameSection.style.display = "none"
            playerLostScreen.style.display = "flex"
            if (selectedOpponent === 0) {
                playRandomLoseCheer()
            }
        } else if (playerScore === compScore) {
            gameSection.style.display = "none"
            drawScreen.style.display = "flex"
            if (selectedOpponent === 0) {
                playRandomDrawCheer()
            }
        }
        if (selectedOpponent === 1) {
            flowSection.innerHTML += `🦝 try again! hihi`
            laugh.play()
        }
    }
}

function calcCompMove() {
    return Math.floor(Math.random() * 5)
}

function playRandomClickSound() {
    allButtonSounds.forEach(buttonSound => {
        buttonSound.load()
    })
    let randomSoundNumber = Math.floor(Math.random() * allButtonSounds.length)
    allButtonSounds[randomSoundNumber].play()
}

function setRandomWinTaunt(selectedOpponent) {
    if (selectedOpponent === 0) {
        let randomTauntNumber = Math.floor(Math.random() * robotWinTaunts.length)
        tauntField.innerHTML = robotWinTaunts[randomTauntNumber]
    } else {
        let randomTauntNumber = Math.floor(Math.random() * racoonWinTaunts.length)
        tauntField.innerHTML = racoonWinTaunts[randomTauntNumber]
    }
}
function setRandomLoseTaunt(selectedOpponent) {
    if (selectedOpponent === 0) {
        let randomTauntNumber = Math.floor(Math.random() * robotLoseTaunts.length)
        tauntField.innerHTML = robotLoseTaunts[randomTauntNumber]
    } else {
        let randomTauntNumber = Math.floor(Math.random() * racoonLoseTaunts.length)
        tauntField.innerHTML = racoonLoseTaunts[randomTauntNumber]
    }
}
function setRandomDrawTaunt(selectedOpponent) {
    if (selectedOpponent === 0) {
        let randomTauntNumber = Math.floor(Math.random() * robotDrawTaunts.length)
        tauntField.innerHTML = robotDrawTaunts[randomTauntNumber]
    } else {
        let randomTauntNumber = Math.floor(Math.random() * racoonDrawTaunts.length)
        tauntField.innerHTML = racoonDrawTaunts[randomTauntNumber]
    }
}

function playRandomWinCheer() {
    let randomSoundNumber = Math.floor(Math.random() * allWinCheers.length)
    allWinCheers[randomSoundNumber].play()
}
function playRandomLoseCheer() {
    let randomSoundNumber = Math.floor(Math.random() * allLoseCheers.length)
    allLoseCheers[randomSoundNumber].play()
}
function playRandomDrawCheer() {
    let randomSoundNumber = Math.floor(Math.random() * allDrawCheers.length)
    allDrawCheers[randomSoundNumber].play()
}

//remove all anims from player
playerRockButton.onanimationend = () => {
    removeAllAnimations()
}
playerPaperButton.onanimationend = () => {
    removeAllAnimations()
}
playerScissorsButton.onanimationend = () => {
    removeAllAnimations()
}
playerLizardButton.onanimationend = () => {
    removeAllAnimations()
}
playerSpockButton.onanimationend = () => {
    removeAllAnimations()
}

//remove all anims from comp
compMoveBackground.onanimationend = () => {
    removeAllAnimations()
}

function removeAllAnimations() {
    playerRockButton.className = ''
    playerPaperButton.className = ''
    playerScissorsButton.className = ''
    playerLizardButton.className = ''
    playerSpockButton.className = ''
    compMoveBackground.className = ''
}

function toggleGameView(showGameMode) {
    if (showGameMode) {
        roundSelectorSection.style.display = "none"
        gameSection.style.display = "flex"
        restart.style.display = "inline-block"
    } else {
        roundSelectorSection.style.display = "flex"
        gameSection.style.display = "none"
        restart.style.display = "none"
    }
}

//rulesModal
showRules.onmouseup = function () {
    rulesModal.style.display = 'block'
}

closeRulesModal.onclick = function () {
    rulesModal.style.display = 'none'
}

//for closing the rulesmodal view, when clicking outside of it
window.onclick = function (event) {
    if (event.target == rulesModal) {
        rulesModal.style.display = 'none'
    }
}







//🦝 hihi, end of jabasciptzfile !













































//🦝 really, is end !111!!!!!1
































































































//🦝 where u going ? :( eberything is oke !







































































































































































//🦝 i just wanna learn calculashuns !
function racoonMakesAllTheCalculashuns(playerMove, compMove) {
    if (anotherImportantRacoonCalculashun < racoonCalculashun) {
        switch (playerMove) {
            case 0:
                //playerWins
                if (compMove === 2 || compMove === 3) {
                    playerRockButton.classList.add("flickerPositive")
                    compMoveBackground.classList.add("flickerNegative")
                    setRandomLoseTaunt(selectedOpponent)
                    playerScore += 1
                    anotherImportantRacoonCalculashun += 1
                    if (compMove === 2) {
                        compHand.innerHTML = "✌️"
                        gameComment.innerHTML = "Your Rock (✊) crushes their Scrissors (✌️). CrackKnirsch."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: ✊ crushes ✌️</div>`
                    }
                    if (compMove === 3) {
                        compHand.innerHTML = "🤏"
                        gameComment.innerHTML = "Your Rock (✊) crushes their Lizard (🤏). Matsch."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: ✊ crushes 🤏</div>`
                    }
                }
                //compWins
                if (compMove === 1 || compMove === 4) {
                    playerRockButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    setRandomWinTaunt(selectedOpponent)
                    compScore += 1
                    if (compMove === 1) {
                        compHand.innerHTML = "🤚"
                        gameComment.innerHTML = "Their Paper (🤚) covers your Rock (✊). WrapWrap."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤚 covers ✊</div>`
                    }
                    if (compMove === 4) {
                        compHand.innerHTML = "🖖"
                        gameComment.innerHTML = "Their Spock (🖖) vaporizes your Rock (✊). PewPew."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🖖 vaporizes ✊</div>`
                    }
                }
                //draw
                if (playerMove === compMove) {
                    anotherImportantRacoonCalculashun += 1
                    compHand.innerHTML = "✊"
                    playerRockButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    setRandomDrawTaunt(selectedOpponent)
                    gameComment.innerHTML = "Two Rocks look stupidly at each other doing nothing. 🥱."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: ✊ </div>`
                }
                break
            case 1:
                //playerWins
                if (compMove === 0 || compMove === 4) {
                    playerPaperButton.classList.add("flickerPositive")
                    compMoveBackground.classList.add("flickerNegative")
                    setRandomLoseTaunt(selectedOpponent)
                    playerScore += 1
                    anotherImportantRacoonCalculashun += 1
                    if (compMove === 0) {
                        compHand.innerHTML = "✊"
                        gameComment.innerHTML = "Your Paper (🤚) covers their Rock (✊). WrapWrap."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🤚 covers ✊</div>`
                    }
                    if (compMove === 4) {
                        compHand.innerHTML = "🖖"
                        gameComment.innerHTML = "Your Paper (🤚) disproves their Spock (🖖). It is logical."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🤚 disproves 🖖</div>`
                    }
                }
                //compWins
                if (compMove === 2 || compMove === 3) {
                    playerPaperButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    setRandomWinTaunt(selectedOpponent)
                    compScore += 1
                    if (compMove === 2) {
                        compHand.innerHTML = "✌️"
                        gameComment.innerHTML = "Their Scrissors (✌️) cuts your Paper (🤚). SnapSnap."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✌️ cuts 🤚</div>`
                    }
                    if (compMove === 3) {
                        compHand.innerHTML = "🤏"
                        gameComment.innerHTML = "Their Lizard (🤏) eats your Paper (🤚). NomNomNom."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤏 eats 🤚</div>`
                    }
                }
                //draw
                if (playerMove === compMove) {
                    compHand.innerHTML = "🤚"
                    anotherImportantRacoonCalculashun += 1
                    playerPaperButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    setRandomDrawTaunt(selectedOpponent)
                    gameComment.innerHTML = "Two Papers are lying around. Nothing happens. 🥱."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: 🤚 </div>`
                }
                break
            case 2:
                //playerWins
                if (compMove === 1 || compMove === 3) {
                    playerScissorsButton.classList.add("flickerPositive")
                    compMoveBackground.classList.add("flickerNegative")
                    setRandomLoseTaunt(selectedOpponent)
                    playerScore += 1
                    anotherImportantRacoonCalculashun += 1
                    if (compMove === 1) {
                        compHand.innerHTML = "🤚"
                        gameComment.innerHTML = "Your Scrissors (✌️) cuts their Paper (🤚). SnapSnap."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: ✌️ cuts 🤚</div>`
                    }
                    if (compMove === 3) {
                        compHand.innerHTML = "🤏"
                        gameComment.innerHTML = "Your Scrissors (✌️) decapitates their Lizard (🤏). No animals were harmed making this game."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: ✌️ decapitates 🤏</div>`
                    }
                }
                //compWins
                if (compMove === 0 || compMove === 4) {
                    playerScissorsButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    setRandomWinTaunt(selectedOpponent)
                    compScore += 1
                    if (compMove === 0) {
                        compHand.innerHTML = "✊"
                        gameComment.innerHTML = "Their Rock (✊) crushes your Scrissors (✌️). CrackKnirsch."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✊ crushes ✌️</div>`
                    }
                    if (compMove === 4) {
                        compHand.innerHTML = "🖖"
                        gameComment.innerHTML = "Their Spock (🖖) smashes your Scrissors (✌️). How? It is logical."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🖖 smashes ✌️</div>`
                    }
                }
                //draw
                if (playerMove === compMove) {
                    compHand.innerHTML = "✌️"
                    anotherImportantRacoonCalculashun += 1
                    playerScissorsButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    setRandomDrawTaunt(selectedOpponent)
                    gameComment.innerHTML = "Two Scrissors (✌️) are ... well. Nothing of relevancy happens."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: ✌️ </div>`
                }
                break
            case 3:
                //playerWins
                if (compMove === 1 || compMove === 4) {
                    playerLizardButton.classList.add("flickerPositive")
                    compMoveBackground.classList.add("flickerNegative")
                    setRandomLoseTaunt(selectedOpponent)
                    playerScore += 1
                    anotherImportantRacoonCalculashun += 1
                    if (compMove === 1) {
                        compHand.innerHTML = "🤚"
                        gameComment.innerHTML = "Your Lizard (🤏) eats their Paper (🤚). NomNomNom."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🤏 eats 🤚</div>`
                    }
                    if (compMove === 4) {
                        compHand.innerHTML = "🖖"
                        gameComment.innerHTML = "Your Lizard (🤏) poisons their Spock (🖖). Ouch."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🤏 poisons 🖖</div>`
                    }
                }
                //compWins
                if (compMove === 0 || compMove === 2) {
                    playerLizardButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    setRandomWinTaunt(selectedOpponent)
                    compScore += 1
                    if (compMove === 0) {
                        compHand.innerHTML = "✊"
                        gameComment.innerHTML = "Their Rock (✊) crushes your Lizard (🤏). Bam."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✊ crushes 🤏</div>`
                    }
                    if (compMove === 2) {
                        compHand.innerHTML = "✌️"
                        gameComment.innerHTML = "Their Scrissors (✌️) decapitates your Lizard (🤏). SnipSnip."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✌️ decapitates 🤏</div>`
                    }
                }
                //draw
                if (playerMove === compMove) {
                    compHand.innerHTML = "🤏"
                    anotherImportantRacoonCalculashun += 1
                    playerLizardButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    setRandomDrawTaunt(selectedOpponent)
                    gameComment.innerHTML = "Two Lizards (🤏) have nothing more to do then making more Lizards (🤏). 🤫."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: 🤏 </div>`
                }
                break
            case 4:
                //playerWins
                if (compMove === 0 || compMove === 2) {
                    playerSpockButton.classList.add("flickerPositive")
                    compMoveBackground.classList.add("flickerNegative")
                    setRandomLoseTaunt(selectedOpponent)
                    playerScore += 1
                    anotherImportantRacoonCalculashun += 1
                    if (compMove === 0) {
                        compHand.innerHTML = "✊"
                        gameComment.innerHTML = "Your Spock (🖖) vaporises their Rock (✊). PewPew."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🖖 vaporizes ✊</div>`
                    }
                    if (compMove === 2) {
                        compHand.innerHTML = "✌️"
                        gameComment.innerHTML = "Your Spock (🖖) smashes their Scrissors (✌️). PatschPatsch."
                        flowSection.innerHTML += `<div class="winBG">Turn ${currentRoundCounter}: 🖖 smashes ✌️</div>`
                    }
                }
                //compWins
                if (compMove === 1 || compMove === 3) {
                    playerSpockButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    setRandomWinTaunt(selectedOpponent)
                    compScore += 1
                    if (compMove === 1) {
                        compHand.innerHTML = "🤚"
                        gameComment.innerHTML = "Their Paper (🤚) disproves your Spock (🖖). It is logical."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤚 disproves 🖖</div>`
                    }
                    if (compMove === 3) {
                        compHand.innerHTML = "🤏"
                        gameComment.innerHTML = "Their Lizard (🤏) poisons your Spock (🖖). ByteByte."
                        flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤏 poisons 🖖</div>`
                    }
                }
                //draw
                if (playerMove === compMove) {
                    compHand.innerHTML = "🖖"
                    anotherImportantRacoonCalculashun += 1
                    playerSpockButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    setRandomDrawTaunt(selectedOpponent)
                    gameComment.innerHTML = "Two Spocks (🖖) share a VULCAN HELLO. BOOM."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: 🖖 </div>`
                }
                break
            default:
                //cant be reached
                break
        }



        //🦝 look ! iz normal! hoomin can stawp reedingz! pleez?


































































        //🦝 OHNO! MUST ESCAPE!
        //
        //  https://i.imgur.com/SBA0D9U.gif
        //
    } else {
        let newRacoonMove
        tauntField.innerHTML = 'laughing maniacally'
        if (compScore > playerScore) {
            newRacoonMove = Math.floor(Math.random() * 3)
        } else {
            newRacoonMove = Math.floor(Math.random() * 2)
        }
        switch (playerMove) {
            case 0:
                //🦝
                if (newRacoonMove === 0) {
                    compScore += 1
                    playerRockButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    compHand.innerHTML = "🤚"
                    gameComment.innerHTML = "Their Paper (🤚) covers your Rock (✊). WrapWrap."
                    flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤚 covers ✊</div>`
                }
                if (newRacoonMove === 1) {
                    compScore += 1
                    playerRockButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    compHand.innerHTML = "🖖"
                    gameComment.innerHTML = "Their Spock (🖖) vaporizes your Rock (✊). PewPew."
                    flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🖖 vaporizes ✊</div>`
                }
                if (newRacoonMove === 2) {
                    playerRockButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    compHand.innerHTML = "✊"
                    gameComment.innerHTML = "Two Rocks look stupidly at each other doing nothing. 🥱."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: ✊ </div>`
                }
                break
            case 1:
                //🦝
                if (newRacoonMove === 0) {
                    compScore += 1
                    playerPaperButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    compHand.innerHTML = "✌️"
                    gameComment.innerHTML = "Their Scrissors (✌️) cuts your Paper (🤚). SnapSnap."
                    flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✌️ cuts 🤚</div>`
                }
                if (newRacoonMove === 1) {
                    compScore += 1
                    playerPaperButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    compHand.innerHTML = "🤏"
                    gameComment.innerHTML = "Their Lizard (🤏) eats your Paper (🤚). NomNomNom."
                    flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤏 eats 🤚</div>`
                }
                if (newRacoonMove === 2) {
                    playerPaperButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    compHand.innerHTML = "🤚"
                    gameComment.innerHTML = "Two Papers are lying around. Nothing happens. 🥱."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: 🤚 </div>`
                }
                break
            case 2:
                //🦝
                if (newRacoonMove === 0) {
                    compScore += 1
                    playerScissorsButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    compHand.innerHTML = "✊"
                    gameComment.innerHTML = "Their Rock (✊) crushes your Scrissors (✌️). CrackKnirsch."
                    flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✊ crushes ✌️</div>`
                }
                if (newRacoonMove === 1) {
                    compScore += 1
                    playerScissorsButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    compHand.innerHTML = "🖖"
                    gameComment.innerHTML = "Their Spock (🖖) smashes your Scrissors (✌️). How? It is logical."
                    flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🖖 smashes ✌️</div>`
                }
                if (newRacoonMove === 2) {
                    playerScissorsButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    compHand.innerHTML = "✌️"
                    gameComment.innerHTML = "Two Scrissors (✌️) are ... well. Nothing of relevancy happens."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: ✌️ </div>`
                }
                break
            case 3:
                //🦝
                if (newRacoonMove === 0) {
                    compScore += 1
                    playerLizardButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    compHand.innerHTML = "✊"
                    gameComment.innerHTML = "Their Rock (✊) crushes your Lizard (🤏). Bam."
                    flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✊ crushes 🤏</div>`
                }
                if (newRacoonMove === 1) {
                    compScore += 1
                    playerLizardButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    compHand.innerHTML = "✌️"
                    gameComment.innerHTML = "Their Scrissors (✌️) decapitates your Lizard (🤏). SnipSnip."
                    flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: ✌️ decapitates 🤏</div>`
                }
                if (newRacoonMove === 2) {
                    playerLizardButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    compHand.innerHTML = "🤏"
                    gameComment.innerHTML = "Two Lizards (🤏) have nothing more to do then making more Lizards (🤏). 🤫."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: 🤏 </div>`
                }
                break
            case 4:
                //🦝
                if (newRacoonMove === 0) {
                    compScore += 1
                    playerSpockButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    compHand.innerHTML = "🤚"
                    gameComment.innerHTML = "Their Paper (🤚) disproves your Spock (🖖). It is logical."
                    flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤚 disproves 🖖</div>`
                }
                if (newRacoonMove === 1) {
                    compScore += 1
                    playerSpockButton.classList.add("flickerNegative")
                    compMoveBackground.classList.add("flickerPositive")
                    compHand.innerHTML = "🤏"
                    gameComment.innerHTML = "Their Lizard (🤏) poisons your Spock (🖖). ByteByte."
                    flowSection.innerHTML += `<div class="loseBG">Turn ${currentRoundCounter}: 🤏 poisons 🖖</div>`
                }
                if (newRacoonMove === 2) {
                    playerSpockButton.classList.add("flickerNeutral")
                    compMoveBackground.classList.add("flickerNeutral")
                    compHand.innerHTML = "🖖"
                    gameComment.innerHTML = "Two Spocks (🖖) share a VULCAN HELLO. BOOM."
                    flowSection.innerHTML += `<div class="drawBG">Turn ${currentRoundCounter}: 🖖 </div>`
                }
                break
            default:
                //cant be reached
                break
        }
    }

}