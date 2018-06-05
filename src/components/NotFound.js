import React from 'react';
import Header from './Header';
import Footer from './Footer';

const NotFound = () => {
        return (
            <div className="App">
      
              <Header />
      
                <div className="content">
                  <div className="inner">
                    <div className="cities">
                      <h2>PAGE NOT FOUND</h2>
                    </div>
                  </div>
                </div>
      
              <Footer />
      
            </div>
          );
}

export default NotFound;