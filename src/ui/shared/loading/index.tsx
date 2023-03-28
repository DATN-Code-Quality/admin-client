import { Spin } from 'antd';
import Backdrop from '../backdrop';
import './style.less';

interface LoadingProps {
  fixed?: boolean;
}
const Loading: React.FC<LoadingProps> = (props) => {
  const { fixed } = props;

  return (
    <Backdrop className="loading-backdrop">
      <Spin size="large" tip="Loading..." />
    </Backdrop>
  );
};
export default Loading;
