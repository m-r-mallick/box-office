import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ActorGrid from '../components/actor/ActorGrid';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';

const Home = () => {
   const [input, setInput] = useLastQuery(undefined);
   const [results, setResults] = useState([]);
   const [searchOption, setSearchOption] = useState('shows');

   const isSearchOptionShows = searchOption === 'shows';

   const onInputChange = event => {
      setInput(event.target.value);
   };
   const onPressEnter = event => {
      if (event.keyCode === 13) {
         onSearch();
      }
   };
   const onSearch = async () => {
      apiGet(`/search/${searchOption}?q=${input}`).then(res => setResults(res));
   };

   const renderResults = () => {
      if (input === undefined) {
         return null;
      }
      if (results && results.length === 0) {
         return <div>No results</div>;
      }
      if (results && results.length > 0) {
         return results[0].show ? (
            <ShowGrid data={results} />
         ) : (
            <ActorGrid data={results} />
         );
      }
      return null;
   };

   const onRadioChange = event => {
      setSearchOption(event.target.value);
   };

   return (
      <MainPageLayout>
         <input
            type="text"
            placeholder="Search for something..."
            onChange={event => onInputChange(event)}
            value={input}
            onKeyDown={event => onPressEnter(event)}
         />
         <div>
            <label htmlFor="shows-search">
               Shows
               <input
                  id="shows-search"
                  type="radio"
                  value="shows"
                  checked={isSearchOptionShows}
                  onChange={event => {
                     onRadioChange(event);
                  }}
               />
            </label>
            <label htmlFor="actors-search">
               Actors
               <input
                  id="actors-search"
                  type="radio"
                  value="people"
                  checked={!isSearchOptionShows}
                  onChange={event => {
                     onRadioChange(event);
                  }}
               />
            </label>
         </div>
         <button onClick={onSearch}>Search</button>

         {renderResults()}
      </MainPageLayout>
   );
};

export default Home;
