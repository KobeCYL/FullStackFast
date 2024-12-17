import { FileSearchOutlined, PlusOutlined, SnippetsOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Affix, Button, Form, Input, message, Tooltip, Tree, TreeDataNode, TreeProps } from 'antd';
import { useState, useMemo } from 'react';
// import dataList from './resultFlatList.json'
// import defaultData from './resultTree.json'
import dataList from '@/node-xls/output/yuwen/resultFlatList.json'
import defaultData from '@/node-xls/output/yuwen/resultTree.json'
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const { Search } = Input;




const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};
 const Industry = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const treeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data.map((item) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span key={item.key}>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span key={item.key}>{strTitle}</span>
          );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });

    return loop(defaultData);
  }, [searchValue]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
   
   const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

   const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
     const currentIndex = checkedKeys.indexOf(info.node.key)
     if (currentIndex > -1) {
       const newList = [...checkedKeys]
       newList.splice(currentIndex, 1)
       setCheckedKeys(newList)
     } else {
      setCheckedKeys([...checkedKeys, ...selectedKeysValue] as React.Key[]);
       
    }
   };
   
   // 创建一个函数，用于复制用户划选的文本
function copySelectedText() {
  // 检查浏览器是否支持复制功能
  if (document.queryCommandSupported('copy')) {
    try {
      // 执行复制操作
      document.execCommand('copy');
      message.success('划选的文本已复制到剪贴板');
      // document.getElementsByClassName('ant-drawer-mask')[0].click()

    } catch (err) {
      message.error('无法复制文本: ' + err);
    }
  } else {
    message.error('您的浏览器不支持复制操作');
  }
}
  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="行业介绍知识"
      resize={{
        onResize() {
          console.log('resize!');
        },
        maxWidth: window.innerWidth * 0.8,
        minWidth: 800,
      }}
      form={form}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
        placement: 'left',
        onClick(e) {
          e.stopPropagation();

          const target = e.target;

          const {

            innerHTML = '',
            nodeName = ''
          } = target || {}
          if (innerHTML === '确 定' && nodeName === 'SPAN') {
            
                  document.getElementsByClassName('ant-drawer-mask')[0].click()

            // message.success('点击了')
            // copySelectedText()
          }
        }
      }}
      trigger={
        <Tooltip title={'行业介绍知识'}>
        <SnippetsOutlined />
      </Tooltip>
      }
      submitTimeout={2000}
      // onFinish={async (values) => {
      //   await waitTime(2000);
      //   console.log(values.name);
      //   message.success('提交成功');
      //   // 不返回不会关闭弹框
      //   return true;
      // }}
    >
      {/* <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
          treeData={treeData}
          checkable
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          // selectedKeys={selectedKeys}
      /> */}

        <iframe
          src={
             'http://www.new123.vip:6001'
        }
        style={{
          width: '100%',
          height: 'calc(100vh - 200px)',
          // minHeight: '500px',
          border: 'none',
        }}
        frameBorder="0"
        allow="microphone"
      />
      {/* </div> */}
    </DrawerForm>
  );
};

export default Industry;