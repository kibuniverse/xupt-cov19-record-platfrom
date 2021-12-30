import { departments, DepartmentsEnum, RespCodeType } from '@/constant';
import { updateUserInfo, userDelete, userList } from '@/services/ant-design-pro/api';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Popconfirm, Table } from 'antd';
import * as React from 'react';
import './index.less';

const Manager: React.FC = () => {
  const [list, setList] = React.useState<any[]>([]);
  const modalFormRef = React.useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectUserInfo, setSelectUserInfo] = React.useState<Record<string, unknown>>();
  const fetchUserList = React.useCallback(async () => {
    const ans = await userList();
    if (ans.code === RespCodeType.success) {
      setList(ans.data);
    }
  }, []);

  React.useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '学院',
      dataIndex: 'department',
      filters: departments.map((item) => ({ text: DepartmentsEnum[item], value: item })),
      onFilter: (value: any, record: { department: string }) => record?.department === value,
      render: (text: string) => <div>{DepartmentsEnum[text]}</div>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: Record<string, unknown>) => {
        return (
          <div className="table-operate">
            <div className="item">
              <Button
                type="link"
                onClick={() => {
                  setModalVisible(true);
                  setSelectUserInfo(record);
                  modalFormRef.current?.setFieldsValue({ ...record });
                }}
              >
                修改信息
              </Button>
            </div>
            <div className="item">
              <Popconfirm
                title="确认删除该用户吗?"
                onConfirm={async () => {
                  const ans = await userDelete({ userId: record.userId as number });
                  if (ans.code === RespCodeType.success) {
                    message.success('删除成功');
                    fetchUserList();
                  }
                }}
              >
                <Button type="text" danger>
                  删除
                </Button>
              </Popconfirm>
            </div>
          </div>
        );
      },
    },
  ];

  const handleUpdateUserInfo = async (v: Record<string, unknown>) => {
    v.userId = selectUserInfo?.userId as number;
    const ans = await updateUserInfo(v as any);
    if (ans.code === RespCodeType.success) {
      message.success('修改成功');
      setModalVisible(false);
      fetchUserList();
    }
  };

  return (
    <PageContainer>
      <ModalForm
        title={`修改 ${selectUserInfo?.username} 信息`}
        visible={modalVisible}
        onVisibleChange={setModalVisible}
        formRef={modalFormRef}
        onFinish={handleUpdateUserInfo}
      >
        <ProFormText.Password
          width="md"
          placeholder="密码"
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入新密码' },
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
          rules={[{ pattern: /(^1[3-9]\d{9})$/, message: '请输入正确的手机号或置空' }]}
        />
      </ModalForm>
      <Table columns={columns} dataSource={list} />
    </PageContainer>
  );
};

export default Manager;
