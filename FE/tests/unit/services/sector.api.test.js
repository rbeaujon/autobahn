const {SectorsAPI} = require("../../../src/services/API/sectors.api");


describe('SectorsAPI', () => {

  const expectedData = {a:1, b:2, c:3}; // Dummy data
	beforeEach(() => {  
    window.fetch = jest.fn().mockResolvedValue({
      json: async () => (expectedData),
      status: 200, 
      ok: true
    }); 
  })
	afterAll(() => { jest.clearAllMocks() })

  it('should return the response data', async () => {
    
 
    const spy = jest.spyOn(window, 'fetch');
    const resp = await SectorsAPI();

    expect(resp).toEqual(expectedData);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("http://localhost:3001/sectors");
  });
});
