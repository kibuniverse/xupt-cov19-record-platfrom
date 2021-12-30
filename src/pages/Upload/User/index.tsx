import { RespCodeType } from '@/constant';
import { downloadAllUserInfo, uploadUserExcel } from '@/services/ant-design-pro/api';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Upload } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';

const UserInfo: React.FC = () => {
  React.useEffect(() => {
    downloadAllUserInfo().then((res) => {
      console.log(res);
    });
  }, []);

  const handleFileUpload = async (v: any) => {
    message.info('开始上传, 这可能需要一定的时间，请耐心等待', 1500);
    const formData = new FormData();
    formData.append('file', v.file);
    formData.append('time', dayjs().format('YYYY-MM-DD'));
    const ans = await uploadUserExcel(formData as any);
    if (ans.code === RespCodeType.success) {
      message.success('上传成功!');
    } else {
      message.error(ans.msg);
    }
  };

  return (
    <PageContainer>
      <Upload accept=".xlsx,.xls" customRequest={handleFileUpload}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </PageContainer>
  );
};

export default UserInfo;
