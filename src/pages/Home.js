import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
   const [input, setInput] = useState(undefined);
   const [results, setResults] = useState([]);

   const onInputChange = event => {
      setInput(event.target.value);
   };
   const onPressEnter = event => {
      if (event.keyCode === 13) {
         onSearch();
      }
   };
   const onSearch = async () => {
      apiGet(`/search/shows?q=${input}`).then(res => setResults(res));
   };

   const renderResults = () => {
      if (input === undefined) {
         return null;
      }
      if (results && results.length === 0) {
         return <div>No results</div>;
      }
      if (results && results.length > 0) {
         return (
            <div>
               {results.map(item => (
                  <div key={item.show.id}>{item.show.name}</div>
               ))}
            </div>
         );
      }
      return null;
   };

   return (
      <MainPageLayout>
         <input
            type="text"
            onChange={event => onInputChange(event)}
            value={input}
            onKeyDown={event => onPressEnter(event)}
         />
         <button onClick={onSearch}>Search</button>

         {renderResults()}
      </MainPageLayout>
   );
};

export default Home;
