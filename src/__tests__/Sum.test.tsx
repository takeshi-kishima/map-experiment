describe('sumのテスト', () => {
    test('合計値が正しい', () => {
        expect(2+3).toBe(5)
    })
    test('合計値が正しくない', () => {
        expect(2+3).not.toBe(6)
    })
})