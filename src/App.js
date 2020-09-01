import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./Components/Home";
import { Details } from "./Components/Details";
import notFound from "./Components/404";
import Header from "./Components/Header";
import Footer from './Components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/:movieId" component={Details} /> */}
        <Route path="/:movieId" render={(props) => (<Details {...props} />)} />
        <Route component={notFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
