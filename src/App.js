import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./Components/Home";
import notFound from "./Components/404";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={notFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
