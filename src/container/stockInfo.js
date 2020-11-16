import React from 'react';
import axios from 'axios';
/* eslint-disable */
class StockInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: null,
    };
  }



  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { stockId } = params;
    //const stockId = this.props.match.params.stock_id;
    axios.get(`https://financialmodelingprep.com/api/v3/profile/${stockId}?apikey=f4c26544319bdea248167bac8bd358fd`)
      .then(res => {
        this.setState({
          stock: res.data,
        });
      });
  }

  render() {
    const stock = this.state.stock ? (
      <div>
        <p>{this.state.stock[0].description}</p>
        <p>{this.state.stock[0].volAvg}</p>
      </div>
    ) : (
      <div>
        <p>loading...</p>
      </div>
    );
    return (
      <div>
        {stock}
      </div>
    );
  }
}

export default StockInfo;
/* eslint-enable */
