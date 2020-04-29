const calculateTip = (total, tipParcent) => {
    const tip = total * tipParcent
    return total + tip
}

module.exports = {
    calculateTip
}