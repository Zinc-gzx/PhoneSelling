import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { ItemState } from "./ItemState";

const SearchBar = ({ cartArray, setCartArray }) => {

  const [data, setData] = useState([]);
  const [brands, setBrand] = useState({ list: [] });
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filteredSearchData, setFilteredSearchData] = useState([]);

  const [maxPrice, setMaxPrice] = useState(500);

  const [search, setSearch] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // For maintain the state of search value


  useEffect(() => {
    axios.get('http://localhost:8080/api/home/home', {
    }).then(function (response) {
      const temp = response;
      const temp2 = temp.data;

      setData(temp2.data.list);
      setBrand(temp2.data.brands);

    }).catch(function (error) {
      alert(error.response.data.message);
    });
  }, []);



  const handleChangeSelect = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleSliderChange = (event) => {
    setMaxPrice(event.target.value);
  };
  const handleSearch = () => {
  
      if (searchTerm && searchTerm.trim() !== '') {
        setSearch(true);
      } else {
        setSearch(false);
      }

  };


  const filteredData = data.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    i.price <= maxPrice &&
    (!selectedBrand || i.brand === selectedBrand) &&
    i.stock > 0 &&
    i.disabled === undefined
  );
  

  return search ? (
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
      <Grid item style={{ marginLeft: '30px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: '200px',
            height: '25px',
            fontSize: '16px',
          }}
        />
        <Button variant="contained" size='small' onClick={handleSearch}>Search</Button>
      </Grid>
      <Grid item style={{ marginLeft: '30px' }}>
        <select value={selectedBrand} onChange={handleChangeSelect}>
          <option value="">All</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </Grid>
      <Grid item style={{ marginLeft: '27px' }}>
        <input
          type="range"
          min="0"
          max="500"
          value={maxPrice}
          onChange={handleSliderChange}
          style={{ width: '100%' }}
        />
        <p>Max price: {maxPrice}</p >
      </Grid>
      <Grid item >
        <ItemState cartArray={cartArray} setCartArray={setCartArray} phoneList={filteredData} BestorSold={0}/>
      </Grid>
    </Grid>
  ) : (
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
      <Grid item style={{ marginLeft: '30px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: '200px',
            height: '25px',
            fontSize: '16px',
          }}
        />
        <Button variant="contained" size='small' onClick={handleSearch}>Search</Button>

      </Grid>
      <Grid item>
        <ItemState cartArray={cartArray} setCartArray={setCartArray} phoneList={filteredSearchData} BestorSold={0}/>
      </Grid>
    </Grid>
  );

};

export default SearchBar;