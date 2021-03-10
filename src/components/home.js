/* eslint-disable */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Stock from './stock';
import SearchFilters from './filter';
import ReactPaginate from "react-paginate";
import { getStocks, searchFilter } from '../actions/actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.filteredStock = this.filteredStock.bind(this);
  }

  handlePageClick = ({ selected: selectedPage }) => {
    this.setState({
      currentPage: selectedPage
    });
  }


  componentDidMount() {
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
    const PER_PAGE = 20;
    const offset = this.state.currentPage * PER_PAGE;
    const { stocks, filteredValue } = this.props;
    const pageCount = Math.ceil(stocks.length / PER_PAGE);
    const checkFilter = this.filteredStock(stocks, filteredValue);
    const styling = {
      width: '24%', background: 'purple', cursor: 'pointer', margin: 'auto', border: '1px solid gray',
    };
    const stockList = checkFilter ? (
      checkFilter.slice(offset, offset + PER_PAGE)
        .map(stock => (<Stock stock={stock} styling={styling} key={stock.id} />))
    ) : (<p>loading...</p>);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className="searchdiv">
          <SearchFilters handleFilter={this.handleFilter} />
        </div>
        <div className="stocks">
          {stockList}
        </div>
        <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={this.handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.stockReducer.stocks,
  filteredValue: state.filterReducer,
});

Home.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.string.isRequired,
  filteredValue: PropTypes.string.isRequired,
  actions: PropTypes.func.isRequired,
};

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
