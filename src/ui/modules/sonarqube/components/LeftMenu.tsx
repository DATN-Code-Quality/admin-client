/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';

import Coverage from './Coverage';

import { Facet } from '~/domain/sonarqube';
import './index.less';
import { useSelector } from 'react-redux';
import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';
import Security from './Security';
import NCLoc from './NCLoc';

const LeftMenu = () => {
  const { facets } = useSelector(SonarqubeSelector.getDataReponseSonarqube);

  console.log(facets);

  const keySetting = useMemo(() => {
    return {
      coverage: (conditionItem) => <Coverage conditionItem={conditionItem} />,
      security_rating: (conditionItem) => (
        <Security conditionItem={conditionItem} />
      ),
      sqale_rating: (conditionItem) => (
        <Security conditionItem={conditionItem} />
      ),
      ncloc: (conditionItem) => <NCLoc conditionItem={conditionItem} />,
      // security_rating: (conditionItem) => (
      //   <Coverage conditionItem={conditionItem} />
      // ),
    };
  }, []);
  return (
    <div className="sonarqube-container">
      {facets?.map((conditionItem) => {
        const dataItem = conditionItem?.values;
        if (Object.keys(keySetting).includes(conditionItem?.property)) {
          const functionRender = keySetting[conditionItem?.property];
          return functionRender(conditionItem);

          // console.log
        }
        return (
          <div key={conditionItem.property + Math.random()}>
            <h4 className="property-name">{conditionItem.property}</h4>
            <div className="search-navigator-facet-list projects-facet-list">
              {dataItem?.map((valueItem) => {
                return (
                  <div
                    key={JSON.stringify(valueItem)}
                    className="search-navigator-facet "
                  >
                    <span className="facet-name">{valueItem.val}</span>
                    <span className="facet-stat">{valueItem.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeftMenu;
