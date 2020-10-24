const moment = require('moment');
export const getPrettyDate = transaction =>{
    return {
        ...transaction,
        dateObj: transaction.date,
        date: moment.utc(transaction.date).format('MMM Do YY')
    }
}

export const getCumulativeAmounts = transactions => {
    
    // Sum up transactions for each day where at least one transaction has occured
    let amounts = new Map();
    for (let transaction of [...transactions].reverse()){
        const currentAmount = _getSignedAmount(transaction);
        const currentDay = moment.utc(transaction.dateObj).format('MMM Do');
        amounts.has(currentDay)? amounts.set(currentDay,amounts.get(currentDay) + currentAmount) : amounts.set(currentDay,currentAmount);
    }

    // Find cumulative amounts for all such days
    const cumulativeAmounts = [...amounts.values()].map((sum => value => sum += value)(0))
    return { xvalues: [...amounts.keys()], yvalues: cumulativeAmounts }
}

export const getCategoricalAmounts = transactions => {

    let amounts = new Map();
    for (let transaction of [...transactions].reverse()){
        const currentAmount = transaction.amount;
        const currentCategory = transaction.category;
        amounts.has(currentCategory)? amounts.set(currentCategory,amounts.get(currentCategory) + currentAmount) : amounts.set(currentCategory,currentAmount);
    }
    return { xvalues: [...amounts.keys()], yvalues: [...amounts.values()]}
}

export const getMonthlyCategoricalAmounts = transactions => {
    // Sum up transactions for each day where at least one transaction has occured
    let amounts = new Map();
    for (let transaction of [...transactions].reverse()){
        const currentAmount = transaction.amount;
        const currentMonth = moment.utc(transaction.dateObj).format('MMM YY');
        amounts.has(currentMonth)? amounts.set(currentMonth,amounts.get(currentMonth) + currentAmount) : amounts.set(currentMonth,currentAmount);
    }

    return { xvalues: [...amounts.keys()], yvalues: [...amounts.values()] }
}

export const getTitleCase = text => {
    return text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export const getCurrentFilter = (type,category) => {
    type = type? (type === 'income'? "All Income":"All Expenses"):"";
    type = getTitleCase(type);
    category = getTitleCase(category);
    return category? category:(type? type:"All transactions");
}

const _getSignedAmount = transaction => {
    if (transaction.type === 'expense') return -1 * transaction.amount;
    return transaction.amount;
}