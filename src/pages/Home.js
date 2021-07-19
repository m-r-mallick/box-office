import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
   const [input, setInput] = useState('');
   const onInputChange = event => {
      setInput(event.target.value);
   };
   const onPressEnter = event => {
      if (event.keyCode === 13) {
         onSearch();
      }
   };
   const onSearch = async () => {
      const rawData = await fetch(
         `https://api.tvmaze.com/search/shows?q=${input}`
      );
      const jsonData = await rawData.json();
      console.log(jsonData);
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
      </MainPageLayout>
   );
};

export default Home;
