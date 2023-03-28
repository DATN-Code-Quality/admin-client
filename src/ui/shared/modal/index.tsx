import { useEffect } from 'react';
import useDialog from '~/src/hooks/useDialog';
import { ModalProps } from 'antd/lib/modal';
import { Modal, Form } from 'antd';
import FormBuilder from '../forms';
import { IMetaFormBuilder } from '../forms/FormBuilder/FormBuilder';
import useForm from '~/src/hooks/useForm';
import { useCallback } from 'react';
import { ButtonType, MAP_BUTTON_PROPS, MAP_BUTTON_TYPE } from './props';
import { asyncAction } from '~/src/utils';
import Button from 'antd-button-color'

interface BaseModalProps extends ModalProps {
    id: string | number;
    onOkFn: (value: any, id?: any) => Promise<any>;
    onCloseFn?: () => void;
    initializeFn?: (...args) => void;
    mode: ButtonType;
    meta?: IMetaFormBuilder;
    disabledModal?: boolean;
    itemTitle?: string;
    isDelete?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = props => {
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
        onOkFn,
        initializeFn,
        cancelText = 'Huỷ',
        closeIcon = <></>,
        okText = 'Ok',
        isDelete = false,
        ...rest
    } = props;

    const title = MAP_BUTTON_TYPE[mode] + ' ' + itemTitle;
    const [form] = Form.useForm();
    const [visible, { handleClose, handleOpen }] = useDialog();

    const handleOkBtn = useCallback((values: any): Promise<any> => {
        return asyncAction(title, () => {
            return onOkFn(values, id).then(resp => {
                // if (isMounted()) {
                //     setCloseDialog();
                // }
                handleClose();
                return resp;
            });
        });
    }, []);

    const { handleSubmit, isSubmitting } = useForm(form, handleOkBtn);

    const handleCloseBtn = () => {
        onCloseFn && onCloseFn();
        handleClose();
    };

    useEffect(() => {
        if (visible && initializeFn) {
            initializeFn();
        }
    }, [visible]);

    return (
        <>
            <Button
                {...MAP_BUTTON_PROPS[mode]}
                onClick={handleOpen}
                disabled={disabledModal}
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
                        <Form form={form}>
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
