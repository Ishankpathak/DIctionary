import React, { useState } from 'react'
import  Axios  from 'axios';
const App = () => {
  const [data , setData] = useState("");
  const [searchWord , setSearchWord] = useState("");

  function getMeaning(){
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`).then((res)=>{
      setData(res.data[0])
      console.log(res.data[0]);
    })
  }

  function playAudio(){
    let audio = new Audio(data.phonetics[0].audio);
    audio.play()
  }
  return (
    <div className='App'>
      <h1>Dictionary</h1>
      <div className="searchBox">
       <input type="text" placeholder='Search...' onChange={(e)=>{setSearchWord(e.target.value)}} />
       <button onClick={()=>{getMeaning()}} className="search"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
      {data && (
        <div className="showResults">
          <h2>{data.word}   <button onClick={()=>{playAudio()}} className="sound" ><i class="fa-solid fa-volume-high"></i></button>
           </h2>
         
          <p>Part Of Speech:- {data.meanings[0].partOfSpeech}</p>
          <p>Definition:- {data.meanings[0].definitions[0].definition} </p>
          <p>Example:- { data.meanings[0].definitions[0].example} </p>
        </div>
      )}
    </div>
  )
}

export default App
