import React, { useEffect } from 'react';

import { useSessionLog } from '~/src/adapters/appService/sessionLog.service';

function SessionLog() {
  const { getSessionLog } = useSessionLog();
  const [data, setData] = React.useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSessionLog();
      setData(result);
    };
    fetchData();
  }, []);

  console.log(data);


  return <></>;
}

export default SessionLog;
