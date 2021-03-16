# Bookmarks React Client
_This project is a demonstration for Thinkful's React course_

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Ensure your `bookmarks-server` application is running on the appropriate port and has the necessary tables to operate.

Ensure you have a `env.local` file in the root of this project's directory that has the following setting:

```bash
REACT_APP_API_KEY='abc123'
```

> Note: `abc123` should match the value of the server's `API_TOKEN` env var.

Modify the `./src/config.js` file so that the `API_ENDPOINT` setting points at your local bookmarks server's address (probably `http://localhost:8000/bookmarks`).
