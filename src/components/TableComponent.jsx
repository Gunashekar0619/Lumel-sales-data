import React from "react";
import InputComponent from "./InputComponent";

const TableCompoent = ({
    columnsHeader = [], // [{id: '', label: ''}]
    rowData = [],
    onInputChange = () => {},
    onActionClick = () => {},
    ...rest
}) => {

    if (columnsHeader.length === 0 || rowData.length === 0) {
        return null;
    }

    return (
        <table {...rest}>
            <thead>
                <tr>
                    {columnsHeader.map((headers, id) => (
                        <th key={`table-header-${headers.id}-${id}`}>
                            {headers.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rowData.map((data, i) => (
                    <tr key={`row-${i}-${data.parentId}-${data.childId ?? 'parent'}`} className={data?.childId ? 'child_rows' : ''}>
                        {columnsHeader.map((header, index) => (
                            <td key={`${data.index ?? i}-${header.id}-${index}`}>
                                {header.id === 'input' ? (
                                    <InputComponent onChange={(e) => onInputChange(data.parentId, data.childId, e.target.value)} />
                                ) : header.id === 'allocation_per' ? (
                                    <button className='primary' onClick={() => onActionClick(data.parentId, data.childId, true)}>Allocation (%)</button>
                                ) : header.id === 'allocation_value' ? (
                                    <button className='primary' onClick={() => onActionClick(data.parentId, data.childId, false)}>Allocation (Value)</button>
                                ) : (
                                    data[header.id]
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TableCompoent;