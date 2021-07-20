import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
   const { id } = useParams();
   const [show, setShow] = useState(null);

   useEffect(() => {
      apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(res =>
         setShow(res)
      );
   }, [id]);

   return (
      <div>
         This is the show page for this ID - {id}
         <pre>{JSON.stringify(show, undefined, 3)}</pre>{' '}
      </div>
   );
};

export default Show;
