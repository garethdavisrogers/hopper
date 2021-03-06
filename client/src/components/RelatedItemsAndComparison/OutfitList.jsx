import React from 'react';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import OutfitCard from './OutfitCard';
import AddOutfitCard from './AddOutfitCard';

class OutfitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      outfitIds: [],
      outfits: [],
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }

  componentDidMount() {
    const storedOutfitIds = JSON.parse(window.localStorage.getItem('outfitIds'));
    const storedOutfits = JSON.parse(window.localStorage.getItem('outfits'));
    if (storedOutfits !== null) {
      storedOutfits.map((product) => {
        const currentPhoto = product.styles[0].photos[0];
        if (currentPhoto.url === null) {
          currentPhoto.url = 'https://www.luvbat.com/uploads/happy_frog__9265232477.jpg';
        } else if (currentPhoto.url[0] !== 'h') {
          currentPhoto.url = currentPhoto.url.substr(1);
        }
        return null;
      });
      this.setState({
        outfitIds: storedOutfitIds,
        outfits: storedOutfits,
      });
    }
  }

  handleAddClick() {
    const { outfitIds, outfits } = this.state;
    const { currentItem } = this.props;
    if (!outfitIds.includes(currentItem.id)) {
      let currentPhoto = currentItem.styles[0].photos[0];
      if (currentPhoto.url === null) {
        currentPhoto.url = 'https://www.luvbat.com/uploads/happy_frog__9265232477.jpg';
      } else if (currentPhoto.url[0] !== 'h') {
        currentPhoto.url = currentPhoto.url.substr(1);
      }
      this.setState((prevState) => {
        prevState.outfitIds.push(currentItem.id);
        prevState.outfits.push(currentItem);
        return {
          outfitIds: prevState.outfitIds,
          outfits: prevState.outfits,
        };
      }, () => {
        window.localStorage.setItem('outfitIds', JSON.stringify(outfitIds));
        window.localStorage.setItem('outfits', JSON.stringify(outfits));
      });
    }
  }

  handleDeleteClick(item, { outfitIds, outfits } = this.state) {
    if (outfitIds.includes(item.id)) {
      this.setState((prevState) => {
        const indexToDelete = prevState.outfitIds.indexOf(item.id);
        prevState.outfitIds.splice(indexToDelete, 1);
        prevState.outfits.splice(indexToDelete, 1);
        return {
          outfitIds: prevState.outfitIds,
          outfits: prevState.outfits,
        };
      }, () => {
        window.localStorage.setItem('outfitIds', JSON.stringify(outfitIds));
        window.localStorage.setItem('outfits', JSON.stringify(outfits));
      });
    }
  }

  handleLeftClick() {
    const {
      outfitSlidePosition,
      handleOutfitSlideState,
    } = this.props;
    const track = document.querySelector('.outfit-slide');
    if (outfitSlidePosition - 264 >= 0) {
      const newPosition = outfitSlidePosition - 264;
      track.style.transform = 'translateX(-' + newPosition + 'px' + ')';
      handleOutfitSlideState(newPosition);
    }
  }

  handleRightClick() {
    const { outfits } = this.state;
    const {
      outfitSlidePosition,
      handleOutfitSlideState,
    } = this.props;
    const track = document.querySelector('.outfit-slide');
    const numberOfCards = outfits.length + 1;
    if (outfitSlidePosition + 264 <= (numberOfCards - 4) * 264) {
      const newPosition = outfitSlidePosition + 264;
      track.style.transform = 'translateX(-' + newPosition + 'px' + ')';
      handleOutfitSlideState(newPosition);
    }
  }

  render() {
    const { outfits } = this.state;
    const {
      handleCardClick,
      outfitSlidePosition,
      darkMode,
    } = this.props;

    let leftArrow = null;
    if (outfitSlidePosition !== 0) {
      leftArrow = <i className="carousel-left-button" onClick={this.handleLeftClick}>
      <BiLeftArrow size={24} /></i>;
    }

    let rightArrow = null;
    const numberOfCards = outfits.length + 1;
    if (outfitSlidePosition + (4 * 264) < numberOfCards * 264) {
      rightArrow = <i className="carousel-right-button" onClick={this.handleRightClick}>
      <BiRightArrow size={24} /></i>;
    }

    return (
      <div>
        <h2>Your Outfit</h2>
        <div className="carousel-wrapper">
          {leftArrow}
          <div className="carousel-track outfit-carousel">
            <div className="carousel-slide outfit-slide">
              <AddOutfitCard
                handleAddClick={this.handleAddClick}
                darkMode={darkMode}
              />
              {
                outfits.map((outfitItem) => (
                  <OutfitCard
                    outfitItem={outfitItem}
                    handleDeleteClick={this.handleDeleteClick}
                    handleCardClick={handleCardClick}
                    key={'outfit' + outfitItem.id}
                    darkMode={darkMode}
                  />
                ))
              }
            </div>
          </div>
            {rightArrow}
        </div>
      </div>
    );
  }
}

export default OutfitList;
