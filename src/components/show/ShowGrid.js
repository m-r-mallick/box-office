import React from 'react';
import ShowCard from './ShowCard';
import { useShows } from '../../misc/custom-hooks';

import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from '../styled';

const ShowGrid = ({ data }) => {
   const [starredShows, dispatch] = useShows();

   return (
      <FlexGrid>
         {data.map(({ show }) => {
            const isStarred = starredShows.includes(show.id);
            const handleClick = () => {
               if (isStarred) {
                  dispatch({ type: 'REMOVE', payload: show.id });
               } else {
                  dispatch({ type: 'ADD', payload: show.id });
               }
            };
            return (
               <ShowCard
                  key={show.id}
                  id={show.id}
                  name={show.name}
                  image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
                  summary={show.summary}
                  onClick={handleClick}
                  isStarred={isStarred}
               />
            );
         })}
      </FlexGrid>
   );
};

export default ShowGrid;
