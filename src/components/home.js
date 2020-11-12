/* eslint-disable */
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import Stock from './stock'

import PropTypes from "prop-types";
// import SearchBar from '../container/search';
import { connect } from "react-redux";
import { getStocks } from "../actions/actions";

class Home extends Component {
  componentDidMount() {
    this.props.actions.getStocks();
  }
  

  render() {
    const { stocks } = this.props;
    const stockList = stocks.slice(0, 20).map((stock) => (
        <Stock stock={stock}/>
    ));
    return(
      <div>
        {stockList}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stocks: state.stockReducer.stocks,
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
  return { actions: bindActionCreators({ getStocks }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
/* eslint-enable */
