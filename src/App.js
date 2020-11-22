import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import BookmarksContext from './BookmarksContext';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    // const { bookmarks } = this.state
    const contextValue ={
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
    }
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
          <Route
            path='/add-bookmark'
            component={AddBookmark}
          />
          <Route
            exact
            path='/'
            component={BookmarkList}
          />
        </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
