import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage";

import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";

import UserDetailsPage from "./views/UserDetailsPage/UserDetailsPage";
import UserDetailsUpdatePage from "./views/UserDetailsUpdatePage/UserDetailsUpdatePage";

import AllUserDetailsPage from "./views/AllUserDetailsPage/AllUserDetailsPage";

// Sales prediction
import AddSales from "./views/Sales/AddSales";

// Trend Prediction
import AddTrend from "./views/Trend/InputForm";

// Churn Prediction
import AddChurn from "./views/Churn/Churn/churn";
import UploadChurn from "./views/Churn/ChurnUpload/Upload";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/user" component={UserDetailsPage} />
          <Route exact path="/updateUserInfo" component={UserDetailsUpdatePage} />
          
          
          <Route exact path="/user" component={Auth(UserDetailsPage, true)} />
          <Route exact path="/updateUserInfo" component={Auth(UserDetailsUpdatePage, true)} />
          <Route exact path="/AllUsers" component={Auth(AllUserDetailsPage, true)} />
          
          
          {/* Sales Routes */}

          <Route exact path="/addSales" component={Auth(AddSales, true)} />

          {/* Trend Routes */}

          <Route exact path="/addTrend" component={Auth(AddTrend, true)} />

          {/* Trend Routes */}

          <Route exact path="/addChurn" component={Auth(AddChurn, true)} />
          <Route exact path="/uploadChurn" component={Auth(UploadChurn, true)} />

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
