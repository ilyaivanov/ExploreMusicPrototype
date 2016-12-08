import * as _ from 'lodash';

export interface MyNode {
    text: string,
    id: string,
    children?: MyNode[],
    childState?: ChildState,
    isSelected?: boolean
}
export interface Action {
    type: string
}

export function reducer(state: MyNode[], action: Action) {
    let newState = _.cloneDeep(state);
    const selectedIndex = _.findIndex(newState, n => n.isSelected);

    if (_.startsWith(action.type, 'MOVE_SELECTED')) {
        if (selectedIndex == -1) {
            newState[0].isSelected = true;
            return newState;
        }
    }
    if (action.type == 'MOVE_SELECTED_DOWN') {
        if (selectedIndex != newState.length - 1) {
            newState[selectedIndex].isSelected = false;
            newState[selectedIndex + 1].isSelected = true;
        }
        return newState;
    } else if ((action.type == 'MOVE_SELECTED_UP')) {
        if (selectedIndex != 0) {
            newState[selectedIndex].isSelected = false;
            newState[selectedIndex - 1].isSelected = true;
        }
        return newState;
    } else if (action.type == 'MOVE_SELECTED_RIGHT_START') {
        newState[selectedIndex].childState = ChildState.loading;
        return newState;
    } else if (action.type == 'MOVE_SELECTED_RIGHT_END') {
        const node = _.find(newState, n => n.id == action.id);
         node.childState = undefined;
         node.children = [{ id: '7', text: 'subnode' }, { id: '8', text: 'subnode' }];
        return newState;
    }
    return newState;
}

export const moveDown = () => ({ type: 'MOVE_SELECTED_DOWN' });
export const moveUp = () => ({ type: 'MOVE_SELECTED_UP' });
export const moveRightStart = () => ({ type: 'MOVE_SELECTED_RIGHT_START' });
export const moveRightEnd = (id: string) => ({ type: 'MOVE_SELECTED_RIGHT_END', id, payload: [{ text: 'child' }] });

export const moveRight = (dispatch, getState: (() => MyNode[])) => {
    const selectedItem = _.find(getState(), n => n.isSelected);

    dispatch(moveRightStart());

    if (selectedItem != undefined)
        setTimeout(() => dispatch(moveRightEnd(selectedItem.id)), 500);
};

export enum ChildState {
    loading
}