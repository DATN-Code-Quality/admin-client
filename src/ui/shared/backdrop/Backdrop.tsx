import React, { FC } from 'react';

import './Backdrop.less';

interface BackdropProps {
  children?: any;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const Backdrop: FC<BackdropProps> = ({
  children,
  className,
  style,
  onClick,
}) => {
  return (
    <div
      className={`custom-backdrop ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Backdrop;
