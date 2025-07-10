import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [bin, setBin] = useState(0);

  function bigred(e) {
    e.preventDefault();
    setCount(count + 1);
    setBin(bin + 1); // increment bin on every click
  }

  function smallred(e){
    e.preventDefault();
    setBin(bin + 1);
    if(count > 0){
      setCount(count - 1);
    }
  }

  return (
    <div className="App">
      <h1>I LOVE CLICKING</h1>
      <div className='billy'>
        {bin % 2 === 0 ?(
          <p className='L'>
            {count}
          </p>
        ) : (
          <p className='K'>
            {count}
          </p>
        )}
      
        {bin % 2 === 0 ? (
          <button onClick={bigred} className='r_gilly'>+</button>
        ) : (
          <button onClick={bigred} className='gilly'>+</button>
        )}
        {bin % 2 === 0 ? (
          <button onClick={smallred} className='r_gilly'>-</button>
        ) : (
          <button onClick={smallred} className='gilly'>-</button>
        )}
        
      </div>
    </div>
  );
}

export default App;
