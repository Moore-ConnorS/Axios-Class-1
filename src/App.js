import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import "./reset.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      stuff: [],
      selectedCard: null,
      selectedName: "",
      favoritesList: [],
      searchTerm: ""
    };
    this.getDataFromUrl = this.getDataFromUrl.bind(this);
    this.setCard = this.setCard.bind(this);
    this.postUserCardToTheServer = this.postUserCardToTheServer.bind(this);
    this.getFavoritesFromServer = this.getFavoritesFromServer.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
  }

  componentDidMount() {
    this.getDataFromUrl();
    this.getFavoritesFromServer();
  }

  setCard(card) {
    this.setState({
      selectedCard: card.imageUrl,
      selectedName: card.name
    });
  }

  removeSelected() {
    this.setState({
      selectedCard: null,
      selectedName: ""
    });
  }

  getDataFromUrl() {
    axios.get("https://api.pokemontcg.io/v1/cards").then(response => {
      this.setState({
        stuff: response.data.cards
      });
    });
  }

  getFavoritesFromServer() {
    axios.get("/api/favorites").then(res => {
      this.setState({
        favoritesList: res.data
      });
    });
  }

  postUserCardToTheServer() {
    const savedCard = {
      imageUrl: this.state.selectedCard,
      name: this.state.selectedName
    };
    axios.post("/api/favorites", savedCard).then(res => {
      this.setState({
        favoritesList: res.data
      });
    });
  }

  updateFavorite(id) {
    const updatedCard = {
      imageUrl: this.state.selectedCard,
      name: this.state.selectedName
    };
    axios.put(`/api/favorites/${id}`, updatedCard).then(res => {
      this.setState({
        favoritesList: res.data
      });
    });
  }

  deleteFavorite(id) {
    axios.delete(`/api/favorites/${id}`).then(res => {
      this.setState({
        favoritesList: res.data
      });
    });
  }

  search(value) {
    axios.get(`/api/search?name=${value}`).then(res => {
      this.setState({
        favoritesList: res.data,
        searchTerm: value
      });
    });
  }

  render() {
    const { stuff, favoritesList } = this.state;
    const myCards = stuff.length ? (
      stuff.map(card => {
        return (
          <img
            key={card.id}
            alt=""
            onClick={() => {
              this.setCard(card);
            }}
            src={card.imageUrl}
          />
        );
      })
    ) : (
      <img
        alt=""
        src="https://media1.giphy.com/media/jM4bWFBKpSFeo/giphy.gif?cid=3640f6095bfed28252686834774bbc44"
      />
    );

    const myFavorites = favoritesList.map(card => {
      return (
        <div className="card" key={card.name}>
          <img alt="" src={card.imageUrl} />
          <button onClick={() => this.updateFavorite(card.id)}>
            Update With Selected
          </button>
          <button
            className="delete"
            onClick={() => this.deleteFavorite(card.id)}
          >
            X
          </button>
        </div>
      );
    });

    return (
      <div>
        <header>
          <div className="searchContainer">
            <span>Search:</span>
            <input
              value={this.state.searchTerm}
              onChange={e => {
                this.search(e.target.value);
              }}
            />
          </div>

          <div className="favoritesContainer">{myFavorites}</div>
        </header>

        
        <div className="App">
          <section>
            <div className="cardContainer">{myCards}</div>
          </section>

          <div className="selectedCardContainer">
            <img
              alt=""
              onClick={this.removeSelected}
              src={this.state.selectedCard}
            />
            <button onClick={this.postUserCardToTheServer}>ADD</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
