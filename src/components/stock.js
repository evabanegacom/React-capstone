import React from 'react';
import { Link } from 'react-router-dom';
/* eslint-disable */

function Stock({ stock, styling }) {
  return (
    <div style={styling} className='stockiteslf'>
      <Link to={`/${stock.symbol}`} key={stock.symbol} className="link-decor">
        <h4>
          {' '}
          { stock.name }
          {' '}
        </h4>
      </Link>
      <p className='stockprice'>{stock.price}</p>
    </div>
  );
}

export default Stock;
/* eslint-enable */
