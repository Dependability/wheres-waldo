/* Leaderboard component for the various games */
import config from './Firebase'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { query, orderBy, limit } from "firebase/firestore";  
import { useEffect, useState } from 'react';

function Leaderboard() {
    const [board, setBoard] = useState([]);
    const param = useParams()
    
    useEffect(()=>{
        const level = param.gameid;
        const app = initializeApp(config);
        const db = getFirestore(app);
        const col = collection(db, `leaderboard/${level}/leader`);
        const q = query(col, orderBy('score', 'desc'), limit(20));
        const queryItems = getDocs(q).then(result => {
            const newArray = [];
            result.forEach((item)=>{
                newArray.push(item.data())
            })
            console.log(newArray)
            setBoard(newArray);
        })

    },[])

    return <div className='leaderboard'>
        <div className='header'><div>Name</div><div>Score</div></div>
        {board.map((val, ind)=> { return(
            <div key={ind}>
                <div>{val.name}</div><div>{val.score}</div>
            </div>)
        })}
    </div>
}

export default Leaderboard;