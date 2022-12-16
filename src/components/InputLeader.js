import config from './Firebase'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {collection, addDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
export default function InputLeader(props) {

    const app = initializeApp(config);
    const db = getFirestore(app);
    const params = useParams();

    let navigate = useNavigate();
    function submitForm(e) {
        e.preventDefault();
        

        console.log(e.target.checkValidity());
        e.target.reportValidity();
        //do database thing to add player to collection and their time. 
        //query the first 20, if they are above the 20th, then put them in!
        //This seems like dangerous data so I don't know if this is the best way tbh!
        const leaderRef = collection(db, `leaderboard/${params.gameid}/leader`);
        console.log(e.target.name.value)
        if (e.target.name.value.trim() === '') {
            return;
        }

        addDoc(leaderRef, {'name': e.target.name.value,
                            'score': props.score}).then(()=>{
                                navigate('/')
                            });
        

        
    }

    return (<form onSubmit={submitForm}>
        <label htmlFor="name">Name<input type="text" maxLength="16" minLength="3" id="name" required/></label>
        <input type="submit"></input>
    </form>)
}