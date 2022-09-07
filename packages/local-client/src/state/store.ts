import {configureStore} from '@reduxjs/toolkit';
import reducers from './reducers';
import {persistMiddleware} from './middlewares/persist-middleware';
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: reducers,
    middleware: [persistMiddleware, thunk],
});
