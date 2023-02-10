const {GetSessionApi} = require('../../../src/services/API/getSession.api');

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

	beforeEach(() => {  
    window.fetch = jest.fn().mockResolvedValue({
      json: async () => ([]),
      status: 200, 
      ok: true
    }); 
  })
	afterAll(() => { jest.clearAllMocks() })
  
  it('Should be called with the correct URL', async () => {
    jest.spyOn(window,'fetch').mockResolvedValue({
			json: async => [],
      status: 200, 
			ok: true
		})
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

  it("should receive status error 500 if fail", async () => {
    jest.restoreAllMocks();

    window.fetch = jest.fn().mockRejectedValueOnce(({
        status: 500,
        message: 'Internal server error, the request return',
      })
    );
    
    let error;
    try {
      await GetSessionApi(header);
    } catch (e) {
      error = e;
    }
    
    expect(error).toBeDefined();
    expect(error.status).toBe(500);
    expect(error.message).toBe('Internal server error, the request return');
    
  
  });
});
  