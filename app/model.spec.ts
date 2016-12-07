import * as _ from 'lodash';

import {reducer, MyNode, moveDown, moveUp} from './model';

describe('When none of the nodes are selected', () => {
    let initialState: MyNode[];
    beforeEach(() => {
        initialState = [
            {text: 'Root 1'},
            {text: 'Root 2'}
        ];
    });

    it('when hitting move down it should select a first node', () => {
        const newNodes = reducer(initialState, moveDown());

        expect(newNodes.filter(n => n.isSelected).length).toBe(1);
        expect(newNodes[0].isSelected).toBe(true);
    });

    it('when hitting move up it should select a first node', () => {
        const newNodes = reducer(initialState, moveUp());

        expect(newNodes.filter(n => n.isSelected).length).toBe(1);
        expect(newNodes[0].isSelected).toBe(true);
    });

    describe('When first node is selected', () => {
        beforeEach(() => {
            initialState[0].isSelected = true;
        });
        it('hitting down key should select second node', () => {
            const newNodes = reducer(initialState, moveDown());

            expect(newNodes.filter(n => n.isSelected).length).toBe(1);
            expect(newNodes[1].isSelected).toBe(true);
        });
        it('hitting up key should do nothing', () => {
            const newNodes = reducer(initialState, moveUp());

            expect(newNodes.filter(n => n.isSelected).length).toBe(1);
            expect(newNodes[0].isSelected).toBe(true);
        });
    });

    describe('When last node is selected', () => {
        beforeEach(() => {
            _.last(initialState).isSelected = true;
        });

        it('hitting down key should do nothing', () => {
            const newNodes = reducer(initialState, moveDown());

            expect(newNodes.filter(n => n.isSelected).length).toBe(1);
            expect(_.last(newNodes).isSelected).toBe(true);
        });

        it('hitting up key should move selectio upwards', () => {
            const newNodes = reducer(initialState, moveUp());

            expect(newNodes.filter(n => n.isSelected).length).toBe(1);
            expect(newNodes[0].isSelected).toBe(true);
        });
    });
});