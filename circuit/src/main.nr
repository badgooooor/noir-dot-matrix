fn main(x: [Field; 2], y: [Field; 2], solution: Field) {
    let out = dot_product(x,y);
    assert(out == solution);
}

fn dot_product(x: [Field; 2], y: [Field; 2]) -> Field {
    let mut out = 0;
    for i in 0..2 {
        out = out + x[i] * y[i];
    }
    out
}

#[test]
fn test_dot_correct() {
    main([2,2], [2,1], 6)
}

#[test(should_fail)]
fn test_dot_fail() {
    main([2,2], [2,1], 5)
}
