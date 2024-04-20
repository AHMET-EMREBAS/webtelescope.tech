describe('Query Property', () => {
  it('should test', () => {
    enum A {
      A = 'a',
      B = 'b',
    }

    const keys = Object.keys(A);

    console.log(keys);
    expect(keys).toContain('A');
    expect(keys).toContain('B');
  });
});
