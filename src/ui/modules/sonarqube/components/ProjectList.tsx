import React from 'react';

import './index.less';

const ProjectList = () => {
  const { appName, isPass } = { appName: 'App 1', isPass: true };
  const values = [
    { title: 'Bugs', value: 20 },
    { title: 'Vulnerabilities', value: 1 },
    { title: 'Code Smells', value: 2 },
    { title: 'Coverage', value: '0.0%' },
    { title: 'Duplications', value: '0,0%' },
  ];
  return (
    <div className="project-item">
      <div className="info">
        <p className="name">{appName}</p>
        <p className={`result ${isPass ? 'passed' : 'failed'}`}>
          {isPass ? 'Passsed' : 'Failed'}
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {values.map((item) => (
          <div
            key={item.title}
            style={{
              fontWeight: 600,
              minWidth: '100px',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ fontSize: '15px' }}>{item.title}</p>
            <p style={{ textAlign: 'center' }}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectItem = ({ data }) => {
  const { appName, isPass } = data;
  const values = [
    { title: 'Bugs', value: 20 },
    { title: 'Vulnerabilities', value: 1 },
    { title: 'Code Smells', value: 2 },
    { title: 'Coverage', value: '0.0%' },
    { title: 'Duplications', value: '0,0%' },
  ];
  return (
    <div className="project-item">
      <div className="info">
        <p>{appName}</p>
        <p className={`${isPass ? 'passed' : 'failed'}`}>
          {isPass ? 'Passsed' : 'Failed'}
        </p>
      </div>
      <div>
        {values.map((item) => (
          <div key={item.title}>
            <p>{item.title}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
