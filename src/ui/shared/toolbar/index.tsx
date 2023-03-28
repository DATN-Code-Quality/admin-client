import { memo } from 'react';

interface TableToolbarProps {
  title?: string;
  children?: React.ReactNode;
}

const TableToolbar: React.FC<TableToolbarProps> = (props) => {
  const { title } = props;
  return (
    <div
      className="table-toolbar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '24px',
        alignItems: 'center',
      }}
    >
      <div className="left-wrapper">
        {title && (
          <div className="title" style={{ fontSize: '16px' }}>
            {title}
          </div>
        )}
      </div>
      <div className="right-wrapper">{props.children}</div>
    </div>
  );
};

export default memo(TableToolbar);
