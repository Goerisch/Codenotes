import {Dispatch} from 'redux';
import {Action} from '../actions';
import {ActionType} from '../action-types';
import {saveCells} from '../action-creators';
import {RootState} from '../reducers/index';

export const persistMiddleware = ({dispatch}: {dispatch: Dispatch<Action>}) => {
    return (next: (action: Action) => RootState) => {
        return (action: Action) => {
            next(action);
        };
    };
};
