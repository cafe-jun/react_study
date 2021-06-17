import React,{ Component } from 'react'

// 클래스의 경우
// constructor -> render -> ref => componentDidMount
// (setState/props 바뀔때) -> shouldComponentUpdate -> render -> componentDidUpdate
// 부모가 나를 없앴을때 componentWillUnmount -> 소멸 

class RSP extends Component {
    state = {
        result : '',
        imgCoord: 0,
        score: 0,
    }
    componentDidMount() { // 컴포넌트가 첫 렌더링 된후 실행

    }
    componentDidUpdate () { // 리렌더링 후에는 실행 
        
    }
    componentWillUnmount() { // 컴포넌트가 제거되기 직전 실행 (부모 컴포넌트가 자식 컴포넌드를 제거할때)

    }
    render() {
        const { result , score } = this.state;
        return (
            <>
                <div id="compute" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg)`}}></div>
                <div>
                    <button id="rock" className="btn" onClick={() => onClickBtn}>바위</button>
                    <button id="scissor" className="btn" onClick={() => onClickBtn}>가위</button>
                    <button id="paper" className="btn" onClick={() => onClickBtn}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}
export default RSP