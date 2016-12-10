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

const startsWith = _.startsWith;

export const moveDown = () => ({type: 'MOVE_SELECTED_DOWN'});
export const moveUp = () => ({type: 'MOVE_SELECTED_UP'});
export const moveLeft = () => ({type: 'MOVE_SELECTED_LEFT'});
export const selectFirstSubnode = (id: string) => ({id, type: 'SELECT_FIRST_SUBNODE'});
export const moveRightStart = () => ({type: 'MOVE_SELECTED_RIGHT_START'});
export const moveRightEnd = (id: string) => ({type: 'MOVE_SELECTED_RIGHT_END', id});

export const moveRight = (dispatch, getState: (() => MyNode[])) => {
    const selectedItem = _.find(getState(), n => n.isSelected);

    if (selectedItem.children)
        dispatch(selectFirstSubnode(selectedItem.id));
    else
        dispatch(moveRightStart());

    if (selectedItem != undefined && !selectedItem.children)
        setTimeout(() => dispatch(moveRightEnd(selectedItem.id)), 500);
};

export enum ChildState {
    loading
}


// flaten all nodes via DFS
// select next one[
const id = 10;
export function newReducer(state: MyNode[], action: Action) {
    let newState = _.cloneDeep(state);

    const maper = node => node.children ? [node, node.children.map(maper)] : [node];
    const allNodes = _.flattenDeep(newState.map(maper));
    const selectedIndex = _.findIndex(allNodes, n => n.isSelected);


    if (startsWith(action.type, 'MOVE_SELECTED') && selectedIndex == -1) {
        newState[0].isSelected = true;
        return newState;
    }

    if (action.type == 'MOVE_SELECTED_DOWN' && selectedIndex < allNodes.length - 1) {
        allNodes[selectedIndex].isSelected = false;
        allNodes[selectedIndex + 1].isSelected = true;
        return newState;
    }
    if (action.type == 'MOVE_SELECTED_UP' && selectedIndex > 0) {
        allNodes[selectedIndex].isSelected = false;
        allNodes[selectedIndex - 1].isSelected = true;
        return newState;
    }
    if (action.type == 'MOVE_SELECTED_LEFT') {
        allNodes[selectedIndex].isSelected = false;

        const parent = allNodes.find(n => _.find(n.children, child => child.id == allNodes[selectedIndex].id))
        parent.isSelected = true;
        return newState;
    }
    if (action.type == 'MOVE_SELECTED_RIGHT_END') {
        if (!allNodes[selectedIndex].children) {
            allNodes[selectedIndex].children = [{id: ('' + id++), text: 'subnode'}, {id: ('' + id++), text: 'subnode'}];
        }

        allNodes = _.flattenDeep(newState.map(maper));
        selectedIndex = _.findIndex(allNodes, n => n.isSelected);

        allNodes[selectedIndex].isSelected = false;
        allNodes[selectedIndex + 1].isSelected = true;
        return newState;
    }
    return newState;
}