import React from 'react';
import { Routes, Route,BrowserRouter} from 'react-router-dom';  
import GoogleFontLoader from 'react-google-font-loader';

import Home from './components/home';
import Header from './components/navigation/header';

const Routes2 = () => {
  
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" component={Home}/>
      </Routes>
      <GoogleFontLoader
        fonts={[
          { font:'Roboto', weights: [300,400,900]},
          { font: 'Fredoka One'}
        ]}
      />
    </BrowserRouter>
  )
}

export default Routes2;

