const GetSessionApi = async (header) => {

  const url = "http://localhost:3001/getsession";
  const response = await fetch(url, header);
  const data = await response.json();
  return {
    data: data,
    status: response.status
  }
}

module.exports = GetSessionApi