import styles from './Home.module.scss';
import Button from '../Button/Button';

import { useState } from 'react';


const Home = ({ setUser }) => {

  const [userName, setUserName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (userName.length !== 0) {
      setUser(userName);
    }
    else { // left it just in case as the 'required' property is used in input tag too
      console.log('error');
    }
  };

  return (
    <form className={styles.home} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Wordcloud game</h1>
      <input className={styles.input} value={userName} onChange={e => setUserName(e.target.value)} required type="text" placeholder="Enter your nickname here..."></input>
      <Button>Play</Button>
    </form>
  );
};

export default Home;
