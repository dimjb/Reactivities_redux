import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';
import rootReducer from './root.reducer';
import rootSaga from './root.sagas';


const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];


export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;