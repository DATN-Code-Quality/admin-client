export interface BaseDTO {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export const removeSubmitProps = (
  obj: BaseDTO,
  props: string[] = ['createdAt', 'updatedAt', 'deletedAt']
) => {
  const newObj = { ...obj };
  props.forEach((prop) => {
    delete newObj[prop];
  });
  return newObj;
};
