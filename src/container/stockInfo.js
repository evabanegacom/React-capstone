import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from '../Detail.module.css';

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
    axios.get(`https://financialmodelingprep.com/api/v3/profile/${stockId}?apikey=f4c26544319bdea248167bac8bd358fd`)
      .then(res => {
        this.setState({
          stock: res.data,
        });
      });
  }

  render() {
    const { stock } = this.state;
    const returnedstock = stock ? (
      <div className="divDetails">
        <div className="image">
          <p>{stock[0].companyName}</p>
&nbsp;&nbsp;&nbsp;
          <img className={style.logo} src={stock[0].image} alt="logo" />
        </div>
        <div className={style.desc}>
          <p>{stock[0].description}</p>
        </div>
        <div className={style.finance}>
          <p>
            volume average:
            &nbsp;
            {stock[0].volAvg}
          </p>
          <p>
            industry:
            &nbsp;
            {stock[0].industry}
          </p>
          <p>
            Market Capital:
            &nbsp;
            {stock[0].mktCap}
          </p>
          <p>
            Website:
            &nbsp;
            {stock[0].website}
          </p>
          <p>
            Currency:
            &nbsp;
            {stock[0].currency}
          </p>
        </div>
        <div className={style.back}>
          <Link to="/"><p>Back</p></Link>
        </div>
      </div>
    ) : (
      <div>
        <p>WAIT FOR IT...</p>
      </div>
    );
    return (
      <div>
        {returnedstock}
      </div>
    );
  }
}

StockInfo.propTypes = {
  stockId: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
};

export default StockInfo;
