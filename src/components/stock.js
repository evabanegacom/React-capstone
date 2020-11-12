import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable */

function Stock({symbol, name}) {
  return (
    <div>
    <Link to={`/${symbol}`} key={Math.random()} className='link-decor'>
      <h3> { name } </h3>
    </Link>
    </div>
  );
}

export default Stock;
/* eslint-enable */
