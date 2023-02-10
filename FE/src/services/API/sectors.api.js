require('isomorphic-fetch');
export const SectorsAPI = async () => {

  const url = "http://localhost:3001/sectors";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
