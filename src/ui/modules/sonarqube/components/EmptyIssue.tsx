import React from 'react';

const EmptyIssue = () => {
  return (
    <div className="empty-container ">
      <div className="empty-box ">
        <p className="text-14 font-semibold ">
          We couldn't find any results matching selected filters.
        </p>
        <p className="mt-4">Try to change filters to get some results.</p>
      </div>
    </div>
  );
};

export default EmptyIssue;
