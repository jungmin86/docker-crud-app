import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import BoardUploadPage from './views/BoardUploadPage/BoardUploadPage';
import BoardDetailPage from './views/BoardDetailPage/BoardDetailPage';
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';


//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} /> //아무나 들어갈 수 있음
          <Route exact path="/login" component={Auth(LoginPage, false)} /> //로그인한 사람은 못 들어감
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/board/upload" component={Auth(BoardUploadPage, true)} /> //로그인한 사람만 들어갈 수 잇음
          <Route exact path="/board/:boardId" component={Auth(BoardDetailPage, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
