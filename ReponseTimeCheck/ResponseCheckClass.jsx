import React,{ Component } from 'react';

class ResponseCheckClass extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 사용하세요',
        result: []
    }
    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state
        switch (state) {
            case 'waiting':
                this.setState({
                    state: 'ready',
                    message: '초록색이 되면 클릭하세요'
                })
                this.timeout = setTimeout(() => {
                    this.setState({
                        state: 'now',
                        message: '지금 클릭',
                    })
                    this.startTime = new Date()
                },Math.floor(Math.random() * 1000)+2000) // 2~3ch 
                break;
            case 'now': // 반응 속도 체크
                this.endTime = new Date();
                this.setState((prevState) => {
                    return {
                        state: 'waiting',
                        message: '클릭해서 시작하세요',
                        result: [...prevState.result,this.endTime - this.startTime],
                    }
                })
                break;
            case 'ready': // 성급하게 클릭 하였을때 
                // setTimeout으로 web api 에서 대기중인 함수가 2~3초후 콜스택으로 
                // 넘어가버리면서 실행이 됩니다. 
                // callStack 으로 넘어 간다고 하더라도 job 을 취소할수 있다 
                clearTimeout(this.timeout)
                this.setState({
                    state: 'waiting',
                    message: '너무 성급하시군요 초록색이 된후에 클릭하세요',
                })
                break;
            
        }

    }
     /*
     * false ,undefined, null은 jsx 에서 태그 없음을 의미합니다.
     */
    onReset = () => {
        this.setState({
            result: []
        })
    }
    renderAverage = () => {
        // 자식을 pure 를 변한을 해야한다 
        const { result } = this.state
        return result.length === 0
                ? null :
                <>
                    <div>평균 시간 : {result.reduce((a,c) => a+c)/result.length}ms</div>
                    <button onClick={this.onReset}>리셋</button>
                </>
    }
    render() {
        const { state,message} = this.state;

        return (
            <>
                <div 
                    id="screen" 
                    className={state}    
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {/** 렌더링하는 부분 분리  */}
                {this.renderAverage()}
            </>
        )
    }
}


export default ResponseCheckClass