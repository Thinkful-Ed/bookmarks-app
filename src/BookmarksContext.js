import React from 'react';
import BookmarkList from './BookmarkList/BookmarkList';

const BookmarksContext = React.createContext({
    bookmarks: [],
    addBookmark: () => {},
    deleteBookmark: ()=> {},
})

export default BookmarksContext