import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import { loginPath } from '@/constant';

const AvatarDropdown: React.FC = () => {
  const handleLoginOut = () => {
    window.localStorage.removeItem('token');
    history.push(loginPath);
  };
  return <Button onClick={handleLoginOut}>退出登录</Button>;
};

export default AvatarDropdown;
