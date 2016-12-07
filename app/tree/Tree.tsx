import * as React from 'react';
import {MyNode} from "../model";

interface Props {
    data: MyNode[]
}

const selectedStyle = {
    fontWeight: 'bold'
};

export default (props: Props) => (<div>
    <ul>
        {props.data.map((n, i) => <li key={i}><span style={n.isSelected ? selectedStyle : {}}>{n.text}</span>


            <ul>
                <li>1.1</li>
                <li>1.2</li>
            </ul>
        </li>)}
    </ul>
</div>);