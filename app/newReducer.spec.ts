import * as _ from 'lodash';

import {
    newReducer, MyNode, moveUp, ChildState,
    moveRightEnd, moveRight, moveDown, moveLeft,
    selectFirstSubnode
} from './model';

describe('Having a nested list of nodes', () => {
    const node = (id, children): MyNode => ({
        id,
        text: '',
        children: children
    })
    let nodes: MyNode[];
    beforeEach(() => {
        nodes = [
            node(1),
            node(2, [
                node(3),
                node(4, [
                    node(5),
                    node(6, [
                        node(7),
                        node(8),
                    ]),
                ]),
                node(9, [
                    node(10),
                    node(11),
                ]),
            ]),
            node(12),
        ];
    });

    describe('when second node is selected', () => {
        it('moving left should do nothing', () => {
            nodes[1].isSelected = true;
            const newState = newReducer(nodes, moveLeft());
            expect(newState[1].isSelected)
                .toBe(true);
            expect(newState[1].childState == ChildState.hidden)
                .toBe(true);

            newState = newReducer(newState, moveRightEnd('2'));
            expect(newState[1].isSelected)
                .toBe(true);
            expect(newState[1].childState)
                .toBe(undefined);

        });
    })
    describe('when last child is selected ', () => {
        beforeEach(() => {
            nodes[1].children[1].children[1].isSelected = true;
        });
        it('moving down should select next sibling of a parent', () => {
            const newState = newReducer(nodes, moveDown());
            expect(newState[1].children[1].children[1].isSelected)
                .toBe(false);
            expect(newState[1].children[1].children[1].children[0].isSelected)
                .toBe(true);
        });

        it('moving up should select upper element', () => {
            const newState = newReducer(nodes, moveUp());
            expect(newState[1].children[1].children[1].isSelected)
                .toBe(false);
            expect(newState[1].children[1].children[0].isSelected)
                .toBe(true);
        });

        it('moving left should select parent', () => {
            const newState = newReducer(nodes, moveLeft());
            expect(newState[1].children[1].children[1].isSelected)
                .toBe(false);
            expect(newState[1].children[1].isSelected)
                .toBe(true);
        });

        it('moving right should select first child', () => {
            const newState = newReducer(nodes, moveRightEnd());
            expect(newState[1].children[1].children[1].isSelected)
                .toBe(false);
            expect(newState[1].children[1].children[1].children[0].isSelected)
                .toBe(true);
        });
    });
});
