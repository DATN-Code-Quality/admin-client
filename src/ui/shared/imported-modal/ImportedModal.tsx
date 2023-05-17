import React from 'react';

import { Checkbox, Form, Modal } from 'antd';

import { Assignment } from '~/domain/assignment';
import { Course } from '~/domain/course';
import { User } from '~/domain/user';
import useForm from '~/hooks/useForm';
import { asyncAction, formatDate } from '~/utils';
import './ImportedModal.less';

export interface ImportedModalProps {
  visible: boolean;
  onOk: (values) => Promise<any>;
  onCancel: () => void;
  data: Course[] | User[] | Assignment[];
  id: string;
  type: 'course' | 'user' | 'assignment';
}

const ImportedModal: React.FC<ImportedModalProps> = ({
  visible,
  onOk,
  onCancel,
  data,
  id = 'id',
  type,
}) => {
  const options = data.map((item) => {
    return {
      label: '',
      value: item[id],
    };
  });

  const defaultValue = options.map((opt) => opt.value);

  const submitField = 'data';

  const handleOk = (values: any): Promise<any> => {
    const submitData: any[] = [];
    data.forEach((item) => {
      if (values[submitField].includes(item[id])) {
        submitData.push(item);
      }
    });
    return onOk({ [submitField]: submitData }).then((resp) => {
      return resp;
    });
  };

  const handleClose = () => {
    onCancel?.();
  };

  const [form] = Form.useForm();
  const { handleSubmit, isSubmitting } = useForm(form, handleOk);

  return (
    <Modal
      open={visible}
      closable
      confirmLoading={isSubmitting}
      onOk={handleSubmit}
      onCancel={handleClose}
      width="1000px"
    >
      <div className="import-modal-container">
        <div className="import-modal-title-container">
          <div className="import-modal-title-container__info">
            <div className="import-modal-title__name">Name</div>
            {type === 'user' && (
              <div className="import-modal-title__email">Email</div>
            )}
            <div className="import-modal-title__created">Created At</div>
            <div className="import-modal-title__updated">Updated At</div>
          </div>
          <div className="import-modal-title-container__actions">
            <div className="import-modal-title__actions">Import</div>
          </div>
        </div>
      </div>
      <div className="import-modal-item-container">
        <div className="import-modal-item-container__info">
          {data.map((item) => {
            return (
              <div key={item.id} className="import-modal-item">
                {/* <div className="import-modal-item__id">{item.id}</div> */}
                <div className="import-modal-item__name">{item.name}</div>
                {type === 'user' && (
                  <div className="import-modal-item__email">{item.email}</div>
                )}
                <div className="import-modal-item__created">
                  {item.createdAt &&
                    formatDate(
                      item.createdAt || Date.now(),
                      'vi-VN',
                      'DD/MM/YYYY'
                    )}
                </div>
                <div className="import-modal-item__updated">
                  {item.updatedAt &&
                    formatDate(item.updatedAt, 'vi-VN', 'DD/MM/YYYY')}
                </div>
              </div>
            );
          })}
        </div>
        <div className="import-modal-item-container__actions">
          <Form form={form} className="import-modal-item__checkboxgroup">
            <Form.Item name={submitField} initialValue={defaultValue}>
              <Checkbox.Group options={options} />
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ImportedModal;
