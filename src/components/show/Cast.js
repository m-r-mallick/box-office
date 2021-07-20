import React from 'react';

import IMG_PLACEHOLDER from '../../images/not-found.png';
import { CastList } from './Cast.styled';

const Cast = ({ cast }) => {
   return (
      <CastList>
         {cast &&
            cast.map(({ person, character, voice }, key) => (
               <div key={key} className="cast-item">
                  <div>
                     <img
                        className="pic-wrapper"
                        src={
                           person.image ? person.image.medium : IMG_PLACEHOLDER
                        }
                        alt="cast-person"
                     />
                  </div>
                  <div className="actor">
                     <span>
                        {person.name} | {character.name}{' '}
                        {voice ? '| Voice' : ''}
                     </span>
                  </div>
               </div>
            ))}
      </CastList>
   );
};

export default Cast;
