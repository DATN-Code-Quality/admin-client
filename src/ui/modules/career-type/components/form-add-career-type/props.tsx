import React from "react";

import { IMetaFormBuilder } from "src/ui/shared/forms/FormBuilder/FormBuilder";
import UploadButton from "src/ui/shared/upload";

import { DOMAIN_API_URL, MAP_STATE_STATUS } from "src/constant";
import API, { API_UPLOAD_IMAGE } from "src/constant/api";

export const metaFormAddCareerType = {
  formItemLayout: [2, 20],
  fields: [
    {
      key: "name",
      label: "Tên ngành nghề",
      required: true,
      message: "Vui lòng nhập Tên",
    },
    {
      key: "parent_id",
      label: "Parent ID",
      required: true,
      message: "Vui lòng nhập Parent ID",
    },
    {
      key: "state",
      label: "Trạng thái",
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
} as IMetaFormBuilder;
