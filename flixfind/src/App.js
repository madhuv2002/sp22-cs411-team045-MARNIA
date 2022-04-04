import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
// import { Header, Table, Rating } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'; 
import '@ant-design/compatible/assets/index.css';
import { Rate } from 'antd';
import { Table, Tag, Space, Checkbox, Slider, Switch } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import axios from 'axios'
import MovieTable from './Components/MovieTable';

// useEffect(() => {
//   const fetchMovies = async () => {
//     const movie_data = await axios.get('http://35.224.49.56/movies');
//     console.log(movie_data);
//   }
//   fetchMovies();
// }, []);

// const columns = [
//   {
//     title: 'Title',
//     dataIndex: 'title',
//     key: 'title',
//     render: text => <a>{text}</a>,
//   },
//   {
//     title: 'Score',
//     dataIndex: 'score',
//     key: 'score',
//   },
//   {
//     title: 'Age Rating',
//     dataIndex: 'ageRating',
//     key: 'ageRating',
//   },
//   {
//     title: 'Year',
//     dataIndex: 'year',
//     key: 'year',
//   },
//   {
//     title: 'User Rating',
//     dataIndex: 'userRating',
//     key: 'userRating',
//     render: rating => {
//       return (
//         <Rate allowHalf defaultValue={0}>{rating}</Rate>
//       );
//     }
//   },
//   {
//     title: 'Platforms',
//     key: 'platforms',
//     dataIndex: 'platforms',

//     render: tags => (
//       <>
//         {tags.map(tag => {
//           let color = 'white';
//           if (tag === 'Netflix') {
//             color = 'red';
//           }
//           if (tag === 'Hulu') {
//             color = 'green';
//           }
//           if (tag === 'Disney+') {
//             color = 'geekblue';
//           }
//           if (tag === 'Prime Video') {
//             color = 'blue'
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (text, record) => (
//       <Space size="middle">
//         <a>Add {record.name}</a>
//         <a>Remove</a>
//       </Space>
//     ),
//   },
// ];

// const data = [
//   {
//     key: '1',
//     title: 'John Brown',
//     ageRating: 32,
//     score: 0,
//     year: 'New York No. 1 Lake Park',
//     platforms: ['Netflix', 'Hulu'],
//     userRating: 2.5,
//   },
//   {
//     key: '2',
//     title: 'Jim Green',
//     ageRating: 42,
//     score: 0,
//     year: 'London No. 1 Lake Park',
//     platforms: ['Prime Video'],
//     userRating: 3,
//   },
//   {
//     key: '3',
//     title: 'Joe Black',
//     ageRating: 32,
//     score: 0,
//     year: 'Sidney No. 1 Lake Park',
//     platforms: ['Disney+', 'Hulu'],
//     userRating: 2.5,
//   },
// ];

// function onChange(checkedValues) {
//   console.log('checked = ', checkedValues);
// }

// const platformOptions = [
//   { label: 'Netflix', value: 'Netflix' },
//   { label: 'Disney+', value: 'Disney+' },
//   { label: 'Hulu', value: 'Hulu' },
//   { label: 'Prime Video', value: 'Prime Video' },
// ];

// const ageOptions = [
//   { label: '7+', value: '7+' },
//   { label: '13+', value: '13+' },
//   { label: '16+', value: '16+' },
//   { label: '18+', value: '18+' },
// ];


function App() {
  return (
    <div className="App">
      <MovieTable></MovieTable>
      {/* <div className='Filters'>
          <Checkbox.Group options={platformOptions} defaultValue={['Pear']} onChange={onChange} />
          <br />
          <br />
          <Checkbox.Group options={ageOptions} defaultValue={['Pear']} onChange={onChange} />
          <br />
          <Slider defaultValue={70} />
          <Slider min={1960} max={2022} range defaultValue={[2000, 2010]} />
      </div>
      <div className='movies-table'>
      <Table columns={columns} dataSource={data} />    
      </div> */}
    </div>
  );
}

export default App;
