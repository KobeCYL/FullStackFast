import { FileSearchOutlined, PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Affix, Button, Form, Input, message, Radio, RadioChangeEvent, Tooltip, Tree, TreeDataNode, TreeProps } from 'antd';
import { useState, useMemo, useEffect } from 'react';
// import dataList from './resultFlatList.json'
// import defaultData from './resultTree.json'
import dataList from '@/node-xls/output/midle_math/resultFlatList.json'
import defaultData from '@/node-xls/output/midle_math/resultTree.json'
import small_math_list from '@/node-xls/output/small_math/resultFlatList.json'
import small_math_data from '@/node-xls/output/small_math/resultTree.json'
import yuwen_list from '@/node-xls/output/yuwen/resultFlatList.json'

import yuwen_data from '@/node-xls/output/yuwen/resultTree.json'

import english_list from '@/node-xls/output/english/resultFlatList.json'

import english_data from '@/node-xls/output/english/resultTree.json'
import { useModel } from '@umijs/max';


const JsonMap = {
  'chinese': {
    list: yuwen_list,
    data: yuwen_data
  },
  'english': {
    list: english_list,
    data: english_data
  },
  'small_math':{
    list: small_math_list,
    data: small_math_data
  },
  'middle_math':{
    list: dataList,
    data: defaultData
  }
}
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
 const Knowledge = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const { initialState, setInitialState } = useModel('@@initialState');
  const options = [
    { label: '初中', value: 'middle' },
    { label: '小学', value: 'small' },
  ];
  const [value3, setValue3] = useState('small');
   
   const [list, setList] = useState([]);
   const [data, setData] = useState([]);
   const [teacherType, setTeacherType] = useState('chinese');

   
  useEffect(() => {
    const subject = initialState?.currentUser?.teacherType || 'chinese';
   
    
   
    setTeacherType(subject)
    console.log('subject', subject)
    if (subject === 'math') {
      const key = `${value3}_math`;
      setList(JsonMap[key].list)
      setData(JsonMap[key].data)
    } else {
      const {
        list: l,
        data: d
      } = JsonMap[subject] || {}
      console.log('d', d)
      setList(l);
      setData(d);
    }

  }, [initialState, value3])
   
   // 创建一个函数，用于复制传入的文本
function copyTextToClipboard(text) {
  // 检查浏览器是否支持复制功能
  if (document.queryCommandSupported('copy')) {
    try {
      // 创建一个临时的 textarea 元素
      var textarea = document.createElement('textarea');
      textarea.value = text; // 设置 textarea 的值为要复制的文本
      document.body.appendChild(textarea); // 将 textarea 添加到文档中
      textarea.select(); // 选中 textarea 中的文本
      document.execCommand('copy'); // 执行复制操作
      document.body.removeChild(textarea); // 清除临时的 textarea 元素
      message.success('文本已复制到剪贴板: ' + text);
    } catch (err) {
      message.success('无法复制文本: ' + err);
    }
  } else {
    message.error('您的浏览器不支持复制操作');
  }
}

   const knowledgeMap = useMemo(() => {
      const obj = list.reduce((prev, current) => {
        prev[current.key] = current;
        return prev;
      }, {})
     const treeObj = data.reduce((prev, current) => {
      prev[current.key] = current;
       return prev;
      },obj)
     return treeObj;
   },[list.length])

   
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
console.log('teacherType', teacherType)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = list
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, data);
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

    return data;
  }, [searchValue,list.length, data.length]);
   const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
   
  const [selectNames, setSelectNames] = useState<string[]>([]);
   
   const onCheck: TreeProps['onCheck'] = (checkedKeys, e) => {
     setCheckedKeys(checkedKeys as React.Key[]);
     const selectTotalKeys = [checkedKeys, ...(e.halfCheckedKeys || [])].map(item => {
      const name = knowledgeMap[item]?.title
       return name;
     }).reverse()

     setSelectNames(selectTotalKeys)

     


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



  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    setValue3(value);
   };
   
   console.log('treeData', treeData)
  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="选择知识点"
      resize={{
        // onResize() {
        //   console.log('resize!');
        // },
        maxWidth: window.innerWidth * 0.8,
        minWidth: 1000,
      }}
      form={form}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
        
        onClick(e) {
          e.stopPropagation();

          const target = e.target;

          const {

            innerHTML = '',
            nodeName = ''
          } = target || {}
          if(selectNames.length && innerHTML=== '确 定' && nodeName === 'SPAN'){
            copyTextToClipboard(selectNames.filter(str => str).join('-'))
            document.getElementsByClassName('ant-drawer-mask')[0].click()

          }
        }
      }}
      trigger={
        <Tooltip title={'学科知识点'}>
          <FileSearchOutlined />
      </Tooltip>
      }
      
      submitTimeout={2000}
      
      // onFinish={async (values) => {

      //   console.log('checkedKeys', checkedKeys)

      //   await waitTime(2000);
      //   console.log(values.name);
      //   message.success('提交成功');
      //   // 不返回不会关闭弹框
      //   return true;
      // }}
    >
    {
      teacherType=== 'math' && <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
    }
    

      {/* <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} /> */}
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        multiple={false}
          treeData={treeData}
          checkable
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          // selectedKeys={selectedKeys}
      />
    </DrawerForm>
  );
};

export default Knowledge;