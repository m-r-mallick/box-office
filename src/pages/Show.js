import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const initialState = {
   show: null,
   isLoading: true,
   error: false,
};
const reducer = (prevState, action) => {
   switch (action.type) {
      case 'SET_SHOW':
         return {
            ...prevState,
            show: action.payload,
         };
      case 'SET_LOADING':
         return {
            ...prevState,
            isLoading: action.payload,
         };
      case 'SET_ERROR':
         return {
            ...prevState,
            error: action.payload,
         };

      default:
         return prevState;
   }
};
const Show = () => {
   const { id } = useParams();

   const [{ show, isLoading, error }, dispatch] = useReducer(
      reducer,
      initialState
   );

   useEffect(() => {
      let isMounted = true;
      apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
         .then(res => {
            if (isMounted) {
               dispatch({ type: 'SET_SHOW', payload: res });
               dispatch({ type: 'SET_LOADING', payload: false });
            }
         })
         .catch(() => {
            dispatch({ type: 'SET_ERROR', payload: true });
            dispatch({ type: 'SET_LOADING', payload: false });
         });

      return () => (isMounted = false);
   }, [id]);

   if (isLoading) {
      return <h2>Loading...</h2>;
   }
   if (error) {
      return <h2>{error}</h2>;
   }

   return (
      <ShowPageWrapper>
         <ShowMainData
            image={show.image}
            name={show.name}
            rating={show.rating}
            summary={show.summary}
            tags={show.genre}
         />
         <InfoBlock>
            <h2>Details</h2>
            <Details
               status={show.status}
               network={show.network}
               premiered={show.premiered}
            />
         </InfoBlock>
         <InfoBlock>
            <h2>Seasons</h2>
            <Seasons seasons={show._embedded.seasons} />
         </InfoBlock>
         <InfoBlock>
            <h2>Cast</h2>
            <Cast seasons={show._embedded.cast} />
         </InfoBlock>
      </ShowPageWrapper>
   );
};

export default Show;
