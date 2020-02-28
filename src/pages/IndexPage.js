import React, {useEffect, useState} from 'react'
import styled from "styled-components";

import IndexTopBoardContainer from "../containers/IndexContainers/IndexTopBoardContainer";
import IndexBusContainer from "../containers/IndexContainers/IndexBusContainer";
import IndexCafeteriaContainer from "../containers/IndexContainers/IndexCafeteriaContainer";
import IndexRecommendContainer from "../containers/IndexContainers/IndexRecommendContainer";
import IndexBoardListContainer from "../containers/IndexContainers/IndexBoardListContainer";
import IndexMarketContainer from '../containers/IndexContainers/IndexMarketContainer';
import IndexCardNewsContainer from "../containers/IndexContainers/IndexCardNewsContainer";

const Container = styled.div`
  width: 1132px;
  margin: 0 auto;
  padding: 40px 0 50px 0;
  
  @media(max-width: 576px){
    padding: 16px 16px 55px 16px;
    width: calc(100% - 32px);
  }
`;

const IndexRow = styled.div`
  margin-top: ${props => props.top ? "0" : "40px"};
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  
  @media(max-width: 576px){
    margin-top: 0;
  }
`;

const CardList = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media(max-width: 576px){
    display: none;
  }
`;

const BoardList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media(max-width: 576px){
    display: none;
  }
`;

export default function IndexPage({history}) {
  const [mobileFlag, changeMobileFlag] = useState(false);

  const setMobileFlag = width => {
    if(width < 576) {
      changeMobileFlag(true);
    } else changeMobileFlag(false);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      setMobileFlag(window.innerWidth);
    })
  }, []);

  useEffect(() => {
    setMobileFlag(window.innerWidth);
  },[]);

  return (
    <Container>
      {mobileFlag &&
        <IndexRow>
          <IndexBusContainer history={history}/>
        </IndexRow>
      }

      <IndexRow top>
        <IndexTopBoardContainer history={history}/>
      </IndexRow>

      <IndexRow>
        <CardList>
          <IndexRecommendContainer history={history}/>
          <IndexBusContainer history={history}/>
          <IndexCafeteriaContainer history={history}/>
        </CardList>
      </IndexRow>

      <IndexRow>
        <BoardList>
          <IndexBoardListContainer history={history}/>
          <IndexCardNewsContainer />
        </BoardList>
      </IndexRow>

      <IndexRow>
        <IndexMarketContainer history={history}/>
      </IndexRow>
    </Container>
  )
}
