import { put, call, takeEvery, take, all, fork, getContext, select } from "redux-saga/effects";
import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  GET_HOT_POSTS,
  GET_HOT_POSTS_SUCCESS,
  GET_HOT_POSTS_ERROR,
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  REGISTER_POST,
  REGISTER_POST_SUCCESS,
  REGISTER_POST_ERROR,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  CHECK_PERMISSION,
  CHECK_PERMISSION_SUCCESS,
  CHECK_PERMISSION_ERROR
} from '../modules/board';
import { boardAPI } from '../api';
import Cookies from 'js-cookie';

function* getPosts({ payload }) {
  const { pageNum, boardId } = payload;
  const state  = (yield select()).boardReducer;
  let displayPageNum, displayMinNum;
  try {
    const res = yield call(boardAPI.getArticleList, pageNum, boardId);  
    
    if (pageNum < (state.PAGE_MAX_SIZE / 2 + 1)) {
      if (res.data.totalPage >= state.PAGE_MAX_SIZE) displayPageNum = state.PAGE_MAX_SIZE;
      displayMinNum = 1;
    } else {
      if (res.data.totalPage - pageNum >= parseInt(state.PAGE_MAX_SIZE / 2)) {
        displayPageNum = pageNum - parseInt(state.PAGE_MAX_SIZE / 2);
        displayMinNum = pageNum + parseInt(state.PAGE_MAX_SIZE / 2);
      } else {
        displayPageNum = res.data.totalPage - state.PAGE_MAX_SIZE + 1;
        displayMinNum = res.data.totalPage;
      }
    }
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: {
        data: res.data,
        posts: res.data.articles,
        pageNum,
        displayPageNum,
        displayMinNum
      }
    });
  } catch (e) {
    yield put({
      type: GET_POSTS_ERROR,
      error: e.response
    });
  }
}

function* getPost({ payload }) {
  const { token, id, boardId } = payload;
  try {
    const res = yield call(boardAPI.getArticle, id, token, boardId);
    yield put({
      type: GET_POST_SUCCESS,
      payload: res
    });
  } catch (e) {
    yield put({
      type: GET_POST_ERROR,
      error: e.response
    });
  }
}

function* getHotPosts() {
  try {
    const res = yield call(boardAPI.getHotArticleList);
    yield put({
      type: GET_HOT_POSTS_SUCCESS,
      payload: res
    });
  } catch (e) {
    yield put({
      type: GET_HOT_POSTS_ERROR,
      error: e.response
    })
  }
}

function* registerPost({ payload }) {
  const { token, title, content, boardId, tempNick, tempPw } = payload;
  let body = {};

  if (boardId === -1) {
    body = {
      title,
      content,
      nickname: tempNick,
      password: tempPw
    } 
  } else {
    body = {
      title,
      content,
      board_id: boardId
    }
  }
  try {
    const res = yield call(boardAPI.registerArticle, token, body, boardId);
    yield put({
      type: REGISTER_POST_SUCCESS,
      payload: res
    })
  } catch (e) {
    yield put({
      type: REGISTER_POST_ERROR,
      error: e.response
    })
  }
}

function* deletePost({ payload }) {
  const { id, token, tempPassword } = payload;
  try {
    const res = yield call(boardAPI.removeArticle, id, token || tempPassword);
    yield put({
      type: DELETE_POST_SUCCESS,
      payload: res
    })
  } catch (e) {
    yield put({
      type: DELETE_POST_ERROR,
      error: e.response
    })
  }
}

function* editPost({ payload }) {
  const { title, id, token, boardId, content, tempPassword } = payload;
  let body = {
    board_id: boardId,
    title,
    content
  };

  if (boardId === -1) {
    body.password = tempPassword;
  } 
  try {
    const res = yield call(boardAPI.reviseArticle, id, token, body, boardId);
    yield put({
      type: EDIT_POST_SUCCESS,
      payload: res
    })
  } catch (e) {
    yield put({
      type: EDIT_POST_ERROR,
      error: e.response
    })
  }
}

function* checkPermission({ payload }) {
  const { id, token, tempPassword, boardId } = payload;
  try {
    let body = {
      article_id: id
    }
    if (boardId === -1) body['password'] = tempPassword;
    const res = yield call(boardAPI.checkArticleAuthority, token, body, boardId);
    console.log(res);
    yield put({
      type: CHECK_PERMISSION_SUCCESS,
      payload: res
    })
  } catch (e) {
    yield put({
      type: CHECK_PERMISSION_ERROR,
      error: e.response
    })
  }
}



function* watchFetchData() {
  yield takeEvery(GET_POSTS, getPosts);
  yield takeEvery(GET_HOT_POSTS, getHotPosts);
  yield takeEvery(GET_POST, getPost);
  yield takeEvery(REGISTER_POST, registerPost);
  yield takeEvery(EDIT_POST, editPost);
  yield takeEvery(DELETE_POST, deletePost);
  yield takeEvery(CHECK_PERMISSION, checkPermission);
}

export default function* boardSaga() {
  yield all([
    watchFetchData()
  ])
}