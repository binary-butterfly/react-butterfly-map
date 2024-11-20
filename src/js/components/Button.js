import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonFontColor};
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5rem;

  &:disabled {
    background-color: ${props => props.theme.disabledButtonBackground};
    color: ${props => props.theme.disabledButtonFontColor};
    cursor: not-allowed;
  }
`;

export default Button;
