import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IngredientsSelection from "./Screens/IngredientsSelection/IngredientsSelection";
import { REST_URL } from './REST_URL';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientes: ["Batatas", "Oleo", "Ovos", "Leite", "Farinha", "Bifes", "Açucar", "Sal", "Abacate", "Arroz", "Alho Frances"],
      selected: [],
      currentPage: "select"
    }
    this.addItem = this.addItem.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch() {
    this.setState({
      currentPage: "results"
    })
    let ings = "";
    let first = true;
    this.state.selected.forEach(element => {
      if (element !== "") {
        if (first) {
          ings = element.toLowerCase();
          first = false;
        } else {
          ings = ings + "|" + element.toLowerCase();
        }
      }
    });
    fetch(REST_URL + '/search.php?ing=' + ings)
      .then(response => response.text())
      .then(text => {
        console.log(JSON.parse(text));
      });
  }

  addItem(e) {
    if (e.target.checked) {
      let tmpArr = [];
      tmpArr = this.state.selected;
      tmpArr.push(e.target.id);
      this.setState({
        selected: tmpArr
      })
    } else {
      let tmpId = e.target.id;
      let arr = this.state.selected.filter(e => e !== tmpId);
      this.setState({
        selected: arr
      })
    }
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Recipe Finder
            </Typography>
          </Toolbar>
        </AppBar>
        {this.state.currentPage === "select" ? (
          <IngredientsSelection
            addItem={this.addItem}
            ingredientes={this.state.ingredientes}
            onSearch={this.onSearch}
          />
        ) : null}
      </div>
    );
  }
}