import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './style.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <Header />
        <br></br>
        <Main />
        <br></br>
        <Footer />
      </div>

    )
  }
}
export default App;
