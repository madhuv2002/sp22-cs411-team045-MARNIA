import logo from './logo.svg';
import './App.css';
import React from 'react';
// import { Header, Table, Rating } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'; 
import '@ant-design/compatible/assets/index.css';

import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: 'Age Rating',
    dataIndex: 'ageRating',
    key: 'ageRating',
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: 'Platforms',
    key: 'platforms',
    dataIndex: 'platforms',

    render: tags => (
      <>
        {tags.map(tag => {
          let color = 'white';
          if (tag === 'Netflix') {
            color = 'red';
          }
          if (tag === 'Hulu') {
            color = 'green';
          }
          if (tag === 'Disney+') {
            color = 'geekblue';
          }
          if (tag === 'Prime Video') {
            color = 'blue'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Add {record.name}</a>
        <a>Remove</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    title: 'John Brown',
    ageRating: 32,
    score: 0,
    year: 'New York No. 1 Lake Park',
    platforms: ['Netflix', 'Hulu'],
  },
  {
    key: '2',
    title: 'Jim Green',
    ageRating: 42,
    score: 0,
    year: 'London No. 1 Lake Park',
    platforms: ['Prime Video'],
  },
  {
    key: '3',
    title: 'Joe Black',
    ageRating: 32,
    score: 0,
    year: 'Sidney No. 1 Lake Park',
    platforms: ['Disney+', 'Hulu'],
  },
];

function App() {
  return (
    <div className="App">
      <div className='movies-table'>
      <Table columns={columns} dataSource={data} />    
      </div>
    </div>
  );
}

export default App;
