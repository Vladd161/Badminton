import { useState } from 'react'

interface Counter{
  name: string;
  count? : 0;
}
// "Japheth", "Ludwig", "Syafa", "Lessie", "Vlademir", "Arfa", "Gian", "Robert", "Chris", "Emman"
function App() {
  const [playerCount, setPlayerCount] = useState(10)
  const [hours, setHours] = useState(3)
  const [court, setCourt] = useState(2)
  const [playerNames, setPlayerNames] = useState('');
  const [listPNames, setListPNames] = useState<string[]>([])
  const [countListPNames, setCountListPNames] = useState<any[]>([]);
  const [gameSets, setGameSets] = useState<any[]>([{key: "", court1: [], court2: [], rest:[]}]) 


  // function convertPlayerNames(names: string){
  //   if(names.includes(',')){
  //     const namesArray = names.split(',')
  //     namesArray.forEach((e)=> playerNames.push(e));
  //   }
  // }


  function startGame(){
    let numOfGames = (hours * 60)/15;
    gameSets.splice(0); // removes elements starting from 0(everything)| Do not know how to setGameSets to clear out the useState.
    //all possible games for 8 people == 24 8!/8!-4!+
    if(listPNames.length != playerCount){
      alert("uneven player names and player count")
    }
    else{
      if(playerCount >= 9 && court == 2){
        nineMorePlayers(numOfGames)
      }
      if(playerCount == 8 && court == 2){
        eightPlayers(numOfGames);
      }
      if(playerCount == 7 && court == 2){
        sevenPlayers(numOfGames); 
      }
      if(playerCount == 6 && court == 2){
        sixPlayers(numOfGames); 
      }
    }

  }

function getLeastRest(){
  let min = 999
  let leastRest: string[] = [] // List of names that has the least amount of rest or havent rested yet to choose from
  let restList: string[] = [] // List of Names that are resting to be returned
  countListPNames.forEach((e) => {
    if(e.count < min){
      min = e.count;
    }
  })
  countListPNames.forEach((e) => {
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

  for(let i=0; i < playerCount % 8;  i++){
    restList.push(leastRest[i]);
    const name = countListPNames.find((e) => e.name == leastRest[i]);
    name.count += 1;
  }
  return restList;
}
function nineMorePlayers(numOfGames:number){
      let keyNo = 1;
      // While there remain elements to shuffle...
      for(let i = 0; i < numOfGames; i++){
        let shuffleNames = listPNames.slice(0) ; // 
        let restList = getLeastRest(); // returns an array of those that needs rest
        for(let i=0;i <restList.length;i++){
          let index = shuffleNames.findIndex(function(name){return name == restList[i]})// proper way to do findIndex is tohave function and return .. weird
          shuffleNames.splice(index,1);
        }
        alert(shuffleNames);
        let currentIndex = shuffleNames.length - 1;
        while (currentIndex != 0) {

          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [shuffleNames[currentIndex], shuffleNames[randomIndex]] = [
            shuffleNames[randomIndex], shuffleNames[currentIndex]];
        }
        gameSets.push({key: keyNo, court1: shuffleNames.slice(0,4), court2: shuffleNames.slice(4,8), rest: restList});
        keyNo+=1;
      }
      setGameSets([...gameSets])
    
  }
  function sixPlayers(numOfGames:number){
      let keyNo = 1;
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
        gameSets.push({key: keyNo, court1: shuffleNames.slice(0,2), court2: shuffleNames.slice(2)});
        keyNo+=1;
      }
      setGameSets([...gameSets])
    
  }
  function sevenPlayers(numOfGames:number){
      let keyNo = 1;
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
        gameSets.push({key: keyNo, court1: shuffleNames.slice(0,2), court2: shuffleNames.slice(2,6), rest: shuffleNames.slice(6)});
        keyNo+=1;
      }
      setGameSets([...gameSets])
    
  }
  function eightPlayers(numOfGames:number){
      let keyNo = 1;
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
        gameSets.push({key: keyNo, court1: shuffleNames.slice(0,4), court2: shuffleNames.slice(4), rest: []});
        keyNo+=1;
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
        {listPNames.map(listPNames => (
          <li>{listPNames}</li>
        ))}
      </ol>
     <table>
        <tr key={"header"}>
          {Object.keys(gameSets[0]).map((key) => (
            <th>{key}</th>
          ))}
        </tr>
        {gameSets.map((item) => (
          <tr key={item}>
            <td>{item.key}</td>
            <td>{item.court1.join(', ')}</td>
            <td>{item.court2.join(', ')}</td>
            <td>{item.rest.join(', ')}</td>
          </tr>
        ))}
      </table>
      <ol>
        {countListPNames.map(countListPNames => (
          <li>{countListPNames.count}</li>
        ))}
      </ol>
    </>
  );
}

export default App
