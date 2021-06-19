import React, { PureComponent, memo } from 'react';

const Ball = memo(({ number }) => {
    let background;
    switch (true) {
        case number <= 10:
            background = 'red';
            break;
        case number <= 20:
            background = 'orange';
            break;
        case number <= 30:
            background = 'yellow';
            break;
        case number <= 40:
            background = 'blue';
            break;
        case number <= 45:
            background = 'green';
            break;
    }
    return (
        <div className="ball" style={{ background }}>
            {number}
        </div>
    );
});

// class Ball extends PureComponent {
//     render() {
//         const { number } = this.props;
//         let background;
//         switch (number) {
//             case number <= 10:
//                 background = 'red';
//                 break;
//             case number <= 20:
//                 background = 'orange';
//                 break;
//             case number <= 30:
//                 background = 'yellow';
//                 break;
//             case number <= 40:
//                 background = 'blue';
//                 break;
//             default:
//                 background = 'green';
//         }
//         return (
//             <div className="ball" style={{ background }}>
//                 {number}
//             </div>
//         );
//     }
// }

export default Ball;
