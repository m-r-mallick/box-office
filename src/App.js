import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navs from './components/Navs';
import Home from './pages/Home';
import Starred from './pages/Starred';

const App = () => {
   return (
      <React.Fragment>
         <Navs />
         <Switch>
            <Route exact path="/">
               <Home />
            </Route>
            <Route exact path="/starred">
               <Starred />
            </Route>
            <Route path="/*">ERROR</Route>
         </Switch>
      </React.Fragment>
   );
};

export default App;
