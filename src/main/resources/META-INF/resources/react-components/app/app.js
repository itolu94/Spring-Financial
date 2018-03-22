/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <Layout/>
    </BrowserRouter>
        ,document.getElementById('app'));
