import { ReactNode } from 'react';
import './style.less';

interface CardProps {
  title?: string;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

const Card: React.FC<CardProps> = (props) => {
  const { title, children, className = '', bodyClassName = '' } = props;
  return (
    <div className={`tool-card ${className}`}>
      {title && <div className="tool-card__header">{title} </div>}
      <div className={`tool-card__body ${bodyClassName}`}>{children}</div>
    </div>
  );
};

export default Card;
