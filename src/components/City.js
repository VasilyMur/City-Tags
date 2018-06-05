import React from 'react';
import Header from './Header';
import Footer from './Footer';

import axios from 'axios';

class City extends React.Component {

    state = {
        photos: {},
        overlayImgSrc: null
    }

    componentDidMount() {
        const photos = {...this.state.photos};
    
        this.callApi().then(data => {
          data.map((photo, id) => {
              return photos[`photo-${id}`] = photo.node.display_url;
          });
          this.setState({ photos: photos });
        })
      }
    
      callApi = async () => {
        try {
          const object = await axios.get(`https://www.instagram.com/explore/tags/${this.props.match.params.cityId}/?__a=1`);
          return object.data.graphql.hashtag.edge_hashtag_to_media.edges;
        } catch (e) {
          console.log(e)
        }
      }

      openPhoto = (e) => {
        console.log(e.currentTarget)
        const src = e.currentTarget.childNodes[0].currentSrc;
        this.setState({ overlayImgSrc: src });
      }

      closePhoto = (e) => {
        this.setState({ overlayImgSrc: null });
      }

    render() {

      

        function randomNumber(limit) {
            return Math.floor(Math.random() * limit) + 1;
        }

        const photo = Object.keys(this.state.photos).map(res => {
                return <div onClick={this.openPhoto} className={`photos__container--photo h${randomNumber(4)} v${randomNumber(4)}`} key={res} >
                            <img src={this.state.photos[`${res}`]} alt=""/>
                            <div className="overlay">
                              <button>View</button>
                            </div>
                            </div>    
        }).slice(0, 50)
        
        return (
            <div className="App">
      
              <Header />

              <div className={ this.state.overlayImgSrc ? `single__overlay open` : `single__overlay` }>
                <div className="single__overlay--inner">
                  <button onClick={this.closePhoto} className="close">&times; Close</button>
                  <img src={this.state.overlayImgSrc}alt=""/>
                </div>
              </div>
      
                <div className="content">
                  <div className="inner">
                    <div className="photos">
                      <div className="photos__header">
                        <h2>#{this.props.match.params.cityId.replace(/_/, ' ')}</h2>
                      </div>
                      <div className="photos__container">
                      {photo}
                      </div>
                    </div>
                  </div>
                </div>
      
              <Footer />
      
            </div>
          );
    }
}

export default City;