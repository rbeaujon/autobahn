const {registerData} = require('../../../src/services/API/registerData.api');

describe('registerData', () => {
 
  const requestData = {
    "userId": 'John Doe',
    "fieldId": [1,4,78],
    "session": '201283%@918023'
    
  };

  const header = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  };

  
  beforeEach(() => {
    window.fetch = jest.fn().mockResolvedValue({
			json: async => [],
      status: 201, 
			ok: true
		})
  })
	afterAll(() => { jest.clearAllMocks() })


  it('should make a successful call to the API', async () => {

    const spy = jest.spyOn(window, 'fetch');
    const resp = await registerData(header);
    expect(spy).toHaveBeenCalledWith("http://localhost:3001/register", header);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();

    expect(resp.status).toBe(201);
  });

  it('should return an error if the call to the API fails', async () => {

    jest.restoreAllMocks();

    window.fetch = jest.fn().mockRejectedValueOnce(({
        status: 500,
        message: 'Internal server error, the request return',
      })
    );
    
    let error;
    try {
      await registerData(header);
    } catch (e) {
      error = e;
    }
    const url = "http://localhost:3001/register";
    const spy = jest.spyOn(global, 'fetch');

    expect(spy).toHaveBeenCalledWith(url, header);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(error).toBeDefined();
    expect(error.status).toBe(500);
    expect(error.message).toBe('Internal server error, the request return');
  });
});
