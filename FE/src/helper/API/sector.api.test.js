import SectorsAPI from "./sectors.api";

describe('SectorsAPI', () => {
  it('should return the response data', async () => {
    
    const expectedData = {a:1, b:2, c:3}; // Dummy data
    global.fetch = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(expectedData)
      });
    });

    const result = await SectorsAPI();

    expect(result).toEqual(expectedData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/sectors");
  });
});
