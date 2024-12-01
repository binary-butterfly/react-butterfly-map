import styled from 'styled-components';

const PaginationMeta = styled.span`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 1rem;

    div {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        label {
            margin-top: auto;
            margin-bottom: auto;
        }

        select {
            background-color: transparent;
            border: 1px solid;
            border-radius: 0.25rem;
            margin-right: 0.5rem;
            cursor: pointer;
            padding: 0.25rem;
        }

        span {
            margin: auto 0 auto auto;
        }

    }
`;

export default PaginationMeta;
