import React from "react";

const BookmarkContext = React.createContext({
  bookmarks: [],
  getAllBookmarks: () => {},
  getById: () => {},
  insertBookmark: () => {},
  deleteBookmark: () => {},
  updateBookmark: () => {},
});

export default BookmarkContext;
