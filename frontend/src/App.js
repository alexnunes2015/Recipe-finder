import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IngredientsSelection from "./Screens/IngredientsSelection/IngredientsSelection";
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ShowResults from './Screens/ShowResults/ShowResults';
import ShowRecipe from './Screens/ShowRecipe/ShowRecipe';
import { REST_URL } from './REST_URL';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientes: ["Batatas",
        "Oleo",
        "Ovos",
        "Leite",
        "Farinha",
        "Bifes",
        "Açucar",
        "Sal",
        "Abacate",
        "Arroz",
        "Alho Frances",
        "Cebola",
        "Presunto picado",
        "Tomate",
        "Vinho branco",
        "Azeite"],
      selected: [],
      currentPage: "select",
      results: undefined,
      currentRecipe: -1
    }
    this.addItem = this.addItem.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onGoBack = this.onGoBack.bind(this);
    this.onOpenRecipe = this.onOpenRecipe.bind(this);
  }

  onOpenRecipe(id) {
    this.setState({
      currentPage: "showRecipe",
      selected: [],
      results: undefined,
      currentRecipe: id
    })
  }

  onGoBack() {
    this.setState({
      currentPage: "select",
      selected: [],
      results: undefined,
      currentRecipe: -1
    })
  }

  onSearch() {
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
      .then(response => response.json())
      .then(json => {
        if (json !== "{ \"data\": {} ]}") {
          let arrToSave = JSON.parse(json).data;
          this.setState({
            results: arrToSave,
            currentPage: "results"
          });
        } else {
          this.setState({
            results: undefined,
            currentPage: "results"
          });
        }
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
            {
              this.state.currentPage !== "select" ? (
                <IconButton onClick={this.onGoBack} edge="start" color="inherit" aria-label="menu">
                  <ArrowBack />
                </IconButton>
              ) : null
            }
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
        {this.state.currentPage === "results" ? (
          <ShowResults
            results={this.state.results}
            onOpenRecipe={this.onOpenRecipe}
          />
        ) : null}
        {this.state.currentPage === "showRecipe" ? (
          <ShowRecipe
            currentRecipe={this.state.currentRecipe}
          />
        ) : null}
      </div>
    );
  }
}