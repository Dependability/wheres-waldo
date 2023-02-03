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
        const q = query(col, orderBy('score'), limit(20));
        getDocs(q).then(result => {
            const newArray = [];
            result.forEach((item)=>{
                newArray.push(item.data())
            })
            console.log(newArray)
            setBoard(newArray);
        })

    },[])

    return <div className='leaderboard-wrap'>
        <table className='leaderboard'>
        <thead>
            <th>Name</th>
            <th>Time</th>
        </thead>
        <tbody>
        {board.map((val, ind)=> { return(
            <tr key={ind}>
                <td>{val.name}</td><td>{val.score}s</td>
            </tr>)
        })}
        </tbody>
    </table>
    </div>
}

export default Leaderboard;