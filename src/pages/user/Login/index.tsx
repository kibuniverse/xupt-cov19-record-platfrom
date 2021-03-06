import Footer from '@/components/Footer';
import { RespCodeType } from '@/constant';
import { getUserInfo, login } from '@/services/ant-design-pro/api';
import getToken from '@/utils/get-token';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { message, Tabs } from 'antd';
import React from 'react';
import { FormattedMessage, history, useIntl, useModel } from 'umi';
import styles from './index.less';

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const token = getToken();

  // judge localStorage token and redirect to welcome page
  React.useEffect(() => {
    (async function () {
      if (token) {
        console.log('token', token);
        const userInfo: any = (await getUserInfo(token)) || {};
        await setInitialState((s) => ({
          ...s,
          currentUser: userInfo.data,
          token,
        }));
        history.push('/welcome');
      }
    })();
  }, [setInitialState, token]);

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values });
      console.log(msg);
      if (msg.code === RespCodeType.fail) {
        message.error(msg.msg);
        return;
      }
      if (msg.code === RespCodeType.success) {
        message.success('登陆成功');
        window.localStorage.setItem('token', msg.data);
        // 类型不全，暂时用 any 代替
        const userInfo: any = (await getUserInfo(msg.data)) || {};
        await setInitialState((s) => ({
          ...s,
          currentUser: userInfo.data,
          token,
        }));
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      // 如果失败去设置用户错误信息
    } catch (error) {
      console.log(error);
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/favicon.svg" />}
          title="西邮防疫信息管理平台"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '账户密码登录',
              })}
            />
          </Tabs>

          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
