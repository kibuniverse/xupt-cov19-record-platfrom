import { userList } from '@/services/ant-design-pro/api';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import * as React from 'react';

const Manager: React.FC = () => {
  React.useEffect(() => {
    userList().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <PageContainer>
      <Card>管理员列表</Card>
    </PageContainer>
  );
};

export default Manager;
