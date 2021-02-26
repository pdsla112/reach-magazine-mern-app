import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import Economics from "./Economics";
import Finance from "./Finance";
import Medicine from "./Medicine";
import MoneyWise from "./MoneyWise";
import Tech from "./Tech";
import Publish from "./Publish";
import Delete from "./Delete";
import IndividualArticle from "./IndividualArticle";
import Signup from "./Signup";
import Login from "./Login";


class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/content-management-system/contribute">
            <Publish />
          </Route>
          <Route exact path="/content-management-system/delete-articles">
            <Delete />
          </Route>
          <Route exact path="/economics">
            <Economics/>
          </Route>
          <Route exact path="/finance">
            <Finance/>
          </Route>
          <Route exact path="/medicine">
            <Medicine/>
          </Route>
          <Route exact path="/moneywise">
            <MoneyWise/>
          </Route>
          <Route exact path="/tech">
            <Tech/>
          </Route>
          <Route exact path="/sign-up-to-a-new-account">
            <Signup/>
          </Route>
          <Route exact path="/log-into-your-account">
            <Login/>
          </Route>
          <Route path="/:section/individual-articles/">
            <IndividualArticle/>
          </Route>
        </Switch>
      </div>
    );  
  }
}

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
