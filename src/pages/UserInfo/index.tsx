import { DepartmentsEnum, RespCodeType } from '@/constant';
import { changePassword } from '@/services/ant-design-pro/api';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Descriptions, message, Popconfirm, Row } from 'antd';
import * as React from 'react';
import { useModel } from 'umi';

// 个人信息
const UserInfo: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  console.log(currentUser);
  const handleChangePassword = async (e: Record<string, string>) => {
    const ans = await changePassword({ password: e.password });
    if (ans.code === RespCodeType.success) {
      message.success(`修改成功，您的新密码为 ${e.password}`);
    }
  };
  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={8}>
          <Card title={<h3>个人信息</h3>} bordered={false}>
            <Descriptions>
              <Descriptions.Item label="用户名">{currentUser?.username}</Descriptions.Item>
              <Descriptions.Item label="手机号">{currentUser?.phone}</Descriptions.Item>
              <Descriptions.Item label="所属学院">
                {DepartmentsEnum[currentUser?.department || 0]}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={8}>
          <Card title={<h3>修改密码</h3>} bordered={false}>
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
                rules={[
                  { required: true, message: '请输入密码' },
                  { max: 20, message: '密码不能超过20位' },
                ]}
              />
            </ProForm>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default UserInfo;
