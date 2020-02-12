import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { updateAuthInfo } from './modules/auth';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import IndexPage from './pages/IndexPage';
// User Page
import LoginPage from './pages/UserPages/LoginPage';
import SignUpPage from './pages/UserPages/SignUpPage';
import ModifyInfoPage from './pages/UserPages/ModifyInfoPage';
import FindPasswordPage from './pages/UserPages/FindPasswordPage';
// Info Page
import FaqPage from "./pages/FaqPage";
import CircleListPage from './pages/CircleListPage';
import CircleDetailPage from './pages/CircleDetailPage';
import CafeteriaMenuPage from "./pages/CafeteriaMenuPage";
import RoomListPage from './pages/RoomListPage';
import RoomDetailPage from './pages/RoomDetailPage';
import TimeTablePage from "./pages/TimeTablePage";
import BusPage from "./pages/BusPage";
// Board Page

import LostItemListPage from "./pages/LostItemListPage";
import LostItemDetailPage from "./pages/LostItemDetailPage";
// etc
import TopnavContainer from './containers/TopnavContainer';
import Footer from './components/SharedComponents/Footer/Footer'
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import page404 from './pages/404';
import PrivateRoute from './components/PrivateRoute';
import BoardPage from './pages/BoardPages/BoardPage';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: NanumBarunGothic;
    src: url('https://static.koreatech.in/assets/font/NanumBarunGothic.eot');
    src: url('https://static.koreatech.in/assets/font/NanumBarunGothic.eot?#iefix') format('embedded-opentype'),
    url('https://static.koreatech.in/assets/font/NanumBarunGothic.woff') format('woff'),
    url('https://static.koreatech.in/assets/font/NanumBarunGothic.ttf') format('truetype'),
    url('https://static.koreatech.in/assets/font/NanumBarunGothic.svg#NanumGothic') format('svg');
    src:local(※), url('https://static.koreatech.in/assets/font/NanumBarunGothic.woff') format('woff');
  }

  @font-face {
    font-family: NanumSquare;
    src: url('https://static.koreatech.in/assets/font/NanumSquareR.eot');
    src: url('https://static.koreatech.in/assets/font/NanumSquareR.eot?#iefix') format('embedded-opentype'),
    url('https://static.koreatech.in/assets/font/NanumSquareR.woff') format('woff'),
    url('https://static.koreatech.in/assets/font/NanumSquareR.ttf') format('truetype'),
    url('https://static.koreatech.in/assets/font/NanumSquareR.svg#NanumGothic') format('svg');
    src:local(※), url('https://static.koreatech.in/assets/font/NanumSquareR.woff') format('woff');
  }
  * {
    outline: none;
  }
`;

const AppWrapper = styled.div`
  padding: 0;
  text-align: center;
  font-family: NanumBarunGothic, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  min-width: 1148px;

  @media (max-width: 576px) {
    max-width: 576px;
    min-width: 360px;
    height: 100%;
  }

  max-height: ${props => props.nowFooterMenu[1] ? '600px' : '100%'};
  overflow: ${props => props.nowFooterMenu[1] ? 'hidden' : 'initial'};
`;

const Main = styled.main`
  height: calc(100% - 84px);

  @media (max-width: 576px) {
    height: calc(100% - 130px);
    min-height: calc(100% - 130px);
  }
`;


function App({ history }) {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);
  const [currentPath, setCurrentPath] = useState(history.location.pathname);
  const { nowFooterMenu } = useSelector(state => state.commonReducer);
  const onConfirm = path => {
    setDialog(false);
    if (path) history.push(path);
    else history.goBack();
  }

  useEffect(() => {
    // 자동 로그인이 켜져있을 경우.
    if (Cookies.get("token")) {
      sessionStorage.setItem("token", Cookies.get("token"));
    }
    // 글로벌 토큰, 유저정보 유지
    dispatch(updateAuthInfo(
      sessionStorage.getItem("token"), JSON.parse(sessionStorage.getItem("userInfo"))
    ));
    // sessionStorage.setItem("storeCheckbboxs", [false, false, false]);
    // sessionStorage.setItem("storeTag", null);
    // sessionStorage.setItem("storeNewFlag", true);

  }, []);

  useEffect(() => {
    history.listen((location, action) => {
      // action: push, pop...
      setCurrentPath(location.pathname);
    })
  });

  return (
    <AppWrapper nowFooterMenu={nowFooterMenu}>
      <GlobalStyle />
      <TopnavContainer history={history} path={currentPath} />
      <Main>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          {/* User Page */}
          <PrivateRoute 
            path="/login"
            component={LoginPage}
            setDialog={setDialog}
            dialog={dialog}
            onConfirm={onConfirm}
          />
          <PrivateRoute 
            path="/signup"
            component={SignUpPage}
            setDialog={setDialog}
            dialog={dialog}
            onConfirm={onConfirm}
          />
          <PrivateRoute 
            path="/modifyinfo"
            component={ModifyInfoPage}
            setDialog={setDialog}
            dialog={dialog}
            onConfirm={onConfirm}
          />
          <PrivateRoute
            path="/findpw"
            component={FindPasswordPage}
            setDialog={setDialog}
            dialog={dialog}
            onConfirm={onConfirm}
          />
          {/* Info Page */}
          <Route exact path="/circle" component={CircleListPage} />
          <Route path="/circle/:id" component={CircleDetailPage} />
          <Route exact path="/room" component={RoomListPage} />
          <Route path="/room/:id" component={RoomDetailPage} />


          <Route exact path="/lost" component={LostItemListPage}/>
          <Route path="/lost/:id" component={LostItemDetailPage}/>
    
          <Route path="/cafeteria" component={CafeteriaMenuPage} />
          <Route path="/faq" component={FaqPage} />
          <Route path="/bus" component={BusPage}/>
          <Route path="/timetable" component={TimeTablePage} />
          
          <Route path="/privacy-policy" component={PrivacyPolicyPage}/>
          {/* Board page */}
          <Route exact path="/board/:type" component={BoardPage} />
          <PrivateRoute
            path="/board/:type/:id"
            component={BoardPage}
            setDialog={setDialog}
            dialog={dialog}
            onConfirm={onConfirm}
          />
          <Route component={page404} />
        </Switch>
        <Footer path={currentPath} />
      </Main>
    </AppWrapper>
  );
}

export default App;
