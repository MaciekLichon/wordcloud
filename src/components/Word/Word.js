import styles from './Word.module.scss';
import clsx from 'clsx';
import { useState, useCallback, useEffect } from 'react';


const Word = props => {

  /* RANDOM MARGIN GENERATOR - START ("wordcloud") */
  const [margin, setMargin] = useState();

  const updateMargin = useCallback(() => {
    setMargin(`${Math.floor(Math.random() * (50 - 20) + 20)}px`);
  }, [])

  useEffect(() => {
    updateMargin();
  }, [])
  /* RANDOM MARGIN GENERATOR - END */

  const [selected, setSelected] = useState(false);

  const toggleSelected = e => {
    e.preventDefault();

    if (selected) {
      setSelected(false);
      props.removeSelected(props.children);
    } else {
      setSelected(true);
      props.addSelected(props.children);
    }
  }

  // combined conditions
  const goodWordSelected = selected && !props.selecting && props.isGoodWord;
  const badWordSelected = selected && !props.selecting && !props.isGoodWord;

  return (
    <button
      style={{marginLeft: margin}}
      className={clsx(
        styles.word,
        !props.selecting && styles.disabled,
        selected && styles.selected,
        goodWordSelected && styles.good,
        badWordSelected && styles.bad
      )}
      onClick={toggleSelected}
    >
      {props.children}
    </button>
  );
};

export default Word;
