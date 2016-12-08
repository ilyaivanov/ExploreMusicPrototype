import * as React from 'react';
import {MyNode, ChildState} from "../model";

interface Props {
    data: MyNode[],
}

const selectedStyle = {
    fontWeight: 'bold'
};

const loading = (n: MyNode) =>
    n.childState == ChildState.loading ?
        <small>loading...</small>: null;


const tree = (props: Props) => (<div>
    <ul>
        {props.data.map((n, i) => <li key={i}><span
            style={n.isSelected ? selectedStyle : {}}>
            {n.text} {loading(n)}</span>
            {n.children ? tree({data: n.children}) : null}
        </li>)}
    </ul>
</div>);

export default tree;