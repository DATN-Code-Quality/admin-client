import React, { memo } from 'react';

import './style.less';

interface TableToolbarProps {
  title?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const TableToolbar: React.FC<TableToolbarProps> = (props) => {
  const { title, style } = props;
  return (
    <div className="table-toolbar" style={style}>
      <div className="left-wrapper">
        {title && (
          <div className="title" style={{ fontSize: '16px' }}>
            {title}
          </div>
        )}
      </div>
      <div className="right-wrapper" style={{ maxWidth: '100%' }}>
        {props.children}
      </div>
    </div>
  );
};

export default memo(TableToolbar);
