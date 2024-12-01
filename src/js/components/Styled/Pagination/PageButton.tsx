import styled from 'styled-components';
import PropTypes from 'prop-types';

interface PageButtonProps {
    $active?: string,
}

const PageButton = styled.button<PageButtonProps>`
    background-color: ${props => props.$active ? props.theme.buttonActiveBackground : props.theme.buttonBackground};
    transition: ${props => props.theme.reduceMotion ? '' : '0.5s'};
    border-radius: 0.25rem;
    margin: 0.1rem;
    padding: 0.3rem 0.6rem 0.3rem 0.6rem;
    cursor: pointer;
    font-size: 1rem;

    &:hover:not(:disabled) &:focus:not(:disabled) {
        background-color: ${props => props.theme.buttonActiveBackground};
    }

    &:disabled {
        cursor: default;
    }
`;

export default PageButton;
