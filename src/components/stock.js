import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Stock({ stock, styling }) {
  return (
    <div style={styling}>
      <Link to={`/${stock.symbol}`} key={stock.symbol} className="link-decor">
        <h4>
          {' '}
          { stock.name }
          {' '}
        </h4>
      </Link>
      <p className="stockprice">{stock.price}</p>
    </div>
  );
}

Stock.propTypes = {
  stock: PropTypes.string.isRequired,
  styling: PropTypes.func.isRequired,
};
export default Stock;
