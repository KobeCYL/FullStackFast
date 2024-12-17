import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { history } from '@umijs/max';

import { Card, theme } from 'antd';
import React, { useEffect } from 'react';
import { flushSync } from 'react-dom';
const loginPath = '/user/login';

let timer: NodeJS.Timeout | number | undefined = undefined;
const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      if (userInfo.isSameIp) {
        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            currentUser: userInfo,
          }));
        });
      } else {
        clearInterval(timer);
      }
    }
  };
  useEffect(() => {
    timer = setInterval(() => {
      fetchUserInfo();
    }, 60000)
    return () => {
      clearInterval(timer);
    }
  }, []);
  return (
    <PageContainer  pageHeaderRender={false}>
      <div>
      <iframe
          src={
            'https://c0u0fw1t0od.feishu.cn/share/base/form/shrcnwvZxeqZWZFRz4EUQm8uNlc'
        }
        style={{
          width: '100%',
          height: 'calc(100vh - 130px)',
          // minHeight: '500px',
          border: 'none',
        }}
        frameBorder="0"
        allow="microphone"
      />
      </div>
      
    </PageContainer>
  );
};

export default Welcome;

