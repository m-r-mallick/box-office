import { useEffect, useReducer, useState } from 'react';
import { apiGet } from './config';

function showsReducer(prevState, action) {
   switch (action.type) {
      case 'ADD':
         return [...prevState, action.payload];
      case 'REMOVE':
         return prevState.filter(showId => showId !== action.payload);

      default:
         return prevState;
   }
}

function usePersistedReducer(reducer, initialState, key) {
   const [state, dispatch] = useReducer(reducer, initialState, initial => {
      const persisted = localStorage.getItem(key);
      return persisted ? JSON.parse(persisted) : initial;
   });

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
   }, [state, key]);

   return [state, dispatch];
}

export function useShows(key = 'shows') {
   return usePersistedReducer(showsReducer, [], key);
}

//===================================================================================//

const initialState = {
   show: null,
   isLoading: true,
   error: false,
};
function reducer(prevState, action) {
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
}
export function useShow(showId) {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      let isMounted = true;
      apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
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
   }, [showId]);
   return state;
}

//===================================================================================//

export function useLastQuery(key = 'lastQuery') {
   const [input, setInput] = useState(() => {
      const persisted = sessionStorage.getItem(key);
      return persisted ? JSON.parse(persisted) : '';
   });
   const setPersistedInput = newState => {
      setInput(newState);
      sessionStorage.setItem(key, JSON.stringify(newState));
   };

   return [input, setPersistedInput];
}
