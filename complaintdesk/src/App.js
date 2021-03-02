import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch,Route} from 'react-router-dom';
import Header from './components/Header';
import Complaint from './components/Complaint';
import PastComplaints from './components/PastComplaints';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Default from './components/Default';
import ComplaintDetail from './components/ComplaintDetail';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './hocs/Layout';
import Testing from './components/Testing';


function App() {
  return (
    <div>
      <Provider store={store}>
        <Layout>
        <Switch> 
          <Route exact path='/' component={Home} />
          <Route exact path="/newcomplaint" component={Complaint} />
          <Route exact path="/pastcomplaints" component={PastComplaints} />
          <Route exact path="/complaintdetail/:pk" component={ComplaintDetail} />
          <Route exact path="/login" component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/mockApp' component={Testing} />
          <Route component={Default} />
          
        </Switch>
        </Layout>
      </Provider>
    </div>
  );
}

export default App;
