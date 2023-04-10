/* eslint-disable no-nested-ternary */
import React, { useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '~/adapters/redux/actions/sonarqube';
import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';
import { renderColorRatting } from '~/utils';

const NO_DATA = 'NO_DATA';

const Security: React.FC<{
  conditionItem: {
    values: { val: string; count: number }[];
    property: string;
  };
}> = ({ conditionItem }) => {
  const dispatch = useDispatch();
  const { securityReviewRating: security } = useSelector(
    SonarqubeSelector.getFiterSonarqube
  );
  const setSecurity = useCallback(
    (val: number) => {
      dispatch(setFilter({ securityReviewRating: val }));
    },
    [dispatch]
  );
  // console.log(conditionItem);
  const { values, property } = conditionItem;
  const total = useRef(0);

  const formatedData: {
    val: string;
    key: string;
    icon: string;
    count: number;
  }[] = useMemo(() => {
    return values?.reverse()?.map((item, index) => {
      if (item.val === NO_DATA)
        return {
          val: 'No data',
          key: NO_DATA,
          icon: 'E',
          count: 0,
        };
      total.current += item.count;
      const [val1, val2] = item?.val.split('-') || [0, 0];
      return {
        val: index + 1,
        key: `${
          val2 === '*'
            ? `>= ${val1}`
            : val1 === '*'
            ? `<=${val2}`
            : `${val1}% - ${val2}%`
        }`,
        icon: renderColorRatting(index + 1, 'rating-small'),
        count: item.count,
      };
    });
  }, [values]);

  return (
    <div key={property}>
      <h4>{property}</h4>
      <div className="search-navigator-facet-list projects-facet-list">
        {formatedData?.map((valueItem) => {
          if (valueItem.key === NO_DATA) return <div key={NO_DATA} />;
          return (
            <div
              key={valueItem.val}
              className={`search-navigator-facet  ${
                security === +valueItem.val ? 'filter-active' : ''
              } `}
              onClick={() => setSecurity(+valueItem.val)}
            >
              {valueItem.icon}
              <span className="facet-stat">{valueItem.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Security;
