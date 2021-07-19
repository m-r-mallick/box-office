import React from 'react';
import ActorCard from './ActorCard';

import IMAGE_NOT_FOUND from '../../images/not-found.png';

const ActorGrid = ({ data }) => {
   return (
      <div>
         {data.map(({ person }) => (
            <ActorCard
               key={person.id}
               name={person.name}
               image={person.image ? person.image.medium : IMAGE_NOT_FOUND}
               gender={person.gender}
               country={person.country ? person.country.name : null}
               birthday={person.birthday}
               deathday={person.deathday || null}
            />
         ))}
      </div>
   );
};

export default ActorGrid;
