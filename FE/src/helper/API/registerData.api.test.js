import registerData from './registerData.api';

describe('registerData', () => {
  it('should make a successful call to the API', async () => {
    const name = 'John Doe';
    const sector = [1,4,78];
    const session = 201283918023;

    const data = {
      "userId": name,
      "fieldId": {sector},
      "session": session
    };

    const header = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const spy = jest.spyOn(global, 'fetch');
    const status = await registerData(header);
    expect(spy).toHaveBeenCalledWith("http://localhost:3001/register", header);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();

    expect(status).toBe(201);
  });

  it('should return an error if the call to the API fails', async () => {
    const name = 'John Doe';
    const sector = 'Technology';
    const session = '201283%@918023';

    const data = {
      "userId": name,
      "fieldId": [sector],
      "session": session
    };

    const header = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const spy = jest.spyOn(global, 'fetch');
    const status = await registerData(header);
    expect(spy).toHaveBeenCalledWith("http://localhost:3001/register", header);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();

    expect(status).toBe(400);
  });
});
