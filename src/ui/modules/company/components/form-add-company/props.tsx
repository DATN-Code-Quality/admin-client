import React from "react";

import { IMetaFormBuilder } from "src/ui/shared/forms/FormBuilder/FormBuilder";
import UploadButton from "src/ui/shared/upload";

import { DOMAIN_API_URL, MAP_STATE_STATUS } from "src/constant";
import API, { API_UPLOAD_IMAGE } from "src/constant/api";

export const metaFormAddCompany = {
  formItemLayout: [2, 20],
  fields: [
    {
      key: "name",
      label: "Tên công ty",
      required: true,
      message: "Vui lòng nhập Tên công ty",
    },
    {
      key: "logo_url",
      label: "Logo",
      required: true,
      message: "Vui lòng upload Logo công ty",
      widget: UploadButton,
      widgetProps: {
        api: API_UPLOAD_IMAGE,
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
} as IMetaFormBuilder;
