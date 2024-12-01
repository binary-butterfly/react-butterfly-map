import styled from 'styled-components';

interface SidebarProps {
    height: number,
}

export const MapSidebar = styled.div<SidebarProps>`
    width: 1px;
    transition: width ${props => props.theme.reduceMotion ? '0s' : '0.5s'} ease-out;
    overflow: hidden;
    z-index: 10;
    position: absolute;
    height: ${props => props.height}px;
    background-color: ${props => props.theme.backgroundColor};
    box-sizing: border-box;
    overflow-wrap: anywhere;

    & > div {
        margin: 1rem;
        height: 95%;
        overflow: auto;
    }

    & > div > *, & > div > table tbody tr td.special-day, & > div > div > button {
        transition: ${props => props.theme.reduceMotion ? '0s' : 'color 0s 0.5s, border 0s 0.5s'};
    }

    &[data-showing=true] {
        width: 25rem;
    }

    @media (max-width: 1000px) {
        &[data-showing=true] {
            width: 90%;
        }
    }

    &[data-showing=false] > div > *, &[data-showing=false] > div > table tbody tr td.special-day, &[data-showing=false] > div > div > button {
        color: ${props => props.theme.backgroundColor} !important;
        border: none;
        transition: color 0s 0s, border 0s 0s;
    }

    &[data-showing=false] > div {
        overflow: hidden;
    }
`;
