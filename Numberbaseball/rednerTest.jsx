import React, { PureComponent } from  'react'

class Test extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean : true,
        object: {}, // 참조 관계일 경우 PureComponent 도 구분 하기 힘들다  
        array : []
    }
    // 변경 되지 않으면 랜더링이 다시 되지 않도록 설정 
    // PureComponent 를 돌려 놓음 
    // shouldComponentUpdate(nextProps,nextState,nextContext) {
    //     if(this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // }

    onClick = () => {
        const array = this.state.array;
        array.push(1)
        // {a:1} 에서 setState {a:1}을 할대 새로 렌더링하므로 state에
        // 객체구조를 안 쓰는게 좋습니다. 
        this.setState({
            array: [...this.state.array,1]
            //array: array
        })
    }
    render() {
        console.log(`렌더링 ${this.state.array}`)
        return (
            <di>
                <button onClick={this.onClick}>클릭</button>
            </di>
        )
    }

}

export default Test