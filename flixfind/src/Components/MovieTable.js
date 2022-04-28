import * as React from 'react';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import '@ant-design/compatible/assets/index.css';
import { Rate, Input, Space } from 'antd';
import { Table, Tag, Checkbox, Slider, Radio } from 'antd';
import { Modal, Button, Card } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import FlixService from '../api';
import { NULL } from 'mysql/lib/protocol/constants/types';
import { Row, Col } from 'antd';
import './Style.css';



const MovieTable = () => {
  const { id } = useParams();
  const addToWatchList = (e) => {
    FlixService.addToWatchList(e);
  }


  const removeFromWatchList = (e) => {
    FlixService.removeFromWatchList(e);
  }

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
      render: rating => {  // {userId: 1, movieId: movie.MovieId, rating: movie.RatingScore}
        return (
          <div className='rating'><Rate defaultValue={rating.rating} onChange={(e) => onChangeRating({userId: id, movieId: rating.movieId, ratingScore: e})}>{rating.rating}</Rate> </div>
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
      dataIndex: 'action',
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => addToWatchList(record)}>Add</Button>
          <Button onClick={() => removeFromWatchList(record)}>Remove</Button>
        </Space>
      ),
    },
    
  ];

  const [netflix, setNetflix] = useState();
  const [hulu, setHulu] = useState();
  const [prime, setPrime] = useState();
  const [disney, setDisney] = useState();

  const [movies, setMovies] = useState([]);
  const { Search } = Input;
  const [search, setSearch] = useState();
  const [movieToPlatforms, setMoviesToPlatforms] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [watchList, setWatchList] = useState([]);


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

  const acclaimed = [
    { label: 'Yes', value: 'Yes' },
  ];

  const [acclaim, setAcclaimed] = useState();
  function onChangeAcclaimed(checkedValues) {
    if (checkedValues.includes('Yes')) {
      setAcclaimed(1);
      } else {
      setAcclaimed(0);
    }
  }


  const ageOptions = [
    { label: '7+', value: '7+' },
    { label: '13+', value: '13+' },
    { label: '16+', value: '16+' },
    { label: '18+', value: '18+' },
    { label: 'All', value: null },
  ];


  const [age, setAge] = useState();

  function onChangeRadio(checkedValue) {
    setAge(checkedValue.target.value);
  }


  const [score, setScore] = useState();
  function onChangeScore(value) {
    setScore(value);
  }

  function onAfterChangeScore(value) {
  }

  const [minYear, setMinYear] = useState();
  const [maxYear, setMaxYear] = useState();
  function onChangeYear(value) {
    setMinYear(value[0]);
    setMaxYear(value[1]);
  }
  function onAfterChangeYear(value) {
  }

  function onChangeRating(obj) {
    FlixService.addRating(obj);
  }


  useEffect(() => {
    const fetchPlatforms = async () => {
      const platformRes = await FlixService.getPlatforms();
      const mToP = new Map();
      platformRes.forEach(async function (x) {
        if (mToP[x.MovieId] == null) {
          mToP[x.MovieId] = []
        }
        mToP[x.MovieId].push(x.PlatformName);
      })
      setMoviesToPlatforms(mToP);
    }
    fetchPlatforms();
  }, []);

  useEffect(() => {
    const fetchWatchList = async () => {
      const watchlistRes = await FlixService.getWatchList();
      var movieTitles = [];
      watchlistRes.forEach(function (movie) {
        movieTitles.push(movie.Title);
      })
      setWatchList(movieTitles);
    }
    fetchWatchList();
  }, [isModalVisible]);



  useEffect(() => {
    const populateMovies = [];
    const fetchMovies = async () => {
      var filters = { age_rating: age, min_year: minYear, max_year: maxYear, netflix: netflix, hulu: hulu, disneyplus: disney, primevideo: prime, score: score, search: search, acclaimed:acclaim, userId: id};

      try {
        const res = await FlixService.getAllMovies(filters);
        res.forEach(async function (movie) {
          var platforms = movieToPlatforms[movie.MovieId]
          if (movieToPlatforms[movie.MovieId] == null) {
            platforms = []
          }
          var id = movie.MovieId;
          populateMovies.push({ key: movie.MovieId, title: movie.Title, ageRating: movie.AgeRating, score: movie.Score, year: movie.Year, platforms: platforms, userRating: {userId: id, movieId: id, rating: movie.RatingScore} , action: movie.MovieId });
        })
      }
      catch (e) {
      }
      setMovies(populateMovies);
    };
    fetchMovies();
  }, [movieToPlatforms, netflix, disney, hulu, prime, age, search, score, minYear, maxYear, acclaim, id]);


  return (
    <div className="App">
      <Row>
        <Col span={17} push={6}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card size="small">
          <div>
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
          </div>
        </Card>
      </Space>
          <Button type="primary" onClick={showModal}>
            View WatchList
          </Button>
          <Modal title="Watchlist" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {watchList.map((movie) => (
              <p>{movie}</p>
            ))}
          </Modal>
          <Table columns={columns} dataSource={movies} />

        </Col>
        <Col span={6} pull={17} >
        <Card size="small" >
          <div className='Filters' >
            <p>Streaming Platform</p>
            <Checkbox.Group options={platformOptions} onChange={onChange} />
            <br />
            <br />
            <p>Age Rating</p>
            <Radio.Group options={ageOptions} onChange={onChangeRadio} />
            <br />
            <br />
            <p>Score</p>
            <Slider defaultValue={30} onChange={onChangeScore} onAfterChange={onAfterChangeScore} />
            <br />
            <p>Year Released</p>
            <Slider min={1960} max={2022} range defaultValue={[2000, 2010]} onChange={onChangeYear}
              onAfterChange={onAfterChangeYear} />
            <p>Acclaimed</p>
            <Checkbox.Group options={acclaimed} onChange={onChangeAcclaimed} />
          </div>
          </Card>
        </Col>
      </Row>,
    </div>
  );
}

export default MovieTable;
