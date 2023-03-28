import React, { useCallback } from 'react';
import { message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Store } from 'rc-field-form/lib/interface';
import logger from '../utils/logger';

export default function useForm(
    form: FormInstance,
    submitFn: (values: Store, ...params) => Promise<any>,
) {
    const { validateFields, resetFields } = form;
    const [isSubmitting, setIsSubbmiting] = React.useState<boolean>(false);

    const handleReset = useCallback(() => resetFields(), [resetFields]);

    const handleSubmit = useCallback(() => {
        setIsSubbmiting(true);

        validateFields()
            .then(() => {
                logger.info('useForm | values ', form.getFieldsValue());
                return submitFn(form.getFieldsValue())
                    .then(() => {
                        setIsSubbmiting(false);
                    })
                    .catch(error => {
                        logger.error('useForm | submitFn Fail ', error);
                        Promise.reject(error);
                    });
            })
            .catch(error => {
                message.error('Có lỗi xảy ra');
                logger.debug('useForm | submitForm Fail ', error);
                setIsSubbmiting(false);
            })
            .finally(() => {
                setIsSubbmiting(false);
            });
    }, [form, submitFn, validateFields]);

    return {
        handleSubmit,
        handleReset,
        isSubmitting,
    };
}
