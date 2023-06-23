import React, { useEffect } from 'react';

import { Form, Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import Button from 'antd-button-color';

import FormBuilder from '../forms';
import { IMetaFormBuilder } from '../forms/FormBuilder/FormBuilder';

import { ButtonType, MAP_BUTTON_PROPS, MAP_BUTTON_TYPE } from './props';

import useDialog from '~/hooks/useDialog';
import useForm from '~/hooks/useForm';
import { asyncAction } from '~/utils';

interface BaseModalProps extends ModalProps {
  id: string | number;
  onOkFn: (value: any, id?: any) => Promise<any>;
  onOpenFn?: (...args) => void;
  onCloseFn?: () => void;
  initializeFn?: (...args) => void;
  mode: ButtonType;
  loading?: boolean;
  meta?: IMetaFormBuilder;
  disabledModal?: boolean;
  itemTitle?: string;
  isDelete?: boolean;
  formProps?: any;
}

const BaseModal: React.FC<BaseModalProps> = (props) => {
  const {
    children,
    meta,
    id,
    // okButtonProps = {},
    // cancelButtonProps = {},
    onCloseFn,
    itemTitle,
    disabledModal,
    mode,
    loading,
    onOkFn,
    onOpenFn,
    initializeFn,
    cancelText = 'Cancel',
    closeIcon = <></>,
    okText = 'Ok',
    isDelete = false,
    formProps,
    ...rest
  } = props;

  const title = MAP_BUTTON_TYPE[mode] + ' ' + itemTitle;
  const [form] = Form.useForm();
  const [visible, { handleClose, handleOpen }] = useDialog();

  const handleOkBtn = (values: any): Promise<any> => {
    return asyncAction(title, () => {
      return onOkFn(values, id).then((resp) => {
        // if (isMounted()) {
        //     setCloseDialog();
        // }
        handleClose();
        return resp;
      });
    });
  };

  const { handleSubmit, isSubmitting } = useForm(form, handleOkBtn);

  const handleCloseBtn = () => {
    onCloseFn && onCloseFn();
    handleClose();
  };

  useEffect(() => {
    if (visible && initializeFn) {
      initializeFn();
    } else {
      form.resetFields();
    }
  }, [visible]);

  return (
    <>
      <Button
        {...MAP_BUTTON_PROPS[mode]}
        onClick={() => {
          onOpenFn?.();
          handleOpen();
        }}
        disabled={disabledModal}
        loading={loading}
        className="modal-btn"
      />
      {visible && (
        <Modal
          title={title}
          onOk={handleSubmit}
          cancelText={cancelText}
          okText={okText}
          onCancel={handleCloseBtn}
          closeIcon={closeIcon}
          confirmLoading={isSubmitting}
          visible={visible}
          {...rest}
        >
          {!isDelete ? (
            <Form form={form} {...formProps}>
              <FormBuilder meta={meta} />
            </Form>
          ) : (
            children
          )}
        </Modal>
      )}
    </>
  );
};

export default BaseModal;
