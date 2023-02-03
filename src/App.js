import "./styles/style.css"
import Game from './components/Game'
import config from './components/Firebase'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { doc, getDoc } from "firebase/firestore";
import {useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Leaderboard from './components/Leaderboard'

// Initialize Firebase
const app = initializeApp(config);
const db = getFirestore(app);

async function waldoThing() {
  const docRef = doc(db, "waldos", "beach-waldo");
  const docInfo = await getDoc(docRef)
  if (docInfo.exists()) {
    let p = docInfo.data();
    console.log(p);
    return [[p.waldominX, p.waldominY], [p.waldominX, p.waldomaxY], [p.waldomaxX, p.waldominY], [p.waldomaxX, p.waldomaxY]]
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}




function App() {

  const [waldoPos, setWaldoPos] = useState([]);
  
  useEffect(() => {
    waldoThing().then((result)=> {
      setWaldoPos(result);
    })
    }
    ,[]);

  return (
    <BrowserRouter>
    <nav>
    <h1>Where's Waldo?</h1>
    <div className='buttons'>
      <a href='/'>Main Menu</a>
    </div>
    </nav>
    
      <Routes>
        <Route path='/' element={<MainMenu></MainMenu>} />
        <Route path='/leaderboard/:gameid' element={<Leaderboard></Leaderboard>} />
        <Route path='/game/:gameid' element={<Game pos={waldoPos}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};



export default App;
