import { useEffect, useState } from 'react';
import './App.css'
import TableCompoent from './components/TableComponent';
import SalesData from "./mock_data.json";
import { ColumnHeaders } from './constants/constant';
import { getCalculatedValue, prepareRowData } from './services/response.service';
import { updateChildValues, updateParentSum } from './services/simulator.service';

function App() {
  const [rowData, setRowData] = useState([]);
  
  const handleInputChange = (parentId, childId, updatedValue) =>  {    
    const temRowData = rowData.map(item => {
      if (item.parentId === parentId && item.childId === childId) {
        return { ...item, updatedValue };
      }
      return item;
    });
    setRowData(temRowData);
  }

  const reflectInputChanges = (parentId, childId, updatedRowData) => {
    let updatedRowDat;
    if (childId === null) {
      updatedRowDat = updateChildValues(parentId, updatedRowData);
    } else {
      updatedRowDat = updateParentSum(parentId, updatedRowData);
    }
    setRowData(updatedRowDat);
  }

  const handleClickChange = (parentId, childId, onPercentage) =>  {   
    console.log(onPercentage);
     
    const updatedRowData = rowData.map(item => {
      if (item.parentId === parentId && item.childId === childId) {
        const calculatedValues = getCalculatedValue(item, onPercentage);
        return {
          ...item, 
          previousSum: item.value,
          value: calculatedValues?.calculatedValue,
          variance: `${parseFloat(calculatedValues?.differenceWithOriginalPercent).toFixed(2)}%`
        };
      }
      return item;
    });    
    reflectInputChanges(parentId, childId, updatedRowData);
  }  

  useEffect(() => {
    const formatedData = prepareRowData(SalesData?.rows);
    setRowData(formatedData)
  }, [SalesData?.rows]);

  if (rowData.length === 0) {
    return <> No Data found  </>
  }
  
  return (
    <>
      <TableCompoent
        columnsHeader={ColumnHeaders}
        rowData={rowData}
        onInputChange={handleInputChange}
        onActionClick={handleClickChange}
      />
    </>
  )
}

export default App
