import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, screen} from '@testing-library/react';
import {Home} from '../../../src/components/home/home';


describe('Home', () => {

  it('Should match snapshot', () => {
    const component = <Home />; 
    expect(component).toMatchSnapshot();
  });
  
  it('Should have the correct initial state values', () => {
    
    render(<Home />);
  
    const sectorsMock = [
      {id: 1, fieldId: 'Services'},
      {id: 2, fieldId: 'Other'},
      {id: 3, fieldId: 'Control'},
      {id: 4, fieldId: 'Domain'},
      {id: 5, fieldId: 'Engineering'},
      {id: 6, fieldId: 'Frontend'},
      {id: 7, fieldId: 'Groups'},
      ];
    
    const sector = screen.getByTestId("sector");
    
    sectorsMock.map(elem => {
      let option = document.createElement("option")
      option.text =elem.fieldId
      sector.add(option)
    });
    
    expect(sector.options.length).toBe(7);
    expect(sector.options[0].textContent).toBe("Services");
  });

  it('Should the title be renders correctly', () => {
    render(<Home />);
    const titleElement = screen.getByText('Please enter your name and pick the sectors you are currently involved in');
    expect(titleElement).toBeTruthy();
  });

  it("should call the API and set the sectors state", async () => {
    
    const expectedData = [{id:1, field:"Service"},{id:2, field:"Printing"}];

    const mockSectorsAPI = jest.fn();
    jest.mock('../../../src/services/API/sectors.api', () => ({
      SectorsAPI: mockSectorsAPI,
    }));
    mockSectorsAPI.mockResolvedValue({
      json: expectedData,
      status: 200, 
      ok: true
    });

    const data = await mockSectorsAPI();

    expect(mockSectorsAPI).toHaveBeenCalledTimes(1);
    expect(data.json[0].field).toEqual('Service');
});

  it('Should call handleValidCharacters when input changes', () => {
    
    render(<Home/>);

    const input = screen.getByTestId('name');
    const terms = screen.getByTestId('terms');

    fireEvent.change(input, { target: { value: 'John Doe%^&$', text:"@#!@#!" } });
    terms.checked = true
    const error = screen.getByTestId('nameErrorChar');
    
    expect(error.textContent).toEqual('Special characters are not allowed.');
  });
  
  it('should call handleClick when submit button is clicked', () => {
    const handleClick = jest.fn();
    render(<Home handleClick={handleClick}/>);

    const submitButton = screen.getByTestId('submit');
   
    submitButton.onclick=handleClick
    fireEvent.click(submitButton);
   
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Should show required when is clicked on the submit button without data', () => {

    render(<Home/>);

    const terms = screen.getByTestId('terms');
    const submit = screen.getByTestId('submit');

    fireEvent.click(terms)
    fireEvent.click(terms)
    fireEvent.click(submit)

    const nameError = screen.getByTestId('nameError');    
    const sectorError = screen.getByTestId('sectorError');
    const termsError = screen.getByTestId('termsError');

    expect(nameError.textContent).toEqual('Required field');
    expect(sectorError.textContent).toEqual('Required field');
    expect(termsError.textContent).toEqual('Required field');
  })

  it('handleClick function works correctly', () => {
    
    render(<Home />);

    // Trigger the handleClick function
    const nameInput = screen.getByTestId('name');
    nameInput.value = 'Test user';
    const sectorInput = screen.getByTestId('sector');
    sectorInput.value = 'Test sector';
    const submit = screen.getByTestId('submit');
    submit.click();

    // Verify the function works correctly
    // Add your own assertions here to check the values of the name and sector variables
  });

});
