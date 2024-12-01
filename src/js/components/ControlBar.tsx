import React from 'react';
import styled from 'styled-components';
import {LocalStrings} from '../Types/types';

const BarContainer = styled.div`
    display: flex;
    flex-direction: row;

    @media (max-width: 1300px) {
        flex-direction: column;
    }
`;

const BarUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.25rem 0 0.25rem 0;
  display: flex;
  font-size: 1.25rem;
  width: 50%;
  flex-wrap: wrap;
  align-content: end;

  li {
    /* Make sure font sizes aren't overwritten */

    a {
      font-size: 1.25rem;
    }

    label {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 1300px) {
    width: 100%;
  }
`;

const SecondBarUl = styled(BarUl)`
  justify-content: flex-end;
  @media (max-width: 1300px) {
    justify-content: flex-start;
  }

  label {
    cursor: pointer;
    margin: auto 0 auto 0;
    line-height: initial;

    input {
      margin: auto 0.25rem auto 0;
      vertical-align: middle;
    }

    span {
      vertical-align: text-top;
    }
  }
`;

const BarLi = styled.li`
  display: block;
  position: relative;
  margin: auto 0.5rem auto 0.5rem;
`;

type ControlBarProps = {
    reduceMotion: boolean,
    setReduceMotion: React.Dispatch<React.SetStateAction<boolean>>,
    hideMap: boolean,
    setHideMap: React.Dispatch<React.SetStateAction<boolean>>,
    localStrings: LocalStrings,
}

const ControlBar = (props: ControlBarProps) => {
    const {
        localStrings,
        reduceMotion,
        setReduceMotion,
        hideMap,
        setHideMap
    } = props;

    return <BarContainer>
        <SecondBarUl>
            <BarLi>
                <label>
                    <input type="checkbox" checked={reduceMotion} onChange={e => setReduceMotion(e.target.checked)}/>
                    <span>{localStrings.reduceMotion}</span>
                </label>
            </BarLi>
            <BarLi>
                <label>
                    <input type="checkbox" checked={hideMap} onChange={e => setHideMap(e.target.checked)}/>
                    <span>{localStrings.hideMap}</span>
                </label>
            </BarLi>
        </SecondBarUl>
    </BarContainer>;
};

export default ControlBar;
