import styles from './Game.module.scss';
import Button from '../Button/Button';
import Word from '../Word/Word';

import { useState, useEffect } from 'react';

const Game = ({ setScore }) => {

  const [questionData, setQuestionData] = useState(); // fetched question data
  const [selectedWords, setSelectedWords] = useState([]); // array of words selected by the user
  const [selecting, setSelecting] = useState(true); // game status - true: selection allowed, false: answers checked, selection not allowed

  useEffect(() => {
    fetch('http://localhost:8000/api/questions/random')
      .then(res => res.json())
      .then(data => {
        setQuestionData(data)
      })
  }, []);

  /* words selection handlers */
  const addSelected = word => {
    setSelectedWords([...selectedWords, word]);
  };
  const removeSelected = word => {
    setSelectedWords(selectedWords.filter(selected => selected !== word));
  };

  /* check answers */
  const checkAnswers = () => {
    setSelecting(false);
  }

  /* calculate score */
  const updateScore = () => {
    let correctSelections = 0;
    let incorrectSelections = 0;
    let additionalDeduction = 0;
    let score = 0;

    // check how many words were selected correctly and incorrectly
    for (let word of selectedWords) {
      if (questionData.good_words.includes(word)) {
        correctSelections += 1;
      } else {
        incorrectSelections += 1;
      }
    }
    // check how many correct words were missed
    for (let goodWord of questionData.good_words) {
      if (!selectedWords.includes(goodWord)) {
        additionalDeduction += 1;
      }
    }

    score = correctSelections * 2 - incorrectSelections - additionalDeduction;
    setScore(score);
  }

  if (questionData) return (
    <div className={styles.game}>
      <h2 className={styles.question}>{questionData.question}</h2>
      <div className={styles.board}>
        {questionData.all_words.map(word => (
          <Word
            key={word}
            addSelected={addSelected}
            removeSelected={removeSelected}
            isGoodWord={questionData.good_words.includes(word)}
            selecting={selecting}
          >
          {word}
          </Word>
        ))}
      </div>
      { selecting && <Button action={checkAnswers}>Check answers</Button> }
      { !selecting && <Button action={updateScore}>Finish game</Button> }
    </div>
  );
};

export default Game;
