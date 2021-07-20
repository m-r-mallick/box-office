import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
   const { id } = useParams();
   const [show, setShow] = useState(null);
   const [isLoading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   useEffect(() => {
      let isMounted = true;
      apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
         .then(res => {
            if (isMounted) {
               setShow(res);
               setLoading(false);
            }
         })
         .catch(() => {
            setError(true);
            setLoading(false);
         });

      return () => (isMounted = false);
   }, [id]);

   return (
      <div>
         <h1>show page</h1>
         {isLoading && <h2>Loading...</h2>}
         {error}
         {!error && !isLoading && (
            <pre>{JSON.stringify(show, undefined, 3)}</pre>
         )}
      </div>
   );
};

export default Show;
