import React, { useState, useEffect } from 'react';
import '../Components/Page.css'
import JokePopup from './JokePopup';

function Search() {

  const [topics, setTopics] = useState([])

  const [joke, setJoke] = useState({
    name : "",
    joke : ""
  })

  //important
  //(<div className='joke'><div className='jokecontainer'><button className="closebutton" onClick={() => handlejokeclose()}>X</button><p style= {{fontSize : "1.5em"}}>{joke.name}</p><p>{joke.joke}</p><button className="next" onClick={() => setjoke("animal")}>Next Joke</button></div></div>)

  const [names,setNames] = useState("")
  const [jokes,setJokes] = useState("")
  const [handlejoke, setHandlejoke] = useState(false)

  const handlejokeclose = () => {
    setHandlejoke(!handlejoke)
  }

  useEffect(() => {
    fetch(`https://api.chucknorris.io/jokes/categories`)

    .then(response => {
      console.log(response)
      if (!response) {
        throw new Error('No response');
      }
      return response.json();

    })
    .then(data => {
      setTopics(data)
      console.log(data)
    })
    .catch(error => {


    })

  }, []);


   function setjoke (topi) {
    
    setNames(topi)
    //var search = topi
   
    //setJoke((prev) => ({...prev,name:topi.charAt(0).toUpperCase()+topi.slice(1)}))
   fetch(`https://api.chucknorris.io/jokes/random?category=${topi}`)
   
      .then(response => {
        console.log(response)
        if (!response) {
          throw new Error('No response')
        }
        return response.json()
      })
      .then(data => {
        setJoke((prev) => ({...prev,joke:data.value}))
        
          setHandlejoke(!handlejoke)
          //console.log(data.value)

      })
      .catch(error => {

      }) 
  }; 


  return (
    <div>
      <div className='view'>
        <h1 style={{textDecorationColor:"green"}}>Chuck Norries</h1>



        <div class="container">

          {topics.map((topic) => { return (<div className="topicss" onClick={() => setjoke(topic)}> <div style= {{fontSize : "1.5em"}}>{topic.charAt(0).toUpperCase()+topic.slice(1)}</div><div>Unlimited Jokes On {topic.charAt(0).toUpperCase()+topic.slice(1)}</div>
          
          </div>) }
          )}  
 
        {handlejoke && <JokePopup names={names} jokes={joke.joke} closejoke={handlejokeclose}/>}
        </div>
      </div>
    </div>
  );
}

export default Search;
