import React from 'react';
import PropTypes from 'prop-types';

function Spinner({ value }) {
  return (
    <>
      <div className="spinner spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="text-info pt-3">{value}</div>
    </>
  );
}

Spinner.propTypes = {
  value: PropTypes.string,
};

Spinner.defaultProps = {
  value: 'Loading The Quiz',
};

export default Spinner;
