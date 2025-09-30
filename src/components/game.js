import '../App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

function Game () {
  const [count, setCount] = useState(0);
  const [bin, setBin] = useState(0);
  const [din, setDin] = useState(1);
  const [wfcount, setWfcount] = useState(0);
  const [wfplant, setWfplant] = useState(0);
  const [mg, setMg] = useState(0);
  const [cbcm, setCbcm] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false); // NEW STATE
  const [wf, setWf] = useState(0);

  const url = "https://waffles-backend-666679246883.us-central1.run.app"

  // Load from localStorage on first mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('gameData'));
    if (savedData) {
      setCount(savedData.count ?? 0);
      setBin(savedData.bin ?? 0);
      setDin(savedData.din ?? 1);
      setWfcount(savedData.wfcount ?? 0);
      setWfplant(savedData.wfplant ?? 0);
      setWf(savedData.wf ?? 0);
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
      wf,
      mg,
      cbcm,
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
  }, [count, bin, din, wfcount, wfplant, wf, mg, cbcm, hasLoaded]);

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
    const interval = setInterval(() => {
      console.log("pre func", count);
      updatecoins(count); // pass current value
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    const waffleInterval = setInterval(() => {
      if (wfplant > 0) {
        setWfcount(prev => prev + (wfplant * 1));
      }
      if (wf > 0) {
        setWf(prev => prev + (wf * 10));
      }
    }, 1000);

    return () => clearInterval(waffleInterval);
  }, [wfplant, wf]);

  const name = "name";
  const email = "emal";
  const updateUser = async () => {
    try {
      const response = await axios.put(`${url}/`, {
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
      await axios.put(`${url}/waffles`, { wf1count: value });
    } catch (err) {
      console.error(err);
    }
  };
  const getwf = async () => {
    try {
        const waffle = await axios.get(`${url}/waffles`);
        return waffle.data; // You likely want the .data property from the Axios response
    } catch (err) {
        console.error(err);
    }
};

(async () => {
    const data = await getwf();
    console.log("these wafflez are my FAV", data);
})();
const updatecoins = async (value) => {
    try {
      console.log(value);
      await axios.put(`${url}/coins`, { count: value });
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
              > <img src='https://cdn.discordapp.com/attachments/1412544500295012392/1412554193520164925/Retro_Button_with_Pixelated_Waffle.png?ex=68b8b71b&is=68b7659b&hm=487a8a72c8164b512f37f6352c2a437138fc641b7c989f5d7e7c23b15c71e20a&' alt='b'width="200"></img>
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
            }}><img src='https://th.bing.com/th/id/OIP.3VA9aaLFj-HsiRdhCNdshQHaJV?w=140&h=180&c=7&r=0&o=5&pid=1.7' alt='baller'width="200"></img>WAFFLES plant (100coin,1waffles/sec)</button>
          ) : (<button className='upgrade1broke'> WAFFLES plant broke ahhh (100coin,1waffles/sec)</button>)}

          {count >= 1000 ? (<button className='upgrade1'onClick={() => {
              setWf(wf + 1)
              setCount(count - 1000);
            }}><img src='https://cdn.discordapp.com/attachments/1412544500295012392/1412549308795850763/IMG_1368.png?ex=68b8b28f&is=68b7610f&hm=4dc3291e8542b3cb133fcc1b06bec247d5630c423cd14fc4718216e8c4bb57dd&' alt='baller'width="500"></img>wafflesfarms 10wps/cost1000coins </button>
            ):(<button className='upgrade1broke'>wafflesfarms 10wps/cost1000coins BROKEY</button>)}
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

export default Game;