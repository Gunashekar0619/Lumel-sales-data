import { getValueOfpercentage } from "../utils";

export const updateParentSum = (parentId, updatedRowData) => {
    const childRows = updatedRowData.filter(item => item.parentId === parentId && item.childId !== null);
    const sumOfChildren = childRows.reduce((sum, item) => sum + (parseFloat(item?.value) || 0), 0);
    const updatedRowDat = updatedRowData.map(item => {
        if (item.parentId === parentId && item.childId === null) {
            const differenceWithOriginal = sumOfChildren - item.originalValue;
            const differenceWithOriginalPercent = (differenceWithOriginal / item.originalValue) * 100;
            return { ...item, value: parseFloat(sumOfChildren).toFixed(2), variance: `${parseFloat(differenceWithOriginalPercent).toFixed(2)}%`};
        }
        return item;
    });
    return updatedRowDat;
};

export const updateChildValues = (parentId, updatedRowData) => {
    const parentRow = updatedRowData.find(item => item.parentId === parentId && item.childId === null);
    if (!parentRow) return;

    const childRows = updatedRowData.filter(item => item.parentId === parentId && item.childId !== null).map(item => ({ ...item, percentageInParentValue: parentRow.previousSum ? (item.value / parentRow.previousSum) * 100 : 0 }));
    const numberOfChildren = childRows.length;
    if (numberOfChildren === 0) return;

    const updatedRowDat = updatedRowData.map(item => {
        if (item.parentId === parentId && item.childId !== null) {
            const childRow = childRows.find(child => child.childId === item.childId);
            const newValue = getValueOfpercentage(parentRow.value, childRow.percentageInParentValue);
            const differenceWithOriginal = newValue - item.originalValue;
            const differenceWithOriginalPercent = item.originalValue ? (differenceWithOriginal / item.originalValue) * 100 : 0;

            return { ...item, value: parseFloat(newValue).toFixed(2), variance: `${parseFloat(differenceWithOriginalPercent).toFixed(2)}%` };
        }
        return item;
    });
    return updatedRowDat;
}