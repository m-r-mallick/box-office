import React from 'react';
import { Link } from 'react-router-dom';
import { SearchCard, Star } from '../styled';

const ShowCard = ({ id, image, name, summary, onClick, isStarred }) => {
   const summaryAsText = summary
      ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')}...`
      : 'No description';

   return (
      <SearchCard>
         <div className="img-wrapper">
            <img src={image} alt="show" />
         </div>

         <h3>{name}</h3>

         <p>{summaryAsText}</p>

         <div>
            <Link to={`/show/${id}`}>Read more</Link>
            <button type="button" onClick={() => onClick()}>
               <Star active={isStarred} />
            </button>
         </div>
      </SearchCard>
   );
};

export default ShowCard;
