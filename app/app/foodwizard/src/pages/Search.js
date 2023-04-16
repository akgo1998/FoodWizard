import Axios from 'axios';
import { useState } from "react";
import ReactDOM from "react-dom";
import React, { Component } from 'react';
import SearchFilters from '../components/SearchFilters';
import AdvancedQuery1 from '../components/adv1';
import AdvancedQuery2 from '../components/adv2';
import StoredProcedure from '../components/StoredProcedure';
import './Page.css'
import Home from './Home.js';

const Search = () => {
    return (
        <><Home />
        <div className='background'>
            {/* <div class="child"> */}
                <SearchFilters />
                <br></br>
                <hr></hr>
                <AdvancedQuery1 />
                <br></br>
                <hr></hr>
                <AdvancedQuery2 />
                <br></br>
                <hr></hr>
                <StoredProcedure />
            {/* </div> */}
        </div></>
    );
}
  
export default Search;
