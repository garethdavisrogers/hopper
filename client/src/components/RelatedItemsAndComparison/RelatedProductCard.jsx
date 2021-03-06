import React from 'react';

class RelatedProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { relatedProduct, handleCompareClick, handleCardClick } = this.props;
    if (relatedProduct) {
      return (
        <div className="card productcard">
          <button
            className="icon"
            onClick={() => handleCompareClick(relatedProduct)}
            >*
          </button>
          <div
            className="cardimage"
            style={
              { backgroundImage: `url(${relatedProduct.styles[0].photos[0].url})`}
            }
            onClick={() => handleCardClick(relatedProduct.id)}
          />
          <div className="cardinfo"  onClick={() => handleCardClick(relatedProduct.id)}>
            {relatedProduct.iteminfo.category.toUpperCase()}
            <p>{relatedProduct.iteminfo.name}</p>
            {relatedProduct.styles[0].original_price}
            <p>***** (stars)</p>
          </div>
        </div>
      );
    }
    return (
      <div className="card productcard">
        <div className="cardimage" />
        <div className="cardinfo">
          <h1> Now Loading </h1>
          <h3> Please wait patiently, like this frog.</h3>
        </div>
      </div>
    );
  }
}

export default RelatedProductCard;
