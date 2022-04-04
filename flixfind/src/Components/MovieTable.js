import * as React from 'react';
import { useEffect, useState } from 'react';
import '@ant-design/compatible/assets/index.css';
import { Rate, Input, Space } from 'antd';
import { Table, Tag, Checkbox, Slider, Radio } from 'antd';
import { Modal, Button } from 'antd';
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
  const { Search } = Input;
  const [search, setSearch] = useState();
  const [movieToPlatforms, setMoviesToPlatforms] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const onSearch = value => setSearch(value);
  function onChange(checkedValues) {
    if (checkedValues.includes('Netflix')) {
      setNetflix(1);
    } else {
      setNetflix(0);
    }
    if (checkedValues.includes('Hulu')) {
    } else {
    }
    if (checkedValues.includes('Prime Video')) {

    } else {
     
    }
    if (checkedValues.includes('Disney+')) {

    } else {
  
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

  const AgeButtons = () => {
    const [value, setValue] = React.useState(1);
  
    const onChange = e => {
      setValue(e.target.value);
      if (e.target.value === ('7+')) {
       
      } else if (e.target.value === ('13+')) {
      
      }  else if (e.target.value === ('16+')) {
       
      }  else if (e.target.value === ('18+')) {
   
     
      } else {
  
      }
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
    const populateMovies = [];
    const fetchMovies = async () => {
    var filters = {age_rating: null, min_year: null, max_year: null, netflix:netflix, hulu: 0, disneyplus: 0, primevideo: 0, score: null, search: search};

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
  }, [movieToPlatforms, netflix, search]);




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
    <div>
    <Search placeholder="input search text" onSearch={onSearch} enterButton />
    </div>
    <div>
    <Button type="primary" onClick={showModal}>
        View WatchList
      </Button>
    </div>
    <Modal title="Watchlist" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    <div className='movies-table'>
    <Table columns={columns} dataSource={movies} />    
    </div>
  </div>
  );
}

export default MovieTable;
