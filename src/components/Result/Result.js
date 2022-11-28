import styles from './Result.module.scss';
import Button from '../Button/Button';

const Result = ({ user, score, setScore }) => {
  return (
    <div className={styles.result}>
      <h2 className={styles.message}>
        Hi {user}!
        <br/>
        Your score:
        <br/>
        <span className={styles.score}>{score} points</span>
      </h2>
      <Button action={() => setScore(null)}>Play again</Button>
    </div>
  );
};

export default Result;
