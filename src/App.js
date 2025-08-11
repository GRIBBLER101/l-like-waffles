import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [bin, setBin] = useState(0);
  const [din, setDin] = useState(1);
  const [wfcount, setWfcount] = useState(0);
  const [wfplant, setWfplant] = useState(0);
  const [mg, setMg] = useState(0);
  const [cbcm, setCbcm] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false); // NEW STATE

  // Load from localStorage on first mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('gameData'));
    if (savedData) {
      setCount(savedData.count ?? 0);
      setBin(savedData.bin ?? 0);
      setDin(savedData.din ?? 1);
      setWfcount(savedData.wfcount ?? 0);
      setWfplant(savedData.wfplant ?? 0);
      setMg(savedData.mg ?? 0);
      setCbcm(savedData.cbcm ?? 0);
    }
    setHasLoaded(true); // mark load complete
  }, []);

  // Only save to localStorage if the data has loaded at least once
  useEffect(() => {
    if (!hasLoaded) return;

    const gameData = {
      count,
      bin,
      din,
      wfcount,
      wfplant,
      mg,
      cbcm,
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
  }, [count, bin, din, wfcount, wfplant, mg, cbcm, hasLoaded]);

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
      if (cbcm > 0){
        setCount(prev => prev + (cbcm * 4));
      }
    }, 1000);

    return () => clearInterval(coinInterval);
  }, [mg, cbcm]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("pre func", wfcount);
      updateWaffles(wfcount); // pass current value
    }, 1000);

    return () => clearInterval(interval);
  }, [wfcount]);

  useEffect(() => {
    const waffleInterval = setInterval(() => {
      if (wfplant > 0) {
        setWfcount(prev => prev + (wfplant*9));
      }
    }, 1000);

    return () => clearInterval(waffleInterval);
  }, [wfplant]);
  const name = "name";
  const email = "emal";
  const updateUser = async () => {
    try {
      const response = await axios.put("http://localhost:5000/", {
        name,
        email,
      });
      console.log("Updated data:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const updateWaffles = async (value) => {
    try {
      console.log(value);
      await axios.put("http://localhost:5000/waffles", { wfcount: value });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>I LOVE WAFFLES</h1>
      <button onClick={updateUser}>Update</button>
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
        <div>
          <button className='nmn'onClick={() => {
            localStorage.removeItem('gameData');
            window.location.reload();
          }}>Reset Game</button>
        </div>
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
          ) : (<button className='upgrade1broke'>Money Granny LOSER (50waffles,1coin/sec)</button>)}
          {wfcount >= 150 ? (<button className='upgrade1' onClick={() => {
            setCbcm(cbcm + 1);
            setWfcount(wfcount - 150);
          }}>CRAPY BITCOINMINER 150WAFFLES/4cps</button>) : (
           <button className='upgrade1broke' >CRAPY BITCOINMINER BROKE 150WAFFLES/4cps</button>
          )}
          
      </div>
      
    </div>
  );
}

export default App;
