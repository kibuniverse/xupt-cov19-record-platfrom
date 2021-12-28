import { loginPath } from '@/constant';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const handleLoginOut = async () => {
    window.localStorage.removeItem('token');
    await setInitialState((s) => ({
      ...s,
      currentUser: undefined,
    }));
    history.push(loginPath);
  };
  return (
    <Space className={className}>
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://docs.qq.com/doc/DT0RIVVhFR1N0cnJO');
        }}
      >
        <QuestionCircleOutlined />
      </span>

      <Button onClick={handleLoginOut}>退出登录</Button>
    </Space>
  );
};
export default GlobalHeaderRight;
