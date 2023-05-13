import React, { useEffect, useState } from "react";
//import {Navbar, Container, Row, Col, FormControl, Button, InputGroup } from 'react-bootstrap';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios';
import { ItemState } from "./ItemState";

const SearchBar = ({cartArray, setCartArray}) => {

  const [data, setData] = useState([]);
  const [brands, setBrand] = useState({ list: [] });
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filteredSearchData, setFilteredSearchData] = useState([]);

  const [maxPrice, setMaxPrice] = useState(500);

  const [search, setSearch] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // 用于保存搜索词的状态

  
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
    },[]);
  


  const handleChangeSelect = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleChange = (event) => {
    setMaxPrice(event.target.value);
  };
  const handleSearch = () => {
    setSearch(true);
  };

  const handleSearchOut = () => {
    setSearch(false);
  };
 
  
  const filteredData = data.filter(i => i.title.toLowerCase().includes(searchTerm.toLowerCase())).filter(i => i.price <= maxPrice).filter(i => !selectedBrand || i.brand === selectedBrand);
  
  return search ?(

      <div>

      <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Button variant="inherit" onClick={handleSearch}>Search</Button>
      </div>
        <div>

        
        <select value={selectedBrand} onChange={handleChangeSelect}>
        <option value="">All</option>
        {brands.map(brand => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
        </select>

        </div>

        <div>
      <input
        type="range"
        min="0"
        max="500"
        value={maxPrice}
        onChange={handleChange}
        style={{ width: '100%' }}
      />
      <p>Max price: {maxPrice}</p >
      </div>
      <ItemState cartArray={cartArray} setCartArray={setCartArray} phoneList={filteredData} />
      {/* <ul>
        {filteredData
          .map(i => (
            <div key={i._id}>
              <img src={`/${i.image}`} style={{ height: "100px", width: "100px" }}/>
              <p>title: {i.title}</p >
                <span style={{ fontSize: "20px", color: "red", padding: "0 20px" }}>
                price: {i.price}</span>
            </div>
        ))}
      </ul> */}
    </div>
  ) : (
    <div>
      <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button variant="contained" onClick={handleSearch}>Search</button>
      </div>
      <div>
      <ItemState cartArray={cartArray} setCartArray={setCartArray} phoneList={filteredSearchData} />
      </div>
    </div>
    
    
  );

};

export default SearchBar;