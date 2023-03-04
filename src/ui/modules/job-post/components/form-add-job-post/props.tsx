import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";

import CustomImage from "src/ui/shared/custom-image";
import Editor from "src/ui/shared/editor";

import {
  MAP_SALARY_TYPE,
  MAP_SALARY_TYPE_INFO,
  MAP_SALARY_UNIT,
  MAP_STATE_STATUS,
} from "src/constant";

dayjs.extend(localeData);

export const metaFormAddJobPost = ({
  companies,
  careerTypes,
  handleSelectCompany,
}) => {
  return {
    formItemLayout: [3, 20],
    fields: [
      {
        key: "company_id",
        label: "Tên Công ty",
        options:
          companies?.length > 0
            ? companies.map((item) => [item.id, item.name])
            : [],
        widget: "select",
        required: true,
        message: "Vui lòng chọn Công ty",
        widgetProps: {
          style: {
            minWidth: "12rem",
          },
          placeholder: "Chọn công ty",
        },
        onChange: (companyId) => handleSelectCompany(companyId),
      },
      {
        key: "company_logo_url",
        label: "Logo Công ty",
        widget: CustomImage,
      },
      {
        key: "career_type_id",
        label: "Ngành nghề",
        options:
          careerTypes?.length > 0
            ? careerTypes.map((item) => [item.id, item.name])
            : [],
        widget: "select",
        required: true,
        message: "Vui lòng chọn Ngành nghề",
        widgetProps: {
          style: {
            minWidth: "12rem",
          },
          placeholder: "Chọn Nghề nghiệp",
        },
      },
      {
        key: "title",
        label: "Tiêu đề",
        required: true,
        message: "Vui lòng nhập Tiêu đề",
        widgetProps: {},
      },
      {
        key: "salary_type",
        label: "Nhận lương theo",
        options: MAP_SALARY_TYPE,
        widget: "select",
        required: true,
        message: "Vui lòng chọn cách nhận lương",
        widgetProps: {
          style: {
            minWidth: "12rem",
          },
          placeholder: "Chọn cách nhận lương",
        },
      },
      {
        key: "salary_unit",
        label: "Đơn vị tiền tệ",
        options: MAP_SALARY_UNIT,
        widget: "select",
        required: true,
        message: "Vui lòng chọn Đơn vị tiền tệ",
        widgetProps: {
          style: {
            minWidth: "12rem",
          },
        },
      },
      {
        key: "salary_info_type",
        label: "Loại lương hiển thị",
        options: MAP_SALARY_TYPE_INFO,
        widget: "select",
        required: true,
        message: "Vui lòng chọn ương hiển thị",
        widgetProps: {
          style: {
            minWidth: "12rem",
          },
        },
      },
      {
        key: "salary",
        label: "Số tiền lương",
        required: true,
        message: "Vui lòng nhập Số tiền lương",
        widget: "number",
        widgetProps: {
          style: {
            width: "100%",
          },
        },
      },
      {
        key: "job_description",
        label: "Mô tả công việc",
        required: true,
        message: "Vui lòng nhập Mô tả công việc",
        widget: Editor,
      },
      {
        key: "job_requirement",
        label: "Yêu cầu công việc",
        required: true,
        message: "Vui lòng nhập Yêu cầu công việc",
        widget: Editor,
      },
      {
        key: "job_benefit",
        label: "Phúc lợi công việc",
        required: true,
        message: "Vui lòng nhập Phúc lợi công việc",
        widget: Editor,
      },
      {
        key: "job_address_detail",
        label: "Chi tiết địa chỉ",
        widgetProps: {
          style: {
            minWidth: "12rem",
          },
        },
      },
      {
        key: "state",
        label: "State",
        options: MAP_STATE_STATUS,
        widget: "select",
        required: true,
        message: "Vui lòng chọn Trạng thái",
        widgetProps: {
          style: {
            minWidth: "12rem",
          },
          placeholder: "Chọn Trạng thái",
          allowClear: true,
        },
      },
    ],
  };
};
