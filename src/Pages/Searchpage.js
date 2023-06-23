import React, { useState, useEffect } from 'react';
import '../Components/Page.css'


function Search() {

  const [topics, setTopics] = useState([])

  const [joke, setJoke] = useState({
    name : "",
    joke : ""
  })

  const [handlejoke, setHandlejoke] = useState(false)

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
   
    setJoke((prev) => ({...prev,name:topi.charAt(0).toUpperCase()+topi.slice(1)}))
   fetch(`https://api.chucknorris.io/jokes/random?category=${topi}`)
   
      .then(response => {
        //console.log(response)
        if (!response) {
          throw new Error('No response')
        }
        return response.json()
      })
      .then(data => {
        setJoke((prev) => ({...prev,joke:data.value}))
        setHandlejoke(true)
        console.log(data.value)

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
 
        <div className='joke'><p style= {{fontSize : "1.5em"}}>{joke.name}</p><p>{joke.joke}</p><button onClick={() => setjoke(joke.name)}>Next Joke</button></div>
        </div>
      </div>
    </div>
  );
}

export default Search;
