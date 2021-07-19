import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
   { to: '/', text: 'Home' },
   { to: '/starred', text: 'starred' },
];

const Navs = () => {
   return (
      <div>
         <ul>
            {LINKS.map((element, index) => (
               <li key={index}>
                  <Link to={element.to}>{element.text}</Link>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Navs;
