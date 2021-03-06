import React from 'react';
import { GiRoundStar } from 'react-icons/gi';
import helpers from '../helpers';
import Stars from '../Stars';

class RelatedProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItemAverageRating: 0,
    };
    this.calculateAverageCurrentItemRating = this.calculateAverageCurrentItemRating.bind(this);
  }

  componentDidMount() {
    const { relatedProduct } = this.props;
    if (relatedProduct) {
      this.calculateAverageCurrentItemRating();
    }
  }

  calculateAverageCurrentItemRating() {
    const { relatedProduct } = this.props;
    if (relatedProduct.metaReview.ratings) {
      helpers.calculateAverageRating(relatedProduct.metaReview.ratings, (avg) => {
        this.setState({
          currentItemAverageRating: avg,
        });
      });
    }
  }

  render() {
    const {
      relatedProduct,
      handleCompareClick,
      handleCardClick,
      handleResetCarousel,
      darkMode,
    } = this.props;
    const { currentItemAverageRating } = this.state;
    if (relatedProduct) {
      let price = null;
      if (relatedProduct.styles[0]) {
        if (relatedProduct.styles[0].sale_price) {
          price = (
            <div>
              <span className="salePrice">
                {`$${relatedProduct.styles[0].sale_price}`}
              </span>
              <span className="strikethrough">
                {`  $${relatedProduct.styles[0].original_price}`}
              </span>
            </div>
          );
        } else {
          price = <div>{`$${relatedProduct.styles[0].original_price}`}</div>;
        }
      }

      let rating = null;
      if (currentItemAverageRating >= 0) {
        rating = (
          <div>
            <Stars rating={currentItemAverageRating} />
          </div>
        );
      }

      return (
        <div className={darkMode ? "card productcard darkMode" : "card productcard"}>
          <i
            className="cardIcon compareIcon"
            onClick={() => handleCompareClick(relatedProduct)}
            >
            <GiRoundStar size={36}/>
          </i>
          <div
            className="cardimage"
            style={
              { backgroundImage: `url(${relatedProduct.styles[0].photos[0].url})`}
            }
            onClick={() => {
              handleCardClick(relatedProduct.id);
            }}
          />
          <div className="cardinfo"  onClick={() => {
              handleCardClick(relatedProduct.id);
            }}>
            {relatedProduct.iteminfo.category.toUpperCase()}
            <p>{relatedProduct.iteminfo.name}</p>
            {price}
            {rating}
          </div>
        </div>
      );
    }
    return (
      <div className={darkMode ? "card productcard darkMode" : "card productcard"}>
        <div className="cardimage">
          <h2> Now Loading... </h2>
        </div>
        <div className="cardinfo">
          <h3> or there are no related products. These frogs humbly apologize.</h3>
        </div>
      </div>
    );
  }
}

export default RelatedProductCard;
