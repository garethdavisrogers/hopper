import React from 'react';
import axios from 'axios';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';

class AddToCart extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedSizeIndex: null,
      selectedQuantity: '',
      addedToCart: false,
      wronglyclicked: false,
      forceDropDown: false,
    };
    this.selectSize = this.selectSize.bind(this);
    this.selectQuantity = this.selectQuantity.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.revertAddToCart = this.revertAddToCart.bind(this);
  }

  handleAddToCart() {
    const { selectedQuantity, selectedSizeIndex } = this.state;
    const { currentItemStyles, selectedStyleIndex } = this.props;

    const sku = Object.keys(currentItemStyles[selectedStyleIndex].skus)[selectedSizeIndex];

    if (selectedSizeIndex) {
      axios
        .post('/cart', {
          body: {
            sku,
            quantity: selectedQuantity,
          },
        })
        .then(() => {
          this.setState(
            {
              addedToCart: true,
            },
            () => {
              setTimeout(this.revertAddToCart, 1000);
            },
          );
        });
    } else {
      this.setState(
        {
          wronglyclicked: true,
          forceDropDown: true,
        },
        () => {
          setTimeout(this.revertAddToCart, 1000);
        },
      );
    }
  }

  selectQuantity(e) {
    const quant = e.target.value;
    this.setState({
      selectedQuantity: quant,
    });
  }

  selectSize(e) {
    if (Number(e.currentTarget.value) >= 0) {
      this.setState({
        selectedSizeIndex: e.currentTarget.value,
        selectedQuantity: '1',
        forceDropDown: false,
      });
    } else {
      this.setState({
        selectedSizeIndex: null,
        selectedQuantity: '',
        forceDropDown: false,
      });
    }
  }

  revertAddToCart() {
    this.setState({
      wronglyclicked: false,
      addedToCart: false,
    });
  }

  render() {
    const { currentItemStyles, selectedStyleIndex } = this.props;
    const {
      wronglyclicked, selectedSizeIndex, addedToCart, selectedQuantity, forceDropDown,
    } = this.state;

    if (currentItemStyles[0]) {
      const { skus } = currentItemStyles[selectedStyleIndex];
      const skuKeys = Object.keys(skus);
      let button = null;

      let available = false;
      for (let i = 0; i < skuKeys.length && !available; i++) {
        if (skus[skuKeys[i]].quantity > 0) {
          available = true;
        }
      }

      if (available) {
        if (wronglyclicked) {
          button = (
            <button type="submit" id="overviewAddToCartButton">
              <span>PLEASE SELECT SIZE</span>
              <span id="addToCartPlus">+</span>
            </button>
          );
        } else if (addedToCart) {
          button = (
            <button type="submit" id="overviewAddToCartButton">
              <span>ADDED TO BAG</span>
              <span id="addToCartPlus">+</span>
            </button>
          );
        } else {
          button = (
            <button type="submit" id="overviewAddToCartButton" onClick={this.handleAddToCart}>
              <span>ADD TO BAG</span>
              <span id="addToCartPlus">+</span>
            </button>
          );
        }
      }

      return (
        <>
          {/* <div id="wronglyClickedContainer">
            {wronglyclicked ? <div id="wronglyClicked">Please Select Size</div> : null}
          </div> */}
          <div id="overviewAddToCart">
            <SizeSelector skus={skus} selectSize={this.selectSize} forceDropDown={forceDropDown} />
            <QuantitySelector
              skus={skus}
              selectedSizeIndex={selectedSizeIndex}
              selectQuantity={this.selectQuantity}
              selectedQuantity={selectedQuantity}
            />
            {button}
          </div>
        </>
      );
    }
    return <div id="overviewAddToCart"></div>;
  }
}

export default AddToCart;
