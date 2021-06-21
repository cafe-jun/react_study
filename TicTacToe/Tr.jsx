import React, { Component,useMemo } from 'react';
import Td from './Td';
const Tr = ({ rowData, rowIndex, dispatch }) => {
    return (
        <tr>
            {Array(rowData.length)
                .fill()
                .map((td, i) => (
                    useMemo(
                        <Td key={i} rowData={rowData} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}>
                            {''}
                        </Td>,[rowData[i]])
                ))}
        </tr>
    );
};

export default Tr;
