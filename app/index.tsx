import * as React from 'react';
import * as ReactDom from 'react-dom';
import {MyNode, reducer, moveDown, moveUp} from './model';
import Tree from './tree/Tree';


let initialState: MyNode[] = [
    {text: 'Root 1'},
    {text: 'Root 2'},
    {text: 'Root 3'},
    {text: 'Root 4'},
    {text: 'Root 5'},
];

document.addEventListener('keydown', checkKey, false);

function checkKey(e: KeyboardEvent) {
    e = e || window.event;

    if (e.keyCode == 38) {
        initialState = reducer(initialState, moveUp());
        render();
    }
    else if (e.keyCode == 40) {
        initialState = reducer(initialState, moveDown());
        render();
    }
    else if (e.keyCode == 37) {
        //left
        render();
    }
    else if (e.keyCode == 39) {
        //right
        render();
    }

}

const render = () => {
    const root = (
        <div>
            <Tree data={initialState}/>
        </div>);

    ReactDom.render(root, document.getElementById('app'));
};


render();

