import React, { useCallback, useRef } from 'react';

import { SyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import * as XLSX from 'xlsx';

interface ExcelToObjectProps {
  handleImportModalOk: (value: Record<string, string | number>[]) => void;
  loading: boolean;
  name: string;
  handleConvertData: (
    data: Record<string, (string | number)[]>,
    columnNames: string[]
  ) => Record<string, string | number>;
  templateLink: string;
}

const ExcelToObject: React.FC<ExcelToObjectProps> = ({
  handleImportModalOk,
  loading,
  name,
  handleConvertData,
  templateLink,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: false,
      });

      const columnNames = jsonData[0] as unknown as string[];

      const objectsArray = handleConvertData(
        jsonData as unknown as Record<string, (string | number)[]>,
        columnNames
      );

      handleImportModalOk(objectsArray);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleDownload = useCallback(() => {
    const downloadLink = document.createElement('a');
    downloadLink.href = templateLink; // Replace with the correct path to your Excel template file
    downloadLink.download = 'template.xlsx'; // Specify the desired download filename
    downloadLink.target = '_blank'; // Open in a new tab
    downloadLink.rel = 'noopener noreferrer';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }, [templateLink]);

  return (
    <div className="flex items-center" style={{ gap: '16px' }}>
      <Button
        type="primary"
        icon={<SyncOutlined />}
        onClick={handleButtonClick}
        loading={loading}
      >
        {name}
      </Button>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        key={Math.random()}
        style={{ display: 'none' }}
      />
      <Button
        type="primary"
        icon={<SyncOutlined />}
        onClick={handleDownload}
        loading={loading}
      >
        Download template
      </Button>
    </div>
  );
};

export default ExcelToObject;
