import React from 'react';
import { render } from 'react-dom';
import './index.css';
import './style.css'


import { BrowserRouter as Router, Route} from 'react-router-dom';


import {Acceuil} from './components/Acceuil/Acceuil';



render(
  
  

  <div id="root" >
    
    <Router>
        <Acceuil/>
        
    </Router>
    
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

