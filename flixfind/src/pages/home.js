import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
// import { Header, Table, Rating } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'; 
import '@ant-design/compatible/assets/index.css';
// import { Rate } from 'antd';
// import { Table, Tag, Space, Checkbox, Slider, Radio, Typography } from 'antd';
// import { Row, Col } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// import axios from 'axios'
import MovieTable from '../Components/MovieTable';
import './Title.css';

function HomePage() {
  return (
    <div className="App">
      <div className="Title">
        <h1>FlixFind+</h1>
      </div>
      <MovieTable></MovieTable>
    </div>
  );
}

export default HomePage;