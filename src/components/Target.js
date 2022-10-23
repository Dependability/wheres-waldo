
export default function Target({position,hidden, arr, setCorrect, setHidden}) {


    function checkPosition() {
        setHidden(true);
        const topLeft = [position[0] - 50, position[1] - 50];
        const botRight = [position[0] + 50, position[1] + 50];
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i])
            if ((arr[i][0] >= topLeft[0] && arr[i][0] <= botRight[0])
            && (arr[i][1] >= topLeft[1] && arr[i][1] <= botRight[1])) {

                console.log("found it!")
                
                setCorrect((c) => {
                    console.log(c.concat([arr[i][0],arr[i][1]]))
                    return c.concat([[position[0],position[1]]])
                })
                return
            }
        }
        console.log("Does not contain.")
        
    }


    return (<div style={{position: 'absolute', width: '80px', height: '80px', border: '1px solid black', top: position[1]-40, left: position[0]-40, visibility: (hidden ? 'hidden' : 'visible')}}>
        <button onClick={checkPosition}>Confirm</button>
    </div>)
}