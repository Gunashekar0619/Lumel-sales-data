export const prepareRowData = (rows) => {
    const formatedRows = [];
    rows.forEach(parentData => {
        const tabelValues = {
            parentId: parentData.id,
            childId: null,
            label: parentData.label,
            value: parentData.value,
            originalValue: parentData.value,
            previousSum: parentData.value,
            variance: parentData.diff,
        };
        formatedRows.push(tabelValues);

        if (parentData?.children && parentData.children.length > 0) {
            parentData.children.forEach((childData, index) => {
                const formatedChildData = {
                    index,
                    parentId: parentData.id,
                    childId: childData.id,
                    label: childData.label,
                    value: childData.value,
                    originalValue: childData.value,
                    previousSum: childData.value,
                    variance: childData.diff,
                };
                formatedRows.push(formatedChildData);
            })
        }
    });

    return formatedRows;
};

export const getCalculatedValue = (item, onPercentage) => {
    const inputVal = item?.updatedValue || 0;
    const baseValue = item?.value || 0;
    let calculatedValue;
    let differenceWithOriginal;
    let differenceWithOriginalPercent;

    if (onPercentage) {
        calculatedValue = getValueOfpercentage(baseValue, inputVal);
        differenceWithOriginal = calculatedValue - item.originalValue;
        differenceWithOriginalPercent = item.originalValue ? (differenceWithOriginal / item.originalValue) * 100 : 0;
    } else {
        calculatedValue = inputVal;
        differenceWithOriginal = calculatedValue - item.originalValue;
        differenceWithOriginalPercent = item.originalValue ? (differenceWithOriginal / item.originalValue) * 100 : 0;
    }

    return {
        calculatedValue: calculatedValue,
        differenceWithOriginalPercent: differenceWithOriginalPercent
    }
}