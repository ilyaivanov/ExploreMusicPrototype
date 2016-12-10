import * as _ from 'lodash';

import {
    reducer, MyNode, moveUp, moveRightStart, ChildState, moveRightEnd, moveRight, moveDown,
    selectFirstSubnode
} from './model';

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

describe('When the first node is selected and contents have not been loaded', () => {
    let initialState: MyNode[]
    beforeEach(() => {
        initialState = [
            {id: '1', text: 'Root 1', isSelected: true},
            {id: '2', text: 'Root 2'}
        ];
    })

    it('on expand right node should first set to loading state', () => {
        let newNodes = reducer(initialState, moveRightStart())

        expect(newNodes[0].childState).toBe(ChildState.loading)

        newNodes = reducer(newNodes, moveRightEnd('1'))

        expect(newNodes[0].childState).toBe(undefined)
    })

    describe('having a selected node with children', () => {
        beforeEach(() => {
            initialState[0].children = [
                {id: '3', text: 'subnode'},
                {id: '4', text: 'subnode'},
            ]
        });
        describe('when navigating to the left', () => {
            let navigatedToTheLeftState;
            beforeEach(() => {
                navigatedToTheLeftState = reducer(initialState, selectFirstSubnode('1'));
            });
            it('first subchild should be selected', () => {
                expect(navigatedToTheLeftState[0].children[0].isSelected).toBe(true);
                expect(navigatedToTheLeftState[0].isSelected).toBe(false);
            })
        })
    })
});


describe('Having a selected subnode', () => {
    let initialState: MyNode[]
    beforeEach(() => {
        initialState = [
            {
                id: '1', text: 'Root 1',
                children: [
                    {id: '3', text: 'sub', isSelected: true},
                    {id: '4', text: 'sub'}
                ]
            },
            {id: '2', text: 'Root 2'}
        ];
    });

    it('when moving down next subnode should be selected', () => {
        const nextState = reducer(initialState, moveDown());
        expect(nextState[0].children[0].isSelected).toBe(false);
    })
});

