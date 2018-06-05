import React from 'react';
import Header from './Header';
import Footer from './Footer';

import axios from 'axios';
import slugify from 'slugify';



class App extends React.Component {
  myInput = React.createRef();

  state ={
    cities: [],
    input: '',
    selectedCity: null
  }


  componentDidMount() {
    ///const cities = {...this.state.cities};

    this.callApi().then(data => {
      const citiesData = data.map(res => {
        const { city, latitude, longitude, population, state } = res;
        //const cityData = { state: state, population: population, lat: latitude, lng: longitude };
          //return cities[`${city}`] = cityData;
          return {
            city: city,
            state: state, 
            population: population, 
            lat: latitude, 
            lng: longitude 
          }
      })
      this.setState({ cities: citiesData });
    })
  }

  callApi = async () => {
    try {
      const object = await axios.get('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json');
      return object.data;
    } catch (e) {
      console.log(e)
    }
  }
    
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  handleInput = (e) => {
    this.setState({ input: e.target.value, selectedCity: null });
  }

  cityInfo = (e) => {
    e.preventDefault();
    const city = e.currentTarget.firstChild.firstChild.data;
    this.setState({ input: city, selectedCity: city });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const city = slugify(this.myInput.current.value.toLowerCase(), '_');
    console.log(city)
    this.props.history.push(`/cities/${city}`);
  }

  render() {

  const regex = new RegExp(this.state.input, 'gi')
  const list = this.state.cities.filter(res => {
    return res.city.match(regex);
  }).map((res, index) => {
    return <li key={index} onClick={this.cityInfo}><span>{res.city}</span><span>
              {this.numberWithCommas(res.population)}
              </span></li>;
  }).slice(0, 10)

    return (
      <div className="App">

        <Header />

          <div className="content">
            <div className="inner">
              <div className="cities">
                <h2>Search for Your City</h2>
                <div className="search">
                  <form className="search__cities" onSubmit={this.handleSubmit}>
                    <input type="text" 
                              placeholder="New York..." 
                              onChange={this.handleInput} 
                              value={this.state.input}
                              ref={this.myInput}
                              />
                      {!this.state.selectedCity ?  
                        <ul className="result" >{this.state.input ? list : ''}</ul> 
                        : ''   
                      }
                    </form>
                </div>
              </div>
            </div>
          </div>

        <Footer />

      </div>
    );
  }
}

export default App;