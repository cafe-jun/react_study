import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45)
        .fill()
        .map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

class LotteClass extends Component {
    state = {
        winNumbers: getWinNumbers(), // 당점 숫자들
        winBalls: [],
        bonus: null, // 보너스 공
        redo: false,
    };
    timeout = [];

    runTimeout = () => {
        console.log('runTimeout');
        for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
            // let 을 사용하면 클로저 문제가 안생긴다
            this.timeout[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, prevState.winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000);
        }
        this.timeout[6] = setTimeout(() => {
            this.setState({
                bonus: this.state.winNumbers[6],
                redo: true, // 한번더 뽑을래 ??
            });
        }, 7000);
    };

    componentDidMount() {
        console.log('didMount');
        // 컴포넌트 랜더링 되자 마자 사용
        this.runTimeout();
    }
    componentWillUnmount() {
        this.timeout.forEach((v) => {
            clearTimeout(v);
        });
    }
    // setTimeout를 사용할때는 내가 원치 않았는데 컴포넌트가 사라지는경우
    // 부모 컴포넌트를 제거할때 setTimeout 등을 제거 해야한다
    // 제거를 하지 않았을떄 메모리 누구가 생길수 있다
    //

    componentDidUpdate(prevProps, prevState) {
        // 컴포넌트가 업데이트 될때마다 componentDidUpdate 가 실행
        console.log('didUpdate');
        if (this.state.winBalls.length === 0) this.runTimeout();
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(), // 당점 숫자들
            winBalls: [],
            bonus: null, // 보너스 공
        });
        this.timeout = [];
    };

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => (
                        <Ball key={v} number={v} />
                    ))}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                <button onClick={redo ? this.onClickRedo : () => {}}>한 번 더 !</button>
            </>
        );
    }
}

export default LotteClass;

// import React, { Component, useState, useEffect, useRef, memo } from 'react';

// const getRandomNumber = () => {
//     return Math.floor(Math.random() * (9 - 0));
// };

// class Lotte extends Component {
//     state = {
//         number: getRandomNumber(),
//         count: 0,
//         list: [],
//     };

//     internval;

//     componentDidMount() {
//         this.internval = setInterval(this.recommandedNumber, 2000);
//     }
//     componentWillUnmount() {
//         clearInterval(this.internval);
//     }

//     recommandedNumber = () => {
//         this.setState((prevState) => {
//             return {
//                 number: getRandomNumber(),
//                 count: prevState.count + 1,
//                 list: [...prevState.list, prevState.number],
//             };
//         });
//         console.log(this.state.list);
//         if (this.state.count >= 6) {
//             clearInterval(this.internval);
//         }
//     };

//     render() {
//         const { list } = this.state;
//         return (
//             <>
//                 <div className="recommendContainer">
//                     {list.map((v, i) => {
//                         return (
//                             <div key={`${i}번숫자`} className="recommendContainer">
//                                 {v}
//                             </div>
//                         );
//                     })}
//                 </div>
//             </>
//         );
//     }
// }

// export default Lotte;
