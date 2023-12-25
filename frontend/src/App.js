import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import searchIcon from './search.svg';
import ItemsCard from './ItemsCard';
// import { response } from '../../backend/API/app';

// const Products = require('./mongo-db');

function App() {
  const [backendData, setBackendData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [olderData,setolderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/testAmazon");
          
        setBackendData(response.data)
        setolderData(response.data)
          
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    
  }, []);  

  const searchItems = async (e,title) => {

    
    e.preventDefault();
    setSearchTerm(title);
    let newData = [];
    let olderdata = [];

    for(let i = 0; i < backendData.length; i++) {
        if(backendData[i].Title.replace("        ","").toLowerCase().includes(title)) {

         newData.push(backendData[i]);
         setBackendData(newData);

        }

        if(Object.keys(title).length === 0){
          for(let i = 0; i < olderData.length; i++) {
            olderdata.push(olderData[i]);
          }
          setBackendData(Array.from(new Set(olderdata)));
          
      }}
  };

  return (
    <div className='app'>
      <h1> Scraper </h1>

      <div className='search'>
        <input
          placeholder='Search for Items'
          value={searchTerm}
          onChange={(e) => searchItems(e, e.target.value)}
        />
        {/* <img
          src={searchIcon}
          alt='search'
          onClick={(e) => searchItems(e, searchTerm)}
        /> */}
      </div>

      {backendData.length > 0 ? (
        <div className='container'>

           {backendData.map((key, data) => {
              return <ItemsCard key={key} items={backendData[data]}/>
           })}

        </div>
      ) : (

        <div>Loading...</div>

      )}
    </div>
  );
}

export default App;
