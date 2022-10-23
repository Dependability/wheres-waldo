import Game from './components/Game'
import config from './components/Firebase'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { doc, getDoc } from "firebase/firestore";
import {useEffect,useState} from 'react';


// Initialize Firebase
const app = initializeApp(config);
const db = getFirestore(app);

async function waldoThing() {
  const docRef = doc(db, "waldos", "beach-waldo");
  const docInfo = await getDoc(docRef)
  if (docInfo.exists()) {
    let p = docInfo.data();
    return [[p.waldominX, p.waldominY], [p.waldominX, p.waldomaxY], [p.waldomaxX, p.waldominY], [p.waldomaxX, p.waldomaxY]]
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}




function App() {
  const [pos, setPos] = useState([])
  useEffect(()=> {
    waldoThing().then((result)=> {
      setPos(result)
    })
  }, [])
  return (
    <div className="App">
      <Game pos={pos}/>
    </div>
  );
};



export default App;
