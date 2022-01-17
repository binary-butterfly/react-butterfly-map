import styled from 'styled-components';

export const Card = styled.div`
  margin: ${props => props.selected ? '0.25rem 1rem 1rem' : '1rem'};
  flex-shrink: 0;
  z-index: 1000;
  width: ${props => props.selected
          ? '17rem'
          : '15rem'};
`;

export const CardContent = styled.div`
  padding: ${props => props.selected ? '0.75rem' : '0.5rem'};
  font-size: ${props => props.selected ? '1.25rem' : '1rem'};
  border: 1px solid;
  border-radius: 0.25rem;
  width: 100%;
  text-align: left!important;
  overflow-x: hidden;
  overflow-wrap: anywhere;
`;
