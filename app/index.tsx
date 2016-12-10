import * as React from 'react';
import * as ReactDom from 'react-dom';
import { MyNode, newReducer, moveDown, moveUp, moveLeft, moveRightStart,moveRightEnd, moveRight } from './model';
import Tree from './tree/Tree';

let state: MyNode[] = [
    { id: '1', text: 'Root 1' },
    { id: '2', text: 'Root 2' },
    { id: '3', text: 'Root 3' },
    { id: '4', text: 'Root 4' },
    { id: '5', text: 'Root 5' },
];

document.addEventListener('keydown', checkKey, false);

function checkKey(e: KeyboardEvent) {
    e = e || window.event;

    if (e.keyCode == 38) {
        state = newReducer(state, moveUp());
        render();
    }
    else if (e.keyCode == 40) {
        state = newReducer(state, moveDown());
        render();
    }
    else if (e.keyCode == 37) {
        state = newReducer(state, moveLeft());
        render();
    }
    else if (e.keyCode == 39) {
        state = newReducer(state, moveRightEnd());
        render();
    }

}

const render = () => {
    const root = (
        <div>
            <Tree data={state} />
        </div>);

    ReactDom.render(root, document.getElementById('app'));
};


render();

