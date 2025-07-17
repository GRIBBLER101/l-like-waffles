import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [bin, setBin] = useState(0);
  const [din, setDin] = useState(1);
  const [wfcount, setWfcount] = useState(0);
  const [wfplant, setWfplant] = useState(0);
  const [mg, setMg] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('waffleSave'));
    if (savedData) {
      setCount(savedData.count || 0);
      setBin(savedData.bin || 0);
      setDin(savedData.din || 1);
      setWfcount(savedData.wfcount || 0);
      setWfplant(savedData.wfplant || 0);
      setMg(savedData.mg || 0);
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      count,
      bin,
      din,
      wfcount,
      wfplant,
      mg,
    };
    localStorage.setItem('waffleSave', JSON.stringify(dataToSave));
  }, [count, bin, din, wfcount, wfplant, mg]);

  function bigred(e) {
    e.preventDefault();
    setCount(count + din);
    setBin(bin + 1); // increment bin on every click
  }

  function smallred(e){
    e.preventDefault();
    setBin(bin + 1);
    if(count > 0){
      setCount(count - 1);
    }
  }

  useEffect(() => {
    const coinInterval = setInterval(() => {
      if (mg > 0) {
        setCount(prev => prev + mg);
      }
    }, 1000);

    return () => clearInterval(coinInterval);
  }, [mg]);

  useEffect(() => {
    const waffleInterval = setInterval(() => {
      if (wfplant > 0) {
        setWfcount(prev => prev + wfplant);
      }
    }, 1000);

    return () => clearInterval(waffleInterval);
  }, [wfplant]);

  return (
    <div className="App">
      <h1>I LOVE WAFFLES</h1>

      <div className='billy'>
        <img src='https://pngimg.com/uploads/coin/coin_PNG36910.png' alt='gimme your waffles'width="200"></img>
        {bin % 2 === 0 ?(
          <p className='L'>
            {count} :coins
          </p>
        ) : (
          <p className='K'>
            {count} :coins
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
      <div className='dfd'><p>{wfcount}: WAFFLES</p></div>
        
      </div>
      <div className='buy'>
          <h1>Purchase with coins</h1>
          <div>
          {count >= 70 ? (
              <button
                className='upgrade1'
                onClick={() => {
                  setDin(din + 1);
                  setCount(count - 70);
                }}
              >
                +1 coin a click(70coin)
              </button>
          ) : (
            <button className='upgrade1broke'>
              <p>+1 coin a click =70coin</p>
              <p>YOUR TOO BROKE</p>
            </button>
          )}
          {count >= 100 ? (
          <button className='upgrade1'onClick={() => {
              setWfplant(wfplant + 1);
              setCount(count - 100)
            }}>WAFFLES plant (100coin,1waffles/sec)</button>
          ) : (<button className='upgrade1broke'>WAFFLES plant broke ahhh (100coin,1waffles/sec)</button>)}
        </div>

      </div>
      <div className='buy2'>
          <h1>Purchase with WAFFLES</h1>
          {wfcount >= 50 ? (
          <button className='upgrade1'onClick={() => {
            setMg(mg + 1);
            setWfcount(wfcount - 50);
          }}>Money Granny(50waffles,1coin/sec)</button>
          ) : (<button className='upgrade1broke'>Money Granny
                                                    LOSER (50waffles,1coin/sec)</button>)}
      </div>
    </div>
  );
}

export default App;
