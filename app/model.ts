import * as _ from 'lodash';

export interface MyNode {
    text: string,
    isSelected?: boolean
}
export interface Action {
    type: string
}

export function reducer(state: MyNode[], action: Action) {
    let newState = _.cloneDeep(state);

    if (action.type == 'MOVE_SELECTED_DOWN') {
        const selectedIndex = _.findIndex(newState, n => n.isSelected);
        if (selectedIndex == -1) {
            newState[0].isSelected = true;
        }
        else if (selectedIndex != newState.length - 1) {
            newState[selectedIndex].isSelected = false;
            newState[selectedIndex + 1].isSelected = true;
        }
        return newState;
    } else if ((action.type == 'MOVE_SELECTED_UP')) {
        const selectedIndex = _.findIndex(newState, n => n.isSelected);
        if (selectedIndex == -1) {
            newState[0].isSelected = true;
        }
        else if (selectedIndex != 0) {
            newState[selectedIndex].isSelected = false;
            newState[selectedIndex - 1].isSelected = true;
        }
        return newState;
    }
    return state;
}

export const moveDown = () => ({type: 'MOVE_SELECTED_DOWN'});
export const moveUp = () => ({type: 'MOVE_SELECTED_UP'});

export type ActionType = 'MOVE_SELECTED_DOWN' | 'MOVE_SELECTED_UP';
