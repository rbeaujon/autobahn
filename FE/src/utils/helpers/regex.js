const Regex = (str, condition) => {

  let response = ""
  if(condition==="test.NoEspecialCharacters"){
    const pattern  = /[$#%^&*.+()@±!/'"\][,;~.]/
    response = pattern.test(str) 
  }
  return response
}

export default Regex