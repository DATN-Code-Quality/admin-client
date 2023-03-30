import React from 'react';

import { Checkbox, Form, Modal } from 'antd';

import { Course } from '~/domain/course';
import { formatDate } from '~/utils';
import './ImportedModal.less';

export interface ImportedModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  data: Course[];
}

const ImportedModal: React.FC<ImportedModalProps> = ({
  visible,
  onOk,
  onCancel,
  data,
}) => {
  return (
    <Modal
      open={visible}
      closable
      onOk={onOk}
      onCancel={onCancel}
      width="1000px"
    >
      <div className="import-modal-container">
        <div className="import-modal-title">
          <div className="import-modal-title__id">Id</div>
          <div className="import-modal-title__name">Name</div>
          <div className="import-modal-title__created">Created At</div>
          <div className="import-modal-title__updated">Updated At</div>
          <div className="import-modal-title__actions">Import</div>
        </div>
      </div>
      <Form className="import-modal-item-container">
        {data.map((item) => {
          return (
            <Form.Item key={item.id}>
              <div className="import-modal-item">
                <div className="import-modal-item__id">{item.id}</div>
                <div className="import-modal-item__name">{item.name}</div>
                <div className="import-modal-item__created">
                  {formatDate(item.created_at, 'vi-VN', 'DD/MM/YYYY')}
                </div>
                <div className="import-modal-item__updated">
                  {formatDate(item.updated_at, 'vi-VN', 'DD/MM/YYYY')}
                </div>
                <div className="import-modal-item__actions">
                  <Checkbox name={item.id} defaultChecked />
                </div>
              </div>
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default ImportedModal;
