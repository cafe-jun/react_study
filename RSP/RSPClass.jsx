import React, { Component } from 'react';

// 클래스의 경우
// constructor -> render -> ref => componentDidMount
// (setState/props 바뀔때) -> shouldComponentUpdate -> render -> componentDidUpdate
// ComponentDidMount,ComponentDidUpdate에서 모든 state를 조건문으로 분기 처리를 합니다.
// 필요할 때 setInterval 를 사용하고 componentWillUnMount 에 정리만 해주어도 된다
const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};
const score = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imagCoord) => {
    return Object.entries(rspCoords).find((v) => {
        return v[1] === imagCoord;
    })[0];
};

class RSP extends Component {
    state = {
        result: '',
        imgCoord: '0',
        score: 0,
    };
    interval; // hook 에서는 ref 로 변형
    // 클로저 문제 발생 !!!!!
    // 비동기 함수가 밖에 있는 변수를 참조하면
    // 클로저가 발생

    // 자식 컴포넌트가 되었을떄 꼭 넣어주어야
    // 메모리 누수 문제를 해결할수 있따
    componentDidMount() {
        //const { imgCoords } = this.state; // -142px
        // 컴포넌트가 첫 렌더링 된후 실행  -> 비동기 요청을 많이한다
        // render에서 setTimeout를 사용하였을때 무한 렌더링이 되기때문에
        // 사용하면 안된다
        this.interval = setInterval(this.changeHand, 1000);
        //     const { imgCoord } = this.state; // -142px
        //     changeHanle(imgCoord)
        // })
    }

    componentWillUnmount() {
        // 컴포넌트가 제거되기 직전 실행 (부모 컴포넌트가 자식 컴포넌드를 제거할때) -> 비동기 요청 정리
        clearInterval(this.interval);
    }
    changeHand = () => {
        const { imgCoord } = this.state;
        switch (imgCoord) {
            case rspCoords.바위:
                this.setState({
                    imgCoord: rspCoords.가위,
                });
                break;
            case rspCoords.가위:
                this.setState({
                    imgCoord: rspCoords.보,
                });
                break;
            case rspCoords.보:
                this.setState({
                    imgCoord: rspCoords.바위,
                });
                break;
        }
    };
    // choice onClickBtn에서 파라미터를 넣고자 할때 : 고차 함수
    // React 에서 자주 나오는 패턴
    onClickBtn = (choice) => () => {
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = score[choice];
        const cpuScore = score[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        if (diff === 0) {
            this.setState({
                result: '비겼습니다',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다',
                    score: prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다.',
                    score: prevState.score - 1,
                };
            });
        }
        this.interval = setTimeout(this.changeHand, 2000);
    };
    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="compute" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>
                        바위
                    </button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>
                        가위
                    </button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>
                        보
                    </button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}
export default RSP;
