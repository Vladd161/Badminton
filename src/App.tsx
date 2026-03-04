import { useState } from 'react'
import styled from 'styled-components'
import {createGlobalStyle} from 'styled-components';
import logoImg from '../../my-app/src/assets/logo.jpg';
import gamesImg from '../../my-app/src/assets/games.jpg';

const GlobalStyle = createGlobalStyle`
  body{
  font-family: "DM Sans", sans-serif;
  }
`

const StartButton = styled.button`
  display: block;
  margin:0 auto;
  margin-bottom: 5px;
  
`
const ResetButton = styled.button`
  display: block;
  margin:0 auto;
  margin-bottom: 5px;
  margin-top:5px;
`

const PlayerNameInputLabel = styled.label`
  display: block;
  text-align:center;
  gap: 8px;
`
const LabelInput = styled.input`

`
const LabelButton = styled.button` 
  margin:0 auto;
  display:block;
`
const LabelSpan = styled.span`
  text-align: center;
  display:block;
`

//field-sizing: content makes it so that the size is dependent on the input typed inside 
const Input = styled.input` 
  field-sizing: content;
  margin:0 auto;
`

//display block + text-align center = centers the whole label + input inside;
const Label = styled.label`
  display: block;
  text-align:center;
  gap: 8px;
`

// to center things display + margin combo under for example
const Logo = styled.img`
  height:140px;
  display: block;
  margin:0 auto;
`
const GamesImg = styled.img`
  height:35px;
  display: block;
  margin:0 auto;
`


const OrderedList = styled.ol`
  margin: 0 auto;
  display:table;
  padding-inline-start: 0px;
  list-style-type: decimal;
`

const List = styled.li`
 
`

const PlayerRemoveButton = styled.button`
   
`
const PlayerAddButton = styled.button`
`
const PlayerMinusButton = styled.button`
   
  
`
const ListSpan = styled.span`
   margin-left: 10px;
`

const NameSpan = styled.span`
   
`

const Rest = styled.div`
  float: right;
`

const Table = styled.table`
  overflow: auto;
  width: 100%;
  max-width: 400px;
  height: 300px;
  display: block;
  margin: 0 auto;
  border-spacing: 0;
`
const Th = styled.th`
  border: 1px solid black;
  padding: 5px 10px;
`
const Tr = styled.tr`
  padding: 5px 10px;
`

const TrHeader = styled.tr`
  padding: 5px 10px;
  border-bottom: 111px solid red;
`

// "Japheth", "Ludwig", "Syafa", "Lessie", "Vlademir", "Arfa", "Gian", "Robert", "Chris", "Emman"
function App() {
  const [playerCount, setPlayerCount] = useState(0)
  const [hours, setHours] = useState(3)
  const [court, setCourt] = useState(2)
  const [playerNames, setPlayerNames] = useState('');
  const [listPNames, setListPNames] = useState<string[]>([]) // set  of names
  const [countListPNames, setCountListPNames] = useState<any[]>([]); // list of {name:,count:} object  
  const [gameSets, setGameSets] = useState<any[]>([]) 



  // function convertPlayerNames(names: string){
  //   if(names.includes(',')){
  //     const namesArray = names.split(',')
  //     namesArray.forEach((e)=> playerNames.push(e));
  //   }
  // }


  function startGame(){
    for(let i=0;i < countListPNames.length; i++){
      const name = countListPNames[i];
      name.playedSingles = 0;
    }
    setCountListPNames([...countListPNames]); // this updates the state thus shows the result of the change back from 3^ to 0
    let numOfGames = (hours * 60)/15;
    if(gameSets.length > 1){
      gameSets.splice(0)
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
  let maxPlayers = 0;
  if(playerCount >= 9){
    maxPlayers = 8
  }else if(playerCount == 7){
    maxPlayers = 6
  }
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

  if(playerCount % maxPlayers > leastRest.length){
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
    for(let i=0;i <restList.length;i++){ //remove those that are in restList 
      let index = leastRest.findIndex(function(name){return name == restList[i]})// proper way to do findIndex is tohave function and return 
      leastRest.splice(index,1);
    }
    let initialRest = restList.length
    for(let i=0; i < ((playerCount % maxPlayers) - initialRest);  i++){
      let randomIndex = Math.floor(Math.random() * leastRest.length);
      restList.push(leastRest[randomIndex])
      const name = countListPNames.find((e) => e.name == leastRest[randomIndex]);
      name.count += 1;
    }
  }
  else{ 
    for(let i=0; i < playerCount % maxPlayers;  i++){
      restList.push(leastRest[i]); 
      const name = countListPNames.find((e) => e.name == leastRest[i]);
      name.count += 1;
    }
  }
  return restList;
}

function getSinglePlayers(nameList: string[]){
  let min = 999
  let leastPlayedSingle: string[] = [] // List of names that has the least amount of rest or havent rested yet to choose from
  let singlePlayers: string[] = [] // List of Names that are resting to be returned
  countListPNames.forEach((e) => {
    if(e.playedSingles < min){ //sets the minimum 0,1,2,3 
      min = e.playedSingles;
    }
  })
  countListPNames.forEach((e) => { //pushes all with least rest to a list to shuffle 
    if(e.playedSingles == min && nameList.some(f => f === e.name)){
      leastPlayedSingle.push(e.name)
    }
  })

  if(gameSets.length > 1){
    let playedBefore = gameSets[gameSets.length - 1].court1;
    for(let i=0;i <playedBefore.length;i++){ //remove those that are in restList 
      if(leastPlayedSingle.some(e => e === playedBefore[i])){
        let index = leastPlayedSingle.findIndex(function(name){return name == playedBefore[i]})// proper way to do findIndex is to have function and return 
        leastPlayedSingle.splice(index,1);
      }
    }
  }
  alert(leastPlayedSingle)
  let currentIndex = leastPlayedSingle.length;
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [leastPlayedSingle[currentIndex], leastPlayedSingle[randomIndex]] = [
        leastPlayedSingle[randomIndex], leastPlayedSingle[currentIndex]];
  }
  if(leastPlayedSingle.length < 2){
    min = 999;
    let alreadyPlayedSingle: string[] = []
    countListPNames.forEach((e) => {
    if(e.playedSingles < min){ //sets the minimum 0,1,2,3 
      min = e.playedSingles;
    }
    })
    countListPNames.forEach((e) => { //pushes all with least rest to a list to shuffle 
    if(e.playedSingles == min + 1){
      alreadyPlayedSingle.push(e.name)
    }
    })

  if(gameSets.length > 1){
    let playedBefore = gameSets[gameSets.length - 1].court1;
    for(let i=0;i <playedBefore.length;i++){ //remove those that are in restList 
      if(alreadyPlayedSingle.some(e => e === playedBefore[i])){
        let index = alreadyPlayedSingle.findIndex(function(name){return name == playedBefore[i]})// proper way to do findIndex is to have function and return 
        alreadyPlayedSingle.splice(index,1);
      }
    }
  }

    //Add the least player to the list to be returned
    singlePlayers.push(leastPlayedSingle[0]);
    let nameToAdd = countListPNames.find((e) => e.name == leastPlayedSingle[0])
    nameToAdd.playedSingles += 1;

    //One Random person of the leastPlayedSingle that has played more than the leastest
    let randomIndex = Math.floor(Math.random() * alreadyPlayedSingle.length);
    singlePlayers.push(alreadyPlayedSingle[randomIndex])
    let name = countListPNames.find((e) => e.name == alreadyPlayedSingle[randomIndex]);
    name.playedSingles += 1;
    
  }
  else{
    for(let i=0; i <= playerCount % 6;  i++){
      singlePlayers.push(leastPlayedSingle[i]); 
      const name = countListPNames.find((e) => e.name == leastPlayedSingle[i]);
      name.playedSingles += 1;
    }
  }
  return singlePlayers;
}
function nineMorePlayers(numOfGames:number){
      let gameNo = 1;
      // While there remain elements to shuffle...
      for(let i = 0; i < numOfGames; i++){
        let shuffleNames = listPNames.slice(0) ; // 
        let restList = getLeastRest(); // returns an array of those that needs rest
        for(let i=0;i <restList.length;i++){ // removes the players in the restList
          let index = shuffleNames.findIndex(function(name){return name == restList[i]})// proper way to do findIndex is tohave function and return .. weird
          shuffleNames.splice(index,1);
        }
        let currentIndex = shuffleNames.length;
        while (currentIndex != 0) {

          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [shuffleNames[currentIndex], shuffleNames[randomIndex]] = [
            shuffleNames[randomIndex], shuffleNames[currentIndex]];
        }
        if(court == 2){
          gameSets.push({game: gameNo, court1: shuffleNames.slice(0,4).sort(), court2: shuffleNames.slice(4,8).sort(), court3: [], rest: restList});
        }else{
          gameSets.push({game: gameNo, court1: shuffleNames.slice(0,4).sort(), court2: shuffleNames.slice(4,8).sort(), court3: shuffleNames.slice(8).sort(), rest: restList});
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
        gameSets.push({game: gameNo, court1: (shuffleNames.slice(0,2)).sort(), court2: shuffleNames.slice(2), court3:[], rest:[]});
        gameNo+=1;
      }
      setGameSets([...gameSets])
    
  }
  function sevenPlayers(numOfGames:number){
      let gameNo = 1;
      // While there remain elements to shuffle...
      for(let i = 0; i < numOfGames; i++){
        let shuffleNames = listPNames.slice(0) ; // 
        let restList = getLeastRest(); // returns an array of those that needs rest
        for(let i=0;i <restList.length;i++){ // removes the players in the restList
          let index = shuffleNames.findIndex(function(name){return name == restList[i]})// proper way to do findIndex is tohave function and return .. weird
          shuffleNames.splice(index,1);
        }
        let singlePlayers = getSinglePlayers(shuffleNames);
        for(let i=0;i <singlePlayers.length;i++){ // removes the players in the restList
          let index = shuffleNames.findIndex(function(name){return name == singlePlayers[i]})// proper way to do findIndex is tohave function and return .. weird
          shuffleNames.splice(index,1);
        }
        gameSets.push({game: gameNo, court1: singlePlayers, court2: shuffleNames, court3: [], rest: restList});
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
        countListPNames.push({name: e.trim(), count:0, playedSingles:0}) //initializer for every person submitted
      }
    });
    setListPNames([...listPNames]);
    setCountListPNames([...countListPNames]);
  }

  function resetRest(){
    for(let i=0;i < countListPNames.length; i++){
      const name = countListPNames[i];
      name.count = 0;
    }
    setCountListPNames([...countListPNames]); // this updates the state thus shows the result of the change back from 3^ to 0
  }

  function removePlayer(playerName:string){
    const countNameIndex = countListPNames.findIndex((e) => e.name == playerName);
    countListPNames.splice(countNameIndex,1)
    const nameIndex = listPNames.findIndex((e) => e == playerName);
    listPNames.splice(nameIndex,1)
    setCountListPNames([...countListPNames]) // this updates the state thus shows the result of the change removing it from the list
    setListPNames([...listPNames]);
  }

  function restPlus(playerName:string){
    const countName = countListPNames.find((e) => e.name == playerName);
    countName.count += 1
    setCountListPNames([...countListPNames])
  }

  function restMinus(playerName:string){
    const countName = countListPNames.find((e) => e.name == playerName);
    countName.count -= 1
    if(countName.count < 0){
      countName.count = 0;
    }
    setCountListPNames([...countListPNames])
  }
  return (
    <>
    <GlobalStyle/>
    <Logo src={logoImg} alt = "badminton"/>
    <Label>
      players {'    '}
    <Input
      type = "number" // have to code teh type of the value 
      value = {playerCount}
      onChange={(e) => setPlayerCount(e.target.valueAsNumber)} // this takes the value as number if its just e.target.value then it counts it as a string 
    />
    </Label>
    <Label>
      hours {'    '}
    <Input
      type = "number"
      value = {hours}
      onChange={(e) => setHours(e.target.valueAsNumber)} // this takes the value as number if its just e.target.value then it counts it as a string 
    />
    </Label>
    <Label>
      courts {'    '}
    <Input
      type = "number"
      value = {court}
      onChange={(e) => setCourt(e.target.valueAsNumber)} // this takes the value as number if its just e.target.value then it counts it as a string 
    />
    </Label>
    <br></br>
    <PlayerNameInputLabel>
        <LabelSpan>player names {'    '}</LabelSpan>
      <LabelInput
        value = {playerNames}
        onChange={(e) => setPlayerNames(e.target.value)} // this takes the value as number if its just e.target.value then it counts it as a string 
      />
      <LabelButton type="button" onClick={addNames}>submit</LabelButton>
    </PlayerNameInputLabel>
    
    <br></br>
    <StartButton type="button" onClick={startGame}>start game</StartButton>
    <OrderedList>
      {countListPNames.map(countListPNames => (
        <>
        
        <List>
          <PlayerRemoveButton type = "button" onClick = {() => removePlayer(countListPNames.name)}>-</PlayerRemoveButton>
          <NameSpan>{countListPNames.name}</NameSpan>
          <NameSpan>{countListPNames.playedSingles}</NameSpan>
          <Rest>
          <ListSpan>Rest:{countListPNames.count} </ListSpan>                
          <PlayerAddButton type = "button" onClick = {() => restPlus(countListPNames.name)}> + </PlayerAddButton> 
          <PlayerMinusButton type = "button" onClick = {() => restMinus(countListPNames.name)}> - </PlayerMinusButton> 
          </Rest>
        </List> 

        </>
        // in button removePlayer have to add () => for it to be a function that accepts parameter 
      ))}
    </OrderedList>
    <ResetButton type = "button" onClick={resetRest}>reset rest</ResetButton>
    <GamesImg src={gamesImg} alt = "games"/>
    <Table>
        {gameSets.map((item) => (
         <>
             <Th>{item.game}
               <TrHeader>Court 1</TrHeader>
               <Tr style={{fontWeight: 'normal'}}>{'\n'}{item.court1.sort().join('\n ')}</Tr> 
               <TrHeader>Court 2</TrHeader>
               <Tr style={{fontWeight: 'normal' }}>{'\n'}{item.court2.sort().join('\n ')}</Tr> 
               <TrHeader>Court 3</TrHeader>
               <Tr style={{fontWeight: 'normal' }}>{'\n'}{item.court3.sort().join('\n ')}</Tr> 
               <TrHeader>Rest</TrHeader>
               <Tr style={{fontWeight: 'normal' }}>{'\n'}{item.rest.sort().join('\n ')}</Tr> 
             </Th>
              
    
        </>
        ))} 
        {/* <tr key={"header"}>
          {gameSets.map((key) => (
            <th>{key}</th>
          ))}
        </tr> */}
        {/* {gameSets.map((item) => (
          <>
          <tr>
            <td>{item.court1.join('\n')}</td>
          </tr>
          <tr>
            <td>{item.court2.join('\n')}</td>
          </tr>
          </>
        ))} */}
      </Table>

    </>
  );
}

export default App
