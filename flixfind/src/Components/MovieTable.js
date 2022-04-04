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

  // const [filter, setFilters] = useState({age_rating: null, min_year: null, max_year: null, netflix:0, hulu: 0, disneyplus: 0, primevideo: 0, score: null});
  const [netflix, setNetflix] = useState();
  const [hulu, setHulu] = useState();
  const [prime, setPrime] = useState();
  const [disney, setDisney] = useState();
  
  const [movies, setMovies] = useState([]);
  const [movieToPlatforms, setMoviesToPlatforms] = useState({});
  function onChange(checkedValues) {
    console.log("ON CHANGE");
    if (checkedValues.includes('Netflix')) {
      setNetflix(1);
    } else {
      setNetflix(0);
    }
    if (checkedValues.includes('Hulu')) {
      setHulu(1);
    } else {
      setHulu(0);
    }
    if (checkedValues.includes('Prime Video')) {
      setPrime(1);
    } else {
      setPrime(0);
    }
    if (checkedValues.includes('Disney+')) {
      setDisney(1);
    } else {
      setDisney(0);
    }
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


  const [age, setAge] = useState();
  
  const AgeButtons = () => {
    const [value, setValue] = React.useState();
  
    const onClick = e => {
      setValue(e.target.value);
      setAge(value);
    };

    return (
      <Radio.Group options={ageOptions} onClick={() => console.log("Should me logged")} value={value}>
        <Radio.Button
        onClick={() => console.log("Should be logged")}>
      </Radio.Button>
      </Radio.Group>
    );
  };
  
  useEffect(() => {
    const fetchPlatforms = async () => {
      const platformRes = await FlixService.getPlatforms();
      const mToP = new Map();
      platformRes.forEach(async function(x) {
        if (mToP[x.MovieId]== null) {
          mToP[x.MovieId] = []
        }
        mToP[x.MovieId].push(x.PlatformName);
      })
      setMoviesToPlatforms(mToP);
    }
    fetchPlatforms();
  }, []);

  useEffect(() => {
    console.log("movies useeffect");
    const populateMovies = [];
    const fetchMovies = async () => {
    var filters = {age_rating:age, min_year: null, max_year: null, netflix:netflix, hulu:hulu, disneyplus:disney, primevideo:prime, score: null};

      try {
        const res = await FlixService.getAllMovies(filters);
      res.forEach(async function(movie) {
        // const platformObjects = await FlixService.getPlatforms(movie.MovieId);
        // const platforms = []
        // platformObjects.forEach(function(p) {
        //   platforms.push(p.PlatformName);
        // })
       var platforms = movieToPlatforms[movie.MovieId]
       if (movieToPlatforms[movie.MovieId] == null) {
         platforms = []
       }
        populateMovies.push({key: movie.MovieId, title: movie.Title, ageRating: movie.AgeRating, score: movie.Score, year: movie.Year, platforms: platforms, userRating: 2});
      }) }
      catch (e) {
        console.log(e);
      }  
      setMovies(populateMovies);
    };
    fetchMovies();
  }, [movieToPlatforms, netflix, disney, hulu, prime, age]);


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
