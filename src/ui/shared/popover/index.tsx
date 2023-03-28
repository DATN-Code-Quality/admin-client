import React, { useState } from 'react';

import { Popover, Button } from 'antd';

interface BasePopoverProps {
  title: string;
  content: React.ReactNode;
  btnAction: React.ReactNode;
}

const BasePopover: React.FC<BasePopoverProps> = ({
  title,
  content,
  btnAction,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <Popover
      content={content}
      title={title}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      {btnAction}
    </Popover>
  );
};

export default BasePopover;
