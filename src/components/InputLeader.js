export default function InputLeader() {

    function submitForm(e) {
        e.preventDefault();
        //do database thing to add player to collection and their time. 
        //query the first 20, if they are above the 20th, then put them in!
        //This seems like dangerous data so I don't know if this is the best way tbh!
        
    }

    return (<form onSubmit={submitForm}>
        <label for="name">Name<input type="text" maxLength="16" minLength="3" id="name" /></label>
        <input type="submit"></input>
    </form>)
}