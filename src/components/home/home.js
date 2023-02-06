import { is } from "@babel/types";
import React, { useEffect, useState } from "react";
import GetSessionApi from "../../helper/API/getSession.api";
import registerData from "../../helper/API/registerData.api";
import SectorsAPI from "../../helper/API/sectors.api";
import Regex from "../../helper/regex/regex";
import "./home.styles.scss";



const Home = () => {

const[sectors, setSectors] = useState([]);
const[verification, setVerification] = useState({name: false, sector: false, terms: false, error: false, chars: false})
const [session, setSession] = useState(
  JSON.parse(sessionStorage.getItem('session')) || null
);
const[isRegistered, setIsRegistered] = useState(false);
const[isDisabled, setIsDisabled] = useState(true);
const getSectors = async () => {
  const data = await SectorsAPI();
  setSectors(data);
}

const sendToRegister = async (data) => {
  const header = {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await registerData(header)
  if(response === 201){
    console.log(`Register successfully`);
    document.getElementById("terms").checked = false;
    setIsRegistered(true)
  }else{
    console.error('Unavailable error: ' + response.status);
  }
  handleVerification();
}



//Get the Sectors available on DB
useEffect(() => {
  getSectors();
  
  if(session){
    const header = {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({session})
    };

    const getSession = async () => {
     
      const response = await GetSessionApi(header); //fieldId,session,userId
      if(response.status === 200 && response.data.length !== 0){
        const sector = document.getElementById("sector");
        document.getElementById("name").value = response.data[0].userId;
        response.data[0].fieldId.split(",").map(num => parseInt(num)).map(elem => sector[elem].selected = true)
        document.getElementById("terms").checked = false
        handleVerification()
      }  
    }
    getSession()
    

  }
},[])

//Session Control
useEffect(() => {
  if (!session) {
    setSession(Date.now());
    sessionStorage.setItem('session', JSON.stringify(Date.now()));
  }
}, [session]);

//Show message when the user make a registration
useEffect(() => {
  
  if(isRegistered){
    setTimeout(() => {
      setIsRegistered(false);
    }, 3000)
  }


},[isRegistered])

const handleVerification = () => {
  const getName = document.getElementById("name").value
  const getSector = Array.from(document.getElementById("sector").selectedOptions).map(({ value }) => value);
  const getTerms = document.getElementById("terms").checked
  const newStatus = {...verification }
  newStatus.name = getName.length > 0 ? true : false
  newStatus.sector = getSector.length > 0 ? true : false
  newStatus.terms = getTerms
  const {name,sector,terms} = newStatus
  newStatus.error = (name === false || sector === false || terms === false) ? true : false;
  if(getTerms) {setIsDisabled(false)}
  setVerification(newStatus)

}

const handleClick = () => {
  const name = document.getElementById("name").value
  const sector = Array.from(document.getElementById("sector").selectedOptions).map(({ value }) => value);

  handleVerification()
  

  if(!error){
    const data = {
      "userId": name,
      "fieldId": [sector],
      "session": session
    }
    sendToRegister(data)
  }
  
}

const handleValidCharacters = () => {
  const str = document.getElementById("name").value;
  const hasSpecialChar = Regex(str, "test.NoEspecialCharacters");
  const newStatus = {...verification}
  newStatus.char = hasSpecialChar
  setVerification(newStatus); 
}

const {error, name, sector, terms} = verification;

  return (
  <>
  <div className="home">
    <div className="container">
      <label className="title"> Please enter your name and pick the sectors you are currently involved in </label>
      {error && name === false && <label className="error"> Required field </label>} 
      {verification.char && <label className="error"> Special characters are not allowed. </label>} 
      <div className={`name`}>
        <input type="text" name="name" data-testid="name" className={`${verification.char && 'errorChar'}`} onChange={() =>  handleValidCharacters() } id="name"/> 
      </div>
      {error && sector === false &&<label className="error"> Required field </label>} 
      <div className="sector"> 
        <select size="5" name="sector" data-testid="sector" id="sector"  multiple> 
          { sectors && sectors.map(sector => <option value={sector.id} key={sector.id}>{sector.field}</option> )}
        </select> 
        {isRegistered && <div className="isRegistered"> The data was successfully saved </div>} 
      </div>

      {error && terms === false &&<label className="error"> Required field </label>} 
      <div className="terms">
        <input type="checkbox" data-testid="terms" id="terms" onClick={() => handleVerification() } name="terms" />
        <label>Agree to terms</label>
      </div>  
      <input type="submit" className="submit" onClick={() =>  handleClick() } value="Save" disabled={isDisabled}   />
    </div>
  </div>
  </>
)}

export default Home