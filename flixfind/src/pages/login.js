import { Form, Input, Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import './Title.css';
import '@ant-design/compatible/assets/index.css';
import 'antd/dist/antd.css'; 
import './login.css';
import FlixService from '../api';
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

function showConfirm() {
  confirm({
    title: 'Account succesfully created!',
    onOk() {
      console.log('OK');
    },
  });
}

const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    const userRes = await FlixService.getUserID(values);
    console.log(userRes);
    navigate(`/home/${userRes[0].UserId}/${userRes[0].BlackListId}/${userRes[0].WatchListId}`);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinishCreate = async (values) => {
    console.log(values);
    FlixService.postUserID({username: values.username, password: values.password, age: parseInt(values.age)});
    // console.log(userIdRes[0].UserId);
    console.log('Success:', values);
    showConfirm();
  };

  const onFinishFailedCreate = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // const getUserID = (e) => {
  //   // const userIDRes = FlixService.getUserID();
  //   // setUserId(userIDRes);

  // }

  return (
      <div>
    <div className="Title">
        <h1>FlixFind+</h1>
      </div>
      <div className='title-acc'><h2>Existing Users</h2></div>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 6,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    <div className='title-acc'><h2>Create An Account</h2></div>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 6,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinishCreate}
      onFinishFailed={onFinishFailedCreate}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Age"
        name="age"
        rules={[
          {
            required: true,
            message: 'Please input your age!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

 

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default LoginPage;