const Verification = (userId, fieldId, session) => {

  // Return 3  values Empty, Type, Ok

console.log(`Verification data received: A ${userId}, B ${fieldId}, C ${session}` ) 
  if(userId === undefined || fieldId === undefined || session === undefined){
    return "Empty"
  }else if(userId === "" || fieldId === "" || session === ""){
    return "Empty"
  }else if(typeof userId !== 'string', typeof fieldId !== 'object', typeof session !== 'number'){
    return "Type"
  }else if(userId.length > 0 || fieldId.length > 0 || session.length > 0){
    return "Ok"
  }

}

module.exports = Verification