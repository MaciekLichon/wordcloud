import Container from './components/Container/Container';
import Game from './components/Game/Game';
import Home from './components/Home/Home';
import Result from './components/Result/Result';

import { useState } from 'react';

const App = () => {

  const [user, setUser] = useState();
  const [score, setScore] = useState();

  return (
    <Container>
      { !user && <Home setUser={setUser} /> }
      { (user && !score) && <Game setScore={setScore} /> }
      { (user && score) && <Result user={user} score={score} setScore={setScore} /> }
    </Container>
  );
};

export default App;
