const {calculateTip} = require('../src/math')

test("Should Calculate total with tip", () => {
    const total = calculateTip(10, .3)

    expect(total).toBe(13)

})