import { DepartmentsEnum, RespCodeType } from '@/constant';
import { registerUser } from '@/services/ant-design-pro/api';
import getToken from '@/utils/get-token';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, message } from 'antd';
import * as React from 'react';
import { history } from 'umi';

const CreateUser: React.FC = () => {
  const formRef = React.useRef<ProFormInstance>();

  const handleCreateUser = async (v: Record<string, string>) => {
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
            rules={[
              { required: true, message: '请输入用户名' },
              { max: 20, message: '用户名不能超过20个字符' },
            ]}
          />
          <ProFormText.Password
            width="md"
            placeholder="密码"
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码' },
              { max: 20, message: '密码不能超过20个字符' },
            ]}
          />
          <ProFormSelect
            width="md"
            name="department"
            label="学院"
            placeholder="请选择成员所属学院"
            valueEnum={DepartmentsEnum}
          />
          <ProFormText
            width="md"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            rules={[
              { max: 11, message: '手机号格式错误' },
              { pattern: /(^1[3-9]\d{9})$/, message: '请输入正确的手机号或置空' },
            ]}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CreateUser;
