import * as React from 'react';
import { useEffect, useState } from 'react';
import '@ant-design/compatible/assets/index.css';
import { Rate } from 'antd';
import { Table, Tag, Space, Checkbox, Slider, Radio } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import FlixService from '../api';
import { NULL } from 'mysql/lib/protocol/constants/types';


const MovieTable = () => {
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
      title: 'User Rating',
      dataIndex: 'userRating',
      key: 'userRating',
      render: rating => {
        return (
          <Rate allowHalf defaultValue={0}>{rating}</Rate>
        );
      }
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
      userRating: 2.5,
    },
    {
      key: '2',
      title: 'Jim Green',
      ageRating: 42,
      score: 0,
      year: 'London No. 1 Lake Park',
      platforms: ['Prime Video'],
      userRating: 3,
    },
    {
      key: '3',
      title: 'Joe Black',
      ageRating: 32,
      score: 0,
      year: 'Sidney No. 1 Lake Park',
      platforms: ['Disney+', 'Hulu'],
      userRating: 2.5,
    },
  ];
  
  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }
  
  const platformOptions = [
    { label: 'Netflix', value: 'Netflix' },
    { label: 'Disney+', value: 'Disney+' },
    { label: 'Hulu', value: 'Hulu' },
    { label: 'Prime Video', value: 'Prime Video' },
  ];
  
  const ageOptions = [
    { label: '7+', value: '7+' },
    { label: '13+', value: '13+' },
    { label: '16+', value: '16+' },
    { label: '18+', value: '18+' },
    { label: 'All', value: null },
  ];

  const AgeButtons = () => {
    const [value, setValue] = React.useState(1);
  
    const onChange = e => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };
  
    return (
      <Radio.Group options={ageOptions} onChange={onChange} value={value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
    );
  };
  const [movies, setMovies] = useState([]);
  const [movieToPlatforms, setMoviesToPlatforms] = useState({});
  
  useEffect(() => {
    const fetchPlatforms = async () => {
      const platformRes = await FlixService.getPlatforms();
      const mToP = new Map();
      platformRes.forEach(async function(x) {
        mToP[x.MovieId] = x.PlatformName;
        // console.log(x);
      })
      setMoviesToPlatforms(mToP);
    }
    fetchPlatforms();
  }, []);

  useEffect(() => {
    const populateMovies = [];
    const fetchMovies = async () => {
      try {
        const res = await FlixService.getAllMovies();
      res.forEach(async function(movie) {
        // const platformObjects = await FlixService.getPlatforms(movie.MovieId);
        // const platforms = []
        // platformObjects.forEach(function(p) {
        //   platforms.push(p.PlatformName);
        // })
        // console.log(platforms);
        populateMovies.push({key: movie.MovieId, title: movie.Title, ageRating: movie.AgeRating, score: movie.Score, year: movie.Year, platforms: movieToPlatforms[movie.MovieId], userRating: 2});
      }) }
      catch (e) {
        console.log(e);
      }
      
     
      setMovies(populateMovies);
    };
    fetchMovies();
  }, [movieToPlatforms]);




  return (
    <div className="App">
    <div className='Filters'>
        <Checkbox.Group options={platformOptions} onChange={onChange} />
        <br />
        <br />
        <AgeButtons></AgeButtons>
        <br />
        <Slider defaultValue={70} />
        <Slider min={1960} max={2022} range defaultValue={[2000, 2010]} />
    </div>
    <div className='movies-table'>
    <Table columns={columns} dataSource={movies} />    
    </div>
  </div>
  );
}

export default MovieTable;
