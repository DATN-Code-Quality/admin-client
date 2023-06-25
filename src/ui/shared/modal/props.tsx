import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';

export enum ButtonType {
  CREATE,
  EDIT,
  DELETE,
  BLOCK,
  UNBLOCK,
}

export const MAP_BUTTON_TYPE: Record<number, string> = {
  [ButtonType.CREATE]: 'Create',
  [ButtonType.EDIT]: 'Edit',
  [ButtonType.DELETE]: 'Delete',
  [ButtonType.BLOCK]: 'Block',
  [ButtonType.UNBLOCK]: 'Unblock',
};

export const MAP_BUTTON_PROPS: Record<number, any> = {
  [ButtonType.CREATE]: {
    icon: <PlusCircleOutlined />,
    type: 'primary',
    title: '',
    children: 'Create',
  },
  [ButtonType.EDIT]: {
    size: 'small',
    type: 'primary',
    ghost: true,
    icon: <EditOutlined />,
    title: '',
  },
  [ButtonType.DELETE]: {
    size: 'small',
    type: 'danger',
    ghost: true,
    icon: <DeleteOutlined />,
    title: '',
  },
  [ButtonType.BLOCK]: {
    size: 'small',
    type: 'danger',
    ghost: true,
    icon: <LockOutlined />,
    title: '',
  },
  [ButtonType.UNBLOCK]: {
    size: 'small',
    type: 'success',
    ghost: true,
    icon: <UnlockOutlined />,
    title: '',
  },
};
