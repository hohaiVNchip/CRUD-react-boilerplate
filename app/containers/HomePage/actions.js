/*
 *
 * HomePage actions
 *
 */

import {
  GET_LIST_BOOK,
  GET_LIST_BOOK_SUCCESS,
  GET_LIST_BOOK_FAIL,
} from './constants';

export function getListBook(limit, offset, text) {
  return {
    type: GET_LIST_BOOK,
    limit,
    offset,
    text,
  };
}

export function getListBookSuccess(data) {
  return {
    type: GET_LIST_BOOK_SUCCESS,
    data,
  };
}

export function getListBookFail(error) {
  return {
    type: GET_LIST_BOOK_FAIL,
    error,
  };
}