export const registerData = async (header) => {

  const url = "http://localhost:3001/register";
  const response = await fetch(url, header);
  return {
    status: response.status,
    data: response.data
  }
}

