export interface BaseDTO {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const removeSubmitProps = (
  obj: BaseDTO,
  props: string[] = ['createdAt', 'updatedAt']
) => {
  const newObj = { ...obj };
  props.forEach((prop) => {
    delete newObj[prop];
  });
  return newObj;
};
