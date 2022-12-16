import {useState, useEffect} from 'react';
import Target from './Target'
import InputLeader from './InputLeader'
import waldo from '../assets/waldo.jpg'
import check from '../assets/check.png';
import {useParams} from 'react-router-dom';
export default function Game({pos}) {

    const [position, setPosition] = useState([10,10]);
    const [hidden, setHidden] = useState(true);
    const [correct, setCorrect] = useState([]);
    const [time, setTime] = useState(0);
    const params = useParams();

    useEffect(()=> {
        
        let inter;
        if (correct.length < 1) {
            setTime(0);
            inter = setInterval(()=>{
                setTime(c => +(0.1 + c).toFixed(12));
            }, 100)
            console.log("one register.")
        }

        return () => {
            console.log("Ni hou!")
            clearInterval(inter)
        }


    }, [correct]) 
    function createTarget(e) {
        if (hidden && correct.length !== 1) {
            const {left, top} = e.target.getBoundingClientRect()
            setPosition([e.clientX - left, e.clientY - top])
            setHidden(false)
            console.log(e.clientX - left, e.clientY - top)
        } else {
            setHidden(true)
        }


    }


    return (<div className="outerDiv">
        <Target position={position} hidden={hidden} arr={pos} setCorrect={setCorrect} setHidden={setHidden}/>
        <img className="mainImg"  src={waldo} alt="Waldo Game, necessary to play game." onClick={createTarget}/>
        <p className='stopWatch'>{time}</p>
        {correct.map((elem, index) => (<img src={check} key={index} alt="Check!" style={{position: "absolute", left: elem[0], top: elem[1], width: '30px', height: '30px'}}/>))}
        {correct.length === 1 ? <InputLeader score={time}/> : ''}
    </div>)
}