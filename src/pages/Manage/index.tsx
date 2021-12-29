import { RespCodeType } from '@/constant';
import { userDelete, userList } from '@/services/ant-design-pro/api';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Popconfirm, Table } from 'antd';
import * as React from 'react';
import './index.less';

const Manager: React.FC = () => {
  const [list, setList] = React.useState<any[]>([]);

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
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: Record<string, unknown>) => {
        console.log(record);
        return (
          <div className="table-operate">
            <div className="item">
              <Popconfirm
                title="确认删除该用户吗?"
                onConfirm={async () => {
                  console.log('删除 ' + record.userId);
                  const ans = await userDelete({ userId: record.userId as number });
                  if (ans.code === RespCodeType.success) {
                    message.success('删除成功');
                    fetchUserList();
                  }
                }}
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </div>

            <Button>修改密码</Button>
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Table columns={columns} dataSource={list} />
    </PageContainer>
  );
};

export default Manager;
