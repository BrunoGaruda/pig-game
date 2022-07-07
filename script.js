'use strict'

// Constantes dos elementos
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// Condições criadas fora do escopo da função init, e reatribuidas na função init

let scores, currentScore, activePlayer, playing

const init = function () {
  scores = [0, 0]
  currentScore = 0
  activePlayer = 0
  // Criada a variável para finalizar o jogo
  playing = true

  score0El.textContent = 0
  score1El.textContent = 0
  current0El.textContent = 0
  current1El.textContent = 0

  diceEl.classList.add('hidden')
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')

  // document.getElementById(`name--${activePlayer}`).textContent = `Player ${
  //   activePlayer + 1
  // }`
  document.getElementById(`name--0`).textContent = 'Player 1'
  document.getElementById(`name--1`).textContent = 'Player 2'
}
// Função init será executada ao iniciar a página
init()

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0

  // Toggle irá checar se a classe estará la, caso contrário ele removerá
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}

// Lógica da rolagem do dado
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1
    console.log(dice)

    // 2. Mostrando o dado na tela
    diceEl.classList.remove('hidden')
    diceEl.src = `assets/dice-${dice}.png` // Hack para alterar o texto

    // 3. Checando caso role 1 no dado
    if (dice !== 1) {
      currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore
    } else {
      // Trocar para o próximo jogador
      switchPlayer()
    }
  }
})

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Adicionando o score atual ao active player sccore
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]

    // 2. Checar se o score é >= 100
    if (scores[activePlayer] >= 100) {
      playing = false
      // Removendo o dado da tela ao finalizar o game
      diceEl.classList.add('hidden')

      document.getElementById(`name--${activePlayer}`).textContent = `P${
        activePlayer + 1
      } Winner 🎉`

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active')
    } else {
      // 3. Trocar para o próximo jogador
      switchPlayer()
    }
  }
})

btnNew.addEventListener('click', init)
