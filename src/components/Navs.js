import React from 'react';
import { useLocation } from 'react-router-dom';
import { LinkStyled, NavList } from './Navs.styled';

const LINKS = [
   { to: '/', text: 'Home' },
   { to: '/starred', text: 'Starred' },
];

const Navs = () => {
   const location = useLocation();
   return (
      <div>
         <NavList>
            {LINKS.map((element, index) => (
               <li key={index}>
                  <LinkStyled
                     to={element.to}
                     className={
                        element.to === location.pathname ? 'active' : ''
                     }
                  >
                     {element.text}
                  </LinkStyled>
               </li>
            ))}
         </NavList>
      </div>
   );
};

export default Navs;
