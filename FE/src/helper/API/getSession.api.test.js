import {render, screen} from '@testing-library/react';
import GetSessionApi from './getSession.api';

describe('Get Session API', () => {
 
  const data = { "session": '201283%@918023'};
  const header = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data})
  };

  it('Should be called with the correct URL', async () => {
    const spy = jest.spyOn(global, 'fetch');
    const response = await GetSessionApi(header);
    expect(spy).toHaveBeenCalledWith("http://localhost:3001/session", header);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();

    expect(response.status).toBe(200);
  })

  it('should make a successful call to the API', async () => {
    const response = await GetSessionApi(header);
    expect(response.status).toBe(200);
    expect(response.data).toEqual([]);
  });

});
  