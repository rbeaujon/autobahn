const registerData = async (header) => {

  const url = "http://localhost:3001/register";
  const response = await fetch(url, header);
  return response.status;
}

export default registerData