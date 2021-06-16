import React, { PureComponent,Component,memo} from 'react';

// class Try extends PureComponent {
//     // custom 을 
//     //shouldComponentUpdate(nextProps,nextState,nextContext) {}
//     render () {
//         const { tryInfo } = this.props
//         return ( 
//         <li>
//             {/*
//                 props 는 부모에서 받은 유산이다 
//             */}
//             <div>{tryInfo.try}</div>
//             <div>{tryInfo.result}</div>
//         </li>
//         )
//     }
// }

// 성능 최적하를 하기 위해 memo 로 감싸주면 된다 
const Try = memo(({tryInfo}) =>  {
    return (
        <li>
            {/*
                props 는 부모에서 받은 유산이다 
            */}
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
})


export default Try;
