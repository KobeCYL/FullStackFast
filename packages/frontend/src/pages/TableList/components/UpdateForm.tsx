import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

export type FormValueType = {
  username: string;
  password?: string;
  url: string;
  isAdmin: boolean;
  id?: number;
} ;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<FormValueType>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,

      }}
      initialValues={{
      ...props.values,
      password: '',
    }} open={props.updateModalOpen} onFinish={props.onSubmit} onOpenChange={props.onCancel} >
      <ProFormText hidden label={'id'} name={'id'} />
      <ProFormText label={
        '用户名'
      }  name={'username'}/>
       <ProFormText label={
        '密码'
      } name={'password'} />
       <ProFormText label={
         'fastUrl'
       } name={'url'} />
      <ProFormSelect label={
        '科目'
      } name={'teacherType'} options={[
        { label: '语文', value: 'chinese' },
        { label: '数学', value: 'math' },
        { label: '英语', value: 'english' },

        ]} />
                    <ProFormSwitch label={'是否为管理员'} name={'isAdmin'} />

   </ModalForm>
  );
};

export default UpdateForm;
