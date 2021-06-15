import React, { Component } from 'react';

class Try extends Component {
    render() {
        const { tryInfo } = this.props;
        return (
            <li>
                {/*
                    props 는 부모에서 받은 유산이다 
                */}
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}

export default Try;
