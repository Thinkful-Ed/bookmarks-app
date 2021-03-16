import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddBookmark from "./AddBookmark/AddBookmark";
import BookmarkList from "./BookmarkList/BookmarkList";
import EditBookmark from "./EditBookmark/EditBookmark";
import BookmarksContext from "./bookmark-context/BookmarksContext";
import Nav from "./Nav/Nav";
import config from "./config";
import "./App.css";

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  setBookmarks = (bookmarks) => {
    this.setState({
      bookmarks,
      error: null,
    });
  };

  insertBookmark = (bookmark) => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
    });
  };

  deleteBookmark = (bookmarkId) => {
    const newBookmarks = this.state.bookmarks.filter(
      (bm) => bm.id !== bookmarkId
    );
    this.setState({
      bookmarks: newBookmarks,
    });
  };

  updateBookmark = (updatedBookmark) => {
    const updateBookmark = this.state.bookmarks.map((book) =>
      book.id === updatedBookmark.id ? updatedBookmark : book
    );
    this.setState({
      bookmarks: updateBookmark,
    });
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res.json();
      })
      .then(this.setBookmarks)
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      insertBookmark: this.insertBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark,
    };
    return (
      <main className="App">
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className="content" aria-live="polite">
            <Route path="/add-bookmark" component={AddBookmark} />
            <Route path="/edit/:bookmark_id" component={EditBookmark} />
            <Route exact path="/bookmarks" component={BookmarkList} />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
