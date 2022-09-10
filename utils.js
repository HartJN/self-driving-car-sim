// When t = 0 ->  value = A
// When t = 1 -> value = B
// if A, t, B -> difference = half of difference.
function lerp(A, B, t) {
  return A + (B - A) * t
}
