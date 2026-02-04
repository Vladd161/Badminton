import { useState } from 'react'

// "Japheth", "Ludwig", "Syafa", "Lessie", "Vlademir", "Arfa", "Gian", "Robert", "Chris", "Emman"
function App() {
  const [playerCount, setPlayerCount] = useState(11)
  const [hours, setHours] = useState(3)
  const [court, setCourt] = useState(2)
  const [playerNames, setPlayerNames] = useState('asd, Japheth, Ludwig, Syafa, Lessie, Vlademir, Arfa, Robert, Chris, Justin, Eman');
  const [listPNames, setListPNames] = useState<string[]>([]) // set  of names
  const [countListPNames, setCountListPNames] = useState<any[]>([]); // list of {name:,count:} object  
  const [gameSets, setGameSets] = useState<any[]>([{game: "", court1: [], court2: [], court3: [], rest:[]}]) 


  // function convertPlayerNames(names: string){
  //   if(names.includes(',')){
  //     const namesArray = names.split(',')
  //     namesArray.forEach((e)=> playerNames.push(e));
  //   }
  // }


  function startGame(){
    let numOfGames = (hours * 60)/15;
    if(gameSets.length > 1){
      gameSets.splice(0)
      gameSets.push({game: "", court1: [], court2: [], court3: [], rest:[]})
    }
     // removes elements starting from 0(everything)| Do not know how to setGameSets to clear out the useState.
    //all possible games for 8 people == 24 8!/8!-4!+
    if(listPNames.length != playerCount){
      alert("uneven player names and player count")
    }
    else{
      if(playerCount >= 9){
        nineMorePlayers(numOfGames)
      }
      if(playerCount == 8){
        eightPlayers(numOfGames);
      }
      if(playerCount == 7){
        sevenPlayers(numOfGames); 
      }
      if(playerCount == 6){
        sixPlayers(numOfGames); 
      }
    }

  }

function getLeastRest(){
  let min = 999
  let leastRest: string[] = [] // List of names that has the least amount of rest or havent rested yet to choose from
  let restList: string[] = [] // List of Names that are resting to be returned
  countListPNames.forEach((e) => {
    if(e.count < min){ //sets the minimum 0,1,2,3 
      min = e.count;
    }
  })
  countListPNames.forEach((e) => { //pushes all with least rest to a list to shuffle 
    if(e.count == min){
      leastRest.push(e.name)
    }
  })
  let currentIndex = leastRest.length;
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [leastRest[currentIndex], leastRest[randomIndex]] = [
        leastRest[randomIndex], leastRest[currentIndex]];
  }

  if(playerCount % 8 > leastRest.length){
    min = 999;

    for(let i=0; i < leastRest.length;  i++){
        restList.push(leastRest[i]);
        const name = countListPNames.find((e) => e.name == leastRest[i]);
        name.count += 1;
    }
    leastRest = [] 
    countListPNames.forEach((e) => {
    if(e.count < min){ //sets the minimum 0,1,2,3 
      min = e.count;
    }
  })
    countListPNames.forEach((e) => { //pushes all with least rest to a list to shuffle 
    if(e.count == min){
      leastRest.push(e.name)
    }
  })
    for(let i=0;i <restList.length;i++){
      let index = leastRest.findIndex(function(name){return name == restList[i]})// proper way to do findIndex is tohave function and return .. weird
      leastRest.splice(index,1);
    }
    let initialRest = restList.length
    for(let i=0; i < ((playerCount % 8) - initialRest);  i++){
      let randomIndex = Math.floor(Math.random() * leastRest.length);
      restList.push(leastRest[randomIndex])
      const name = countListPNames.find((e) => e.name == leastRest[randomIndex]);
      name.count += 1;
    }
  }
  else{ 
    for(let i=0; i < playerCount % 8;  i++){
      restList.push(leastRest[i]); 
      const name = countListPNames.find((e) => e.name == leastRest[i]);
      name.count += 1;
    }
  }
  return restList;
}
function nineMorePlayers(numOfGames:number){
      let gameNo = 1;
      // While there remain elements to shuffle...
      for(let i = 0; i < numOfGames; i++){
        let shuffleNames = listPNames.slice(0) ; // 
        let restList = getLeastRest(); // returns an array of those that needs rest
        for(let i=0;i <restList.length;i++){
          let index = shuffleNames.findIndex(function(name){return name == restList[i]})// proper way to do findIndex is tohave function and return .. weird
          shuffleNames.splice(index,1);
        }
        let currentIndex = shuffleNames.length - 1;
        while (currentIndex != 0) {

          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [shuffleNames[currentIndex], shuffleNames[randomIndex]] = [
            shuffleNames[randomIndex], shuffleNames[currentIndex]];
        }
        if(court == 2){
          gameSets.push({game: gameNo, court1: shuffleNames.slice(0,4), court2: shuffleNames.slice(4,8), court3: [], rest: restList});
        }else{
          gameSets.push({game: gameNo, court1: shuffleNames.slice(0,4), court2: shuffleNames.slice(4,8), court3: shuffleNames.slice(8), rest: restList});
        }
        
        gameNo+=1;
      }
      setGameSets([...gameSets])
    
  }
  function sixPlayers(numOfGames:number){
      let gameNo = 1;
      // While there remain elements to shuffle...
      for(let i = 0; i < numOfGames; i++){
        let shuffleNames = JSON.parse(JSON.stringify(listPNames)) ; // 
        let currentIndex = shuffleNames.length;
        while (currentIndex != 0) {

          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [shuffleNames[currentIndex], shuffleNames[randomIndex]] = [
            shuffleNames[randomIndex], shuffleNames[currentIndex]];
        }
        gameSets.push({key: gameNo, court1: shuffleNames.slice(0,2), court2: shuffleNames.slice(2), court3:[], rest:[]});
        gameNo+=1;
      }
      setGameSets([...gameSets])
    
  }
  function sevenPlayers(numOfGames:number){
      let gameNo = 1;
      // While there remain elements to shuffle...
      for(let i = 0; i < numOfGames; i++){
        let shuffleNames = listPNames.slice(0) ; // 
        let currentIndex = shuffleNames.length - 2;
        let endIndex = shuffleNames.length - 1;
          [shuffleNames[endIndex], shuffleNames[i%7]] = [
            shuffleNames[i%7], shuffleNames[endIndex]];
        while (currentIndex != 0) {

          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [shuffleNames[currentIndex], shuffleNames[randomIndex]] = [
            shuffleNames[randomIndex], shuffleNames[currentIndex]];
        }
        gameSets.push({game: gameNo, court1: shuffleNames.slice(0,2), court2: shuffleNames.slice(2,6), court3: [], rest: shuffleNames.slice(6)});
        gameNo+=1;
      }
      setGameSets([...gameSets])
    
  }
  function eightPlayers(numOfGames:number){
      let gameNo = 1;
      // While there remain elements to shuffle...
      for(let i = 0; i < numOfGames; i++){
        let shuffleNames = JSON.parse(JSON.stringify(listPNames)) ; // 
        let currentIndex = shuffleNames.length;
        while (currentIndex != 0) {

          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [shuffleNames[currentIndex], shuffleNames[randomIndex]] = [
            shuffleNames[randomIndex], shuffleNames[currentIndex]];
        }
        gameSets.push({game: gameNo, court1: shuffleNames.slice(0,4), court2: shuffleNames.slice(4), court3:[], rest: []});
        gameNo+=1;
      }
      setGameSets([...gameSets])
    
  }
  
  function addNames(){
    var newStateArray = playerNames.split(',');
    var regex=/^[a-zA-Z]+$/; // regex for all type of strings
    newStateArray.forEach((e) => {
      if(!listPNames.includes(e.trim()) && e !== "" && e.trim().match(regex)){ // e.match(regex) check e if its a string only (names)
        listPNames.push(e.trim());
        countListPNames.push({name: e.trim(), count:0})
      }
    });
    setListPNames([...listPNames]);
    setCountListPNames([...countListPNames]);
  }

  function resetRest(){
    alert(countListPNames.length)
    for(let i=0;i < countListPNames.length; i++){
      const name = countListPNames[i];
      name.count = 0;
    }
    setCountListPNames([...countListPNames]); // this updates the state thus shows the result of the change back from 3^ to 0
  }

  function removePlayer(playerName:string){
    const countNameIndex = countListPNames.findIndex((e) => e.name == playerName);
    countListPNames.splice(countNameIndex,1)
    const nameIndex = countListPNames.findIndex((e) => e.name == playerName);
    listPNames.splice(nameIndex,1)
    alert(countListPNames.length)
    setCountListPNames([...countListPNames]) // this updates the state thus shows the result of the change removing it from the list
    setListPNames([...listPNames]);
  }

  return (
    <>
    <label>
      How many players? {'    '}
    <input
      type = "number" // have to code teh type of the value 
      value = {playerCount}
      onChange={(e) => setPlayerCount(e.target.valueAsNumber)} // this takes the value as number if its just e.target.value then it counts it as a string 
    />
    </label>
    <label>
      How many hours? {'    '}
    <input
      type = "number"
      value = {hours}
      onChange={(e) => setHours(e.target.valueAsNumber)} // this takes the value as number if its just e.target.value then it counts it as a string 
    />
    </label>
    <label>
      How many courts? {'    '}
    <input
      type = "number"
      value = {court}
      onChange={(e) => setCourt(e.target.valueAsNumber)} // this takes the value as number if its just e.target.value then it counts it as a string 
    />
    </label>
    <br></br><br></br>
    <label>
      Player Names {'    '}
    <input
      value = {playerNames}
      onChange={(e) => setPlayerNames(e.target.value)} // this takes the value as number if its just e.target.value then it counts it as a string 
    />
    </label>
    <button type="button" onClick={addNames}>Add Names</button>
    <br></br>
    <button type="button" onClick={startGame}>Start Game</button>
    {playerCount}
    {hours}
    {court} 
      <ol>
        {countListPNames.map(countListPNames => (
          <li><button type = "button" onClick = {() => removePlayer(countListPNames.name)}>Remove</button>
          {countListPNames.name} | Rest:{countListPNames.count} 
          <button> + </button> 
          </li> // in button removePlayer have to add () => for it to be a function that accepts parameter 
        ))}
      </ol>
      <button type = "button" onClick={resetRest}>Reset Rest</button>
     <table>
        <tr key={"header"}>
          {Object.keys(gameSets[0]).map((key) => (
            <th>{key}</th>
          ))}
        </tr>
        {gameSets.map((item) => (
          <tr key={item}>
            <td>{item.game}</td>
            <td>{item.court1.join(', ')}</td>
            <td>{item.court2.join(', ')}</td>
            <td>{item.court3.join(', ')}</td>
            <td>{item.rest.join(', ')}</td>
          </tr>
        ))}
      </table>

    </>
  );
}

export default App
