import React from 'react';

class OutfitCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const product = this.props.outfitItem;
    // console.log(product)

    return (
      <div className="card productcard">
        <button className="icon" onClick={()=> (this.props.handleDeleteClick(this.props.outfitItem))}>X</button>
        <div
          className="cardimage"
          onClick={() => this.props.handleCardClick(product.id)}></div>
        <div className="cardinfo"  onClick={() => this.props.handleCardClick(product.id)}>
          {product.category.toUpperCase()}
          <p>{product.name}</p>
          {product.default_price}
          <p>***** (stars)</p>
        </div>
      </div>
    )
  }
}

export default OutfitCard;