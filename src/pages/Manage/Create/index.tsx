import { RespCodeType } from '@/constant';
import { registerUser } from '@/services/ant-design-pro/api';
import getToken from '@/utils/get-token';
import { verifyPassword, verifyUserName } from '@/utils/verify';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, message } from 'antd';
import * as React from 'react';
import { history } from 'umi';

const CreateUser: React.FC = () => {
  const formRef = React.useRef<ProFormInstance>();
  const handleCreateUser = async (v: Record<string, string>) => {
    if (!verifyUserName(v.username) || !verifyPassword(v.password)) {
      message.error('用户名或密码长度不能超过20个字符');
      return;
    }
    v.token = getToken();
    const res = await registerUser(v as any);
    if (res?.code === RespCodeType.success) {
      message.success('创建成功');
      formRef?.current?.resetFields();
      history.push('/manage/user-list');
    } else {
      message.error(res.msg);
    }
  };
  return (
    <PageContainer>
      <Card>
        <ProForm formRef={formRef} onFinish={handleCreateUser}>
          <ProFormText
            width="md"
            placeholder="用户名"
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          />
          <ProFormText.Password
            width="md"
            placeholder="密码"
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CreateUser;
