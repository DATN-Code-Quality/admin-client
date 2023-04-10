import React, { useCallback, useEffect, useState } from 'react';

import LeftMenu from './LeftMenu';

import { useSonarqube } from '~/adapters/appService/sonarqube.service';
import { ListSonarqube } from '~/domain/sonarqube';
import ProjectList from './ProjectList';
import { useDispatch, useSelector } from 'react-redux';
import { setDataFilter } from '~/adapters/redux/actions/sonarqube';
import SonarqubeSelector, {
  sonarqubeSelector,
} from '~/adapters/redux/selectors/sonarqube';

const List = () => {
  const { getProjects } = useSonarqube();
  const dispatch = useDispatch();

  const dataSonarqube = useSelector(SonarqubeSelector.getDataReponseSonarqube);
  const fetchList = useCallback(async () => {
    const data = await getProjects();
    dispatch(setDataFilter(data));
  }, [dispatch, getProjects]);

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <LeftMenu />
      <ProjectList />
    </div>
  );
};

export default List;
