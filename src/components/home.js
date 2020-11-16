import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
/* eslint-disable */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Stock from './stock';
import SearchFilters from './filter';

import { getStocks, searchFilter } from '../actions/actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleFilter = this.handleFilter.bind(this);
    this.filteredStock = this.filteredStock.bind(this);
  }

  componentDidMount() {
    // this.props.actions.getStocks();
    const { actions } = this.props;
    const stocks = actions.getStocks();
    return stocks;
  }

  handleFilter = filter => {
    const { filters } = this.props;
    filters(filter);
  };

  filteredStock = (stocks, value) => {
    if (stocks || !stocks.length) {
      return (
        value === 'ALL' || value === undefined
          ? stocks
          : stocks.filter(stock => stock.exchange === value));
    }

    return false;
  }

  render() {
    const { stocks, filteredValue } = this.props;
    const checkFilter = this.filteredStock(stocks, filteredValue);
    const styling = {width: '23%', background: 'purple', height: '100px', cursor: 'pointer', margin: 'auto', border: '1px solid gray'}
    const stockList = checkFilter ? (
      checkFilter.slice(0, 100)
        .map(stock => (<Stock stock={stock} styling={ styling} key={stock.symbol} />))
    ) : (<p>loading...</p>);

    return (
      <div>
        <div className='searchdiv'>
          <SearchFilters handleFilter={this.handleFilter} />
        </div>
        <div className='stocks'>
          {stockList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.stockReducer.stocks,
  filteredValue: state.filterReducer,
});

// const mapStateToProps = state => {
//   console.log(state)
//   return {
//     stocks: state.stockReducer.stocks
//   }
//   }

// const mapDispatchToProps = (dispatch) => ({
//   getStocks: () => dispatch(getStocks),
// });

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getStocks }, dispatch),
    filters: filter => {
      dispatch(searchFilter(filter));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
/* eslint-enable */
