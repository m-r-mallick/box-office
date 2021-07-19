import React from 'react';
import { Switch, Route } from 'react-router-dom';

const App = () => {
   return (
      <React.Fragment>
         <Switch>
            <Route exact path="/">
               <h1>hello</h1>
            </Route>
         </Switch>
         <Route>ERROR</Route>
      </React.Fragment>
   );
};

export default App;
