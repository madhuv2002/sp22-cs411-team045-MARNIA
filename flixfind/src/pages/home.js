import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import '@ant-design/compatible/assets/index.css';
import 'antd/dist/antd.css'; 
import MovieTable from '../Components/MovieTable';
import './Title.css';
import { Button } from 'antd';

function HomePage() {
  return (
    <div className="App">
        <Button href='login'>Log In</Button>
      <div className="Title">
        <h1>FlixFind+</h1>
      </div>
      <MovieTable></MovieTable>
    </div>
  );
}

export default HomePage;