/* In this menu component, we will have the option 
to choose games or leaderboards for certain games. It will be the
first thing they will see when they open the page, we can use Browser Routers
in order to choose this. */
import {Link} from 'react-router-dom';
import waldo from '../assets/waldo.jpg';
export default function MainMenu(props) {




    return <div className='mainMenu'>
        <div className='menuItem'>
            <img src={waldo} alt='waldo-game'></img>
            <div className='buttons'>
                <Link to='/game/level-1'>Play</Link>
                <Link to='/leaderboard/level-1'>Leaderboard</Link>
            </div>
        </div>

    </div>
}