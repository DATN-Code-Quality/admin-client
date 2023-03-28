import { Modal } from 'antd';

import { Threshold } from '~/domain/partner';
import { formatDate } from '~/utils';
import './ThresholdModal.less';

export interface ThresholdModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  data: Threshold[];
}

const ThresholdModal: React.FC<ThresholdModalProps> = ({
  visible,
  onOk,
  onCancel,
  data,
}) => {
  return (
    <Modal
      open={visible}
      closable
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      <div className="threshold-container">
        <div className="threshold-title">
          <div className="threshold-title__model">Model</div>
          <div className="threshold-title__value">Threshold</div>
          <div className="threshold-title__time">Update Date</div>
        </div>
      </div>
      {data.map((item) => {
        return (
          <div className="threshold-item">
            <div className="threshold-item__model">{item.model}</div>
            <div className="threshold-item__value">{item.threshold}</div>
            <div className="threshold-item__time">
              {formatDate(item.updated_at, 'vi-VN', 'DD/MM/YYYY')}
            </div>
          </div>
        );
      })}
    </Modal>
  );
};

export default ThresholdModal;
