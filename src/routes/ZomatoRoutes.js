import React from 'react'
import QuickSearchContainer from '../components/QuickSearchContainer.js';
import MainContainer from '../components/MainContainer.js';
import RestaurantList from '../components/RestaurantList.js';
import RestaurantDetailsPage from '../components/RestaurantDetailsPage.js';

import {Routes,Route} from 'react-router-dom';

export default function ZomatoRoutes() {
  return (
    <Routes>
    <Route path='/' element={<MainContainer/>}/>
    <Route path='/home' element={<QuickSearchContainer/>} />

    <Route path='/restaurant/list/:timingFilter' element={<RestaurantList/>} />
    <Route path='/restaurant/:code' element={<RestaurantDetailsPage/>} />
    <Route path='*' element={<h1>Error 404</h1>} />

    
    </Routes>
     
  )
}
