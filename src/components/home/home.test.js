import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
  it('renders the inputs and sets their value to empty', () => {
    render(<Home />);
    const nameInput = screen.getByTestId('name');
    const sectorSelect = screen.getByTestId('sector');
    const termsCheckbox = screen.getByTestId('terms');
    
    expect(nameInput.value).toBe('');
    expect(sectorSelect.selectedOptions.length).toBe(0);
    expect(termsCheckbox.checked).toBe(false);
  });
});

  