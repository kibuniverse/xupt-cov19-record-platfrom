import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage = '· 计算机学院 · 移动应用开发实验室';
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'xiyoumobile',
          title: 'xiyoumobile',
          href: 'https://mobile.xupt.edu.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/XiyouMobile',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
