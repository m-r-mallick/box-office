import React from 'react';
import Navs from './Navs';
import Title from './Title';
const MainPageLayout = ({ children }) => {
   return (
      <React.Fragment>
         <Navs />
         <Title
            title="Box Office"
            subtitle="Are you looking for a movie or an actor?"
         />
         <h1>{children}</h1>
      </React.Fragment>
   );
};

export default MainPageLayout;
