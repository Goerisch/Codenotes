import {Dispatch} from 'redux';
import {Action} from '../actions';
import {ActionType} from '../action-types';
import {saveCells} from '../action-creators';
import {RootState} from '../reducers/index';

export const persistMiddleware = ({dispatch}: {dispatch: Dispatch<Action>}) => {
    return (next: (action: Action) => void) => {
        return (action: Action) => {
            next(action);

            if (
                [
                    ActionType.MOVE_CELL,
                    ActionType.UPDATE_CELL,
                    ActionType.INSERT_CELL_AFTER,
                    ActionType.DELETE_CELL,
                ].includes(action.type)
            ) {
                console.log('I WANT TO SAVE CELLS');
            }
        };
    };
};
