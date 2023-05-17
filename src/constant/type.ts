export type Filter = Partial<{
  service_type: number;
  start_time: number;
  end_time: number;
  partner_ids: number[];
  error_codes: number[];
  image_type: number;
}>;

export type ListItem = {
  value: number | string;
  label: string;
  disabled?: boolean;
};

export type List = ListItem[];
