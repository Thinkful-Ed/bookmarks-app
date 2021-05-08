import React from 'react'

const BookmarksContext = React.createContext({
    bookmarks: [],
    addBookmark: () => {},
    deleteBookmark: () => {},
    editBookmark: () => {},
})

export default BookmarksContext