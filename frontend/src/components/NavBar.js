import React from 'react';
//import SignInButtons from './SignInButtons';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Icon } from '@mui/material';



const NavBar = () => {
  return (

    <div>
        
        {/* <Link to="/checkout">
        <Button variant="secondary">Checkout</Button>
        </Link> */}
            
        <SearchBar />
        <ShoppingCartIcon /><p>Current Quantity: </p>
        <Button color="inherit">Login</Button>
        

    </div>

  );
};

export default NavBar;