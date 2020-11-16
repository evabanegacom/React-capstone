/* eslint-disable */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Stock from './stock';
import SearchFilters from './filter';

import { getStocks, searchFilter } from '../actions/actions';

class Home extends Component {
  componentDidMount() {
    this.props.actions.getStocks();

    this.handleFilter = this.handleFilter.bind(this);
    this.filteredStock = this.filteredStock.bind(this);
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
    const stockList = checkFilter ? (
      checkFilter.slice(0, 20)
        .map(stock => (<Stock stock={stock} />))
    ) : (<p>loading...</p>);

    return (
      <div>
        <SearchFilters handleFilter={this.handleFilter} />
        {stockList}
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
