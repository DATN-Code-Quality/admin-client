import React, { memo } from 'react';

import './style.less';

interface TableToolbarProps {
  title?: string;
  children?: React.ReactNode;
}

const TableToolbar: React.FC<TableToolbarProps> = (props) => {
  const { title } = props;
  return (
    <div className="table-toolbar">
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
