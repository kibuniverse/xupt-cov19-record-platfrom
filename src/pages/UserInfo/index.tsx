import { RespCodeType } from '@/constant';
import { changePassword } from '@/services/ant-design-pro/api';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, message, Popconfirm } from 'antd';
import * as React from 'react';
import { useModel } from 'umi';

// 个人信息
const UserInfo: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  console.log(currentUser);
  const handleChangePassword = async (e: Record<string, string>) => {
    console.log(e);
    const ans = await changePassword({ password: e.password });
    if (ans.code === RespCodeType.success) {
      message.success(`修改成功，您的新密码为 ${e.password}`);
    }
  };
  return (
    <PageContainer>
      <Card>
        <ProDescriptions>
          <ProDescriptions.Item label="用户名">{currentUser?.username}</ProDescriptions.Item>
        </ProDescriptions>
        <h3>修改密码</h3>
        <ProForm
          onFinish={handleChangePassword}
          submitter={{
            render: (props) => {
              return [
                <Popconfirm title="确认修改密码吗?" onConfirm={() => props.form?.submit?.()}>
                  <Button type="primary" key="submit">
                    提交
                  </Button>
                </Popconfirm>,
                <Button key="rest" onClick={() => props.form?.resetFields()}>
                  重置
                </Button>,
              ];
            },
          }}
        >
          <ProFormText.Password
            width="md"
            placeholder="请输入新密码"
            name="password"
            label="新密码"
            rules={[{ required: true, message: '请输入密码' }]}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default UserInfo;
