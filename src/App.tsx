import React, { useState, useEffect } from 'react'
import step_0 from '/src/images/step_0.svg'
import step_1 from '/src/images/step_1.svg'
import step_2 from '/src/images/step_2.svg'
import step_3 from '/src/images/step_3.svg'
import step_4 from '/src/images/step_4.svg'
import step_5 from '/src/images/step_5.svg'
import step_6 from '/src/images/step_6.svg'
import step_7 from '/src/images/step_7.svg'
import image from './icons/header/dai5.svg'

export function App() {
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]

  const [secretWord, setSecretWord] = useState('')
  const [currentWord, setCurrentWord] = useState('_______')
  const [guessedLetters, setGuessedLetters] = useState([''])
  const [playerScore, setPlayerScore] = useState(0)

  useEffect(() => {
    handleNewGame()
  }, [])

  async function handleNewGame() {
    setGuessedLetters([])
    setPlayerScore(0)
    const response = await fetch(
      'https://sdg-words.herokuapp.com/api/words/random'
    )

    if (response.ok) {
      const randomWord = await response.json()
      setSecretWord(randomWord)
      setCurrentWord('_______')
    }
  }

  function clickOnLetter(letter: string) {
    setGuessedLetters([...guessedLetters, letter])

    if (secretWord.includes(letter)) {
      let newCurrentWord = ''
      for (let i = 0; i < secretWord.length; i++) {
        secretWord[i] === letter
          ? (newCurrentWord = newCurrentWord.concat(letter))
          : (newCurrentWord = newCurrentWord.concat(currentWord[i]))
      }
      setCurrentWord(newCurrentWord)
    } else {
      setPlayerScore(playerScore + 1)
    }
  }

  function getSnowmanPicture() {
    switch (playerScore) {
      case 0:
        return step_0
      case 1:
        return step_1
      case 2:
        return step_2
      case 3:
        return step_3
      case 4:
        return step_4
      case 5:
        return step_5
      case 6:
        return step_6
      case 7:
        return step_7
    }
  }

  return (
    <div>
      <header>
        <img src={image} className="logo" aria-hidden="true" alt="Dom Logo" />

        <div className="header-text">
          <h1>Don&apos;t Build the Snowman!</h1>
        </div>

        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon
            className="svg--sm"
            fill="white"
            points="0,0 30,100 65,21 90,100 100,75 100,100 0,100"
          />
          <polygon
            className="svg--lg"
            fill="white"
            points="0,0 15,100 33,21 45,100 50,75 55,100 72,20 85,100 95,50 100,80 100,100 0,100"
          />
        </svg>
      </header>
      <section>
        <div className="section-picture">
          <img src={getSnowmanPicture()} />
        </div>
      </section>
      <footer>
        <p className="current-word">{currentWord}</p>

        <div>
          {alphabet.map((letter) => {
            return (
              <button
                key={letter}
                onClick={function () {
                  clickOnLetter(letter)
                }}
                disabled={
                  guessedLetters.includes(letter) ||
                  secretWord === currentWord ||
                  playerScore === 7
                }
                className="letter-button"
              >
                {letter}
              </button>
            )
          })}
          <p className="guess-letters">
            Your guessed letters are: {guessedLetters}
          </p>
        </div>
        <button onClick={handleNewGame} className="reset-button">
          <p>New Word!</p>
          <svg height="45" width="145">
            <rect height="45" width="145" />
          </svg>
        </button>
      </footer>
    </div>
  )
}
