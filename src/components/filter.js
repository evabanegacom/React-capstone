import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* eslint-disable */
const searchFilters = props => {
  const { filteredStock, handleFilter } = props;

  const stockCategory = [
    'NYSE',
    'NASDAQ',
    'AMSE',
  ];

  const stocktype = stockCategory.map(stock => (
    <option key={Math.random()} value={stock}>
      {stock}
    </option>
  ));
  return (
    <select name="Select" onChange={handleFilter} value={filteredStock}>
      <option>
        ALL
      </option>
      {stocktype}
    </select>
  );
};

const mapStateToProps = state => ({
  filteredStock: state.filterReducer,
});

searchFilters.propTypes = {
  filteredStock: PropTypes.string.isRequired,
  handleFIlter: Proptypes.func.isRequired,
};

export default connect(mapStateToProps)(searchFilters);
/* eslint-enable */
