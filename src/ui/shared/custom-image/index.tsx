import React from "react";

import { Image } from "antd";

import { LogoPlaceholder } from "src/ui/assets/images";

import { WidgetProps } from "../forms/FormBuilder/FormBuilder";

interface CustomImageProps extends WidgetProps {
  api?: string;
}

const CustomImage: React.FC<CustomImageProps> = (props) => {
  const { value } = props;

  return (
    <Image
      src={value || LogoPlaceholder}
      preview={false}
      style={{ maxWidth: "200px" }}
    />
  );
};

export default CustomImage;
