import {React,useState,useEffect} from 'react'
import './Page.css'


const JokePopup = ({names,jokes,closejoke}) => {

  const [displayName, setDisplayName] = useState("")

    useEffect(()=> {
      setDisplayName(names)
    },[names])

    const [joke, setJoke] = useState({
        joke:""
    })

    const [jokebar,setJokebar] = useState(true)
    
    function setjokebar(){
      setJokebar(false)
    }

    function handlejokeclose(){
      closejoke()
    }

    function setjokes (topi) {
    
        
        var search = topi
       
        //setJoke((prev) => ({...prev,name:topi.charAt(0).toUpperCase()+topi.slice(1)}))
       fetch(`https://api.chucknorris.io/jokes/random?category=${search}`)
       
          .then(response => {
            console.log(response)
            if (!response) {
              throw new Error('No response')
            }
            return response.json()
          })
          .then(data => {
            setJoke((prev) => ({...prev,joke:data.value}))
            
            
            console.log(joke.joke)
    
          })
          .catch(error => {
    
          }) 
      };
  return (
jokebar &&  (<div className='joke'><div className='jokecontainer'><button onClick={handlejokeclose} className="closebutton" >X</button><p style= {{fontSize : "1.5em"}}>{displayName.charAt(0).toUpperCase()+displayName.slice(1)}</p><p>{joke.joke}</p><button className="next" onClick={(e)=>{setjokes(names)}}>Next Joke</button></div></div>)



)
}

export default JokePopup