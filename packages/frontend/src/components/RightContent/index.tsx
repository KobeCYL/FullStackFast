import { FileSearchOutlined, InfoCircleOutlined, QuestionCircleOutlined, SnippetsOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import { Tooltip } from 'antd';
import React from 'react';
import Knowledge from './components/Knowledge';
import Industry from './components/Industry';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};

export const KnowledgePointer = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      // onClick={() => {
      //   window.open('https://pro.ant.design/docs/getting-started');
      // }}
    >
      {/* <Tooltip title={'学科知识点'}>
      <FileSearchOutlined />
      </Tooltip> */}

      <Knowledge/>
    </div>
  );
};

export const IndustryPointer = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      // onClick={() => {
      //   window.open('https://pro.ant.design/docs/getting-started');
      // }}
    >
      {/* <Tooltip title={'行业介绍知识'}>
        <SnippetsOutlined />
      </Tooltip> */}

      <Industry/>
    </div>
  );
};
