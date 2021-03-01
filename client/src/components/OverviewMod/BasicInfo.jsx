import React from 'react';

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      currentItemInfo,
      currentItemAverageRating,
      currentItemStyles,
      selectedStyleIndex,
    } = this.props;

    let price = null;

    if (currentItemStyles[selectedStyleIndex]) {
      if (currentItemStyles[selectedStyleIndex].sale_price) {
        price = (
          <div>
            <span className="salePrice">
              {'$' + currentItemStyles[selectedStyleIndex].sale_price}
            </span>
            <span className="strikethrough">
              {'  $' + currentItemStyles[selectedStyleIndex].original_price}
            </span>
          </div>
        );
      } else {
        price = <p>{'$' + currentItemStyles[selectedStyleIndex].original_price}</p>;
      }
    }

    if (currentItemInfo.name) {
      return (
        <div id="overviewBasicInfo">
          <p>{currentItemAverageRating + ' stars, link to all reviews'}</p>
          <p>{currentItemInfo.category.toUpperCase()}</p>
          <h1>{currentItemInfo.name}</h1>
          {price}
        </div>
      );
    } else {
      return <div id="overviewBasicInfo">Loading</div>;
    }
  }
}

export default BasicInfo;