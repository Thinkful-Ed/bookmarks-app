import React from 'react';
import Rating from '../Rating/Rating';
import BookmarksContext from '../BookmarksContext';
import config from '../config';
import './BookmarkItem.css';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function deleteBookmarkRequest(bookmarkId, callback){
  fetch(config.API_ENDPOINT + `/${bookmarkId}`,{
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${config.API_KEY}`
    }
  })
    .then(res => {
      window.location = '/'
      // if (!res.ok) {
      //   return res.json().then(error =>  Promise.reject(error))
      // }
      // return res
    })
    // .then(data => { //call the callback when the request is successful - this is where the App component can remove it from state
    //   callback(bookmarkId)
    // })
}

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {(context) => (
        <li className='BookmarkItem'>
          <div className='BookmarkItem__row'>
            <h3 className='BookmarkItem__title'>
              <a
                href={props.url}
                target='_blank'
                rel='noopener noreferrer'>
                {props.title}
              </a>
            </h3>
            <Rating value={props.rating} />
          </div>
          <p className='BookmarkItem__description'>
            {props.description}
          </p>
          <div className='BookmarkItem__buttons'>
            <Link to={`edit/${props.id}`}>
              Edit 
            </Link>
            {''}
            <button
              className='BookmarkItem__description'
              onClick={() => {
                deleteBookmarkRequest(props.id,context.deleteBookmark)
              }}
            >
              Delete
            </button>
          </div>
        </li>
      )}
    </BookmarksContext.Consumer>
  )  
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}

BookmarkItem.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  desciption: PropTypes.string,
  rating: PropTypes.number.isRequired,
  onClickDelete: PropTypes.func,
};


  // previous code used
  // url: (props, propName, componentName) => {
  //   // get the value of the prop
  //   const prop = props[propName];

  //   // do the isRequired check
  //   if(!prop) {
  //     return new Error(`${propName} is required in ${componentName}. Validation Failed`);
  //   }

  //   // check the type
  //   if (typeof prop != 'string') {
  //     return new Error(`Invalid prop, ${propName} is expected to be a string in ${componentName}. ${typeof prop} found.`);
  //   }

  //   // do the custom check here
  //   // using a simple regex
  //   if (prop.length < 5 || !prop.match(new RegExp(/^https?:\/\//))) {
  //     return new Error(`Invalid prop, ${propName} must be min length 5 and begin http(s)://. Validation Failed.`);
  //   }
  // },
  // rating: PropTypes.number,
  // description: PropTypes.string
