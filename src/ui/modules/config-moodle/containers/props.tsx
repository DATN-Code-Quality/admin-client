import React from 'react';

export const metaFormConfigMoodle = () => {
  const meta: any = {
    formItemLayout: [6, 20],
    colon: true,
    fields: [
      {
        key: 'host',
        label: 'Host URL',
        required: true,
      },
      {
        key: 'username',
        label: 'Username',
        required: true,
      },
      {
        key: 'password',
        label: 'Password',
        required: true,
        widgetProps: {
          type: 'password',
        },
      },
      {
        key: 'serviceName',
        label: 'Service Name',
        required: true,
      },
    ],
  };
  return meta;
};
