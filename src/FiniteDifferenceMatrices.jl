module FiniteDifferenceMatrices

# export

export fdcoefficient, fdvalue, fdmatrix

# package

using SparseArrays

# implementation

@doc raw"""
`Fornberg1988[d,n,m]`

This is a foolish implementation of the tables of [B. Fornberg, _Math. Comp._ **51** 699-706 (1988)](https://doi.org/10.1090/S0025-5718-1988-0935077-0) and [Wikipedia](https://en.wikipedia.org/wiki/Finite_difference_coefficient) by hand. This was coded to test the `fdcoefficient()`.

## Examples
```jldoctest
julia> FiniteDifferenceMatrices.Fornberg1988[:c,1,2]
1×3 Matrix{Rational{Int64}}:
 -1//2  0//1  1//2

julia> FiniteDifferenceMatrices.Fornberg1988[:c,2,2]
1×3 Matrix{Rational{Int64}}:
 1//1  -2//1  1//1
```
"""
Fornberg1988 = Dict(
  # Central
  (:c, 1, 2) => [                           -1//2    0//1     1//2                                         ],
  (:c, 1, 4) => [                   1//12   -2//3    0//1     2//3   -1//12                                ],
  (:c, 1, 6) => [         -1//60    3//20   -3//4    0//1     3//4   -3//20   1//60                        ],
  (:c, 1, 8) => [  1//280 -4//105   1//5    -4//5    0//1     4//5   -1//5    4//105 -1//280               ],
  (:c, 2, 2) => [                            1//1   -2//1     1//1                                         ],
  (:c, 2, 4) => [                  -1//12    4//3   -5//2     4//3   -1//12                                ],
  (:c, 2, 6) => [          1//90   -3//20    3//2  -49//18    3//2   -3//20   1//90                        ],
  (:c, 2, 8) => [ -1//560  8//315  -1//5     8//5 -205//72    8//5   -1//5    8//315 -1//560               ],
  (:c, 3, 2) => [                  -1//2     1//1    0//1    -1//1    1//2                                 ],
  (:c, 3, 4) => [          1//8    -1//1    13//8    0//1   -13//8    1//1   -1//8                         ],
  (:c, 3, 6) => [ -7//240  3//10 -169//120  61//30   0//1   -61//30 169//120 -3//10   7//240               ],
  (:c, 4, 2) => [                   1//1    -4//1    6//1    -4//1    1//1                                 ],
  (:c, 4, 4) => [         -1//6     2//1   -13//2   28//3   -13//2    2//1   -1//6                         ],
  (:c, 4, 6) => [  7//240 -2//5   169//60 -122//15  91//8  -122//15 169//60  -2//5    7//240               ],
  (:c, 5, 2) => [                  -1//2     2//1   -5//2     0//1    5//2   -2//1    1//2                 ],
  (:c, 5, 4) => [          1//6    -3//2    13//3  -29//6     0//1   29//6  -13//3    3//2   -1//6         ],
  (:c, 5, 6) => [-13//288 19//36  -87//32   13//2 -323//48    0//1  323//48 -13//2   87//32 -19//36 13//288],
  (:c, 6, 2) => [                   1//1    -6//1   15//1   -20//1   15//1   -6//1    1//1                 ],
  (:c, 6, 4) => [          -1//4    3//1   -13//1   29//1   -75//2   29//1  -13//1    3//1   -1//4         ],
  (:c, 6, 6) => [ 13//240 -19//24  87//16  -39//2  323//8 -1023//20 323//8  -39//2   87//16 -19//24 13//240],
  # Forward
  (:f, 1, 1) => [   -1//1       1//1                                                                         ],
  (:f, 1, 2) => [   -3//2       2//1      -1//2                                                              ],
  (:f, 1, 3) => [  -11//6       3//1      -3//2       1//3                                                   ],
  (:f, 1, 4) => [  -25//12      4//1      -3//1       4//3     -1//4                                         ],
  (:f, 1, 5) => [ -137//60      5//1      -5//1      10//3     -5//4      1//5                               ],
  (:f, 1, 6) => [  -49//20      6//1     -15//2      20//3    -15//4      6//5     -1//6                     ],
  (:f, 1, 7) => [ -363//140     7//1     -21//2      35//3    -35//4      21//5    -7//6      1//7           ],
  (:f, 1, 8) => [ -761//280     8//1     -14//1      56//3    -35//2      56//5    -14//3     8//7    -1//8  ],
  (:f, 2, 1) => [    1//1      -2//1       1//1                                                              ],
  (:f, 2, 2) => [    2//1      -5//1       4//1      -1//1                                                   ],
  (:f, 2, 3) => [   35//12    -26//3      19//2     -14//3     11//12                                        ],
  (:f, 2, 4) => [   15//4     -77//6     107//6     -13//1     61//12    -5//6                               ],
  (:f, 2, 5) => [  203//45    -87//5     117//4    -254//9     33//2    -27//5    137//180                   ],
  (:f, 2, 6) => [  469//90   -223//10    879//20   -949//18    41//1   -201//10  1019//180   -7//10          ],
  (:f, 2, 7) => [29531//5040 -962//35    621//10  -4006//45   691//8   -282//5   2143//90  -206//35  363//560],
  (:f, 3, 1) => [   -1//1       3//1      -3//1       1//1                                                   ],
  (:f, 3, 2) => [   -5//2       9//1     -12//1       7//1     -3//2                                         ],
  (:f, 3, 3) => [  -17//4      71//4     -59//2      49//2    -41//4      7//4                               ],
  (:f, 3, 4) => [  -49//8      29//1    -461//8      62//1   -307//8     13//1    -15//8                     ],
  (:f, 3, 5) => [ -967//120   638//15  -3929//40    389//3  -2545//24   268//5  -1849//120   29//15          ],
  (:f, 3, 6) => [ -801//80    349//6  -18353//120  2391//10 -1457//6   4891//30  -561//8    527//30 -469//240],
  (:f, 4, 1) => [    1//1      -4//1       6//1      -4//1      1//1                                         ],
  (:f, 4, 2) => [    3//1     -14//1      26//1     -24//1     11//1     -2//1                               ],
  (:f, 4, 3) => [   35//6     -31//1     137//2    -242//3    107//2    -19//1     17//6                     ],
  (:f, 4, 4) => [   28//3    -111//2     142//1   -1219//6    176//1   -185//2     82//3     -7//2           ],
  (:f, 4, 5) => [ 1069//80  -1316//15  15289//60  -2144//5  10993//24 -4772//15  2803//20  -536//15  967//240],
  # Backward
  (:b, 1, 1) => [-1//1  1//1                         ],
  (:b, 1, 2) => [ 1//2 -2//1   3//2                  ],
  (:b, 1, 3) => [-1//3  3//2  -3//1 11//6            ],
  (:b, 2, 1) => [ 1//1 -2//1   1//1                  ],
  (:b, 2, 2) => [-1//1  4//1  -5//1  2//1            ],
  (:b, 3, 1) => [-1//1  3//1  -3//1  1//1            ],
  (:b, 3, 2) => [ 3//2 -7//1  12//1 -9//1   5//2     ],
  (:b, 4, 1) => [ 1//1 -4//1   6//1 -4//1   1//1     ],
  (:b, 4, 2) => [-2//1 11//1 -24//1 26//1 -14//1 3//1],
)

@doc raw"""
`fdcoefficient(; n::Int=1, m::Int=2, d=:c)`

This function returns a `Dict` of the finite difference coefficients ``c_i`` of

```math
\frac{\mathrm{d}^n f(x)}{\mathrm{d}x^n} = \frac{1}{\Delta x^n} \sum_{i} c_i f(x+i\Delta x) + O(\Delta x^m).
```

This implementation is based on [a post on discourse](https://discourse.julialang.org/t/generating-finite-difference-stencils/85876/5) by [@stevengj](https://discourse.julialang.org/u/stevengj/summary) and this function is tested to return results equivalent to [B. Fornberg, _Math. Comp._ **51** 699-706 (1988)](https://doi.org/10.1090/S0025-5718-1988-0935077-0).

| Arguments | Description |
| --- | --- |
| `n` | order of derivative ``n`` |
| `m` | order of accuracy ``m`` |
| `d` | direction, `:c` central, `:f` forward, `:b` backward |

## Examples

The coefficients of the central, ``n=1`` and ``m=2`` differences are ``c_{-1} = -1/2, c_{0} = 0, c_{1} = 1/2``.
```math
\frac{\mathrm{d}f(x)}{\mathrm{d} x} = \frac{f(x+\Delta x) - f(x-\Delta x)}{2\Delta x} + O(\Delta x^{2})
```

```jldoctest
julia> fdcoefficient(n=1, m=2, d=:c)
Dict{Int64, Rational{Int64}} with 3 entries:
  0  => 0//1
  -1 => -1//2
  1  => 1//2
```

The coefficients of the central, ``n=1`` and ``m=1`` differences are ``c_{0} = -1, c_{1} = 1``.

```math
\frac{\mathrm{d}f(x)}{\mathrm{d} x} = \frac{f(x+\Delta x) - f(x)}{\Delta x} + O(\Delta x)
```

```jldoctest
julia> fdcoefficient(n=1, m=1, d=:f)
Dict{Int64, Rational{Int64}} with 2 entries:
  0 => -1//1
  1 => 1//1
```

The coefficients of the central, ``n=2`` and ``m=2`` differences are ``c_{-1} = 1, c_{0} = -2, c_{1} = 1``.
```math
\frac{\mathrm{d}^{2}f(x)}{\mathrm{d} x^{2}} = \frac{f(x+\Delta x) - 2f(x) + f(x-\Delta x)}{\Delta x^{2}} + O(\Delta x^{2})
```

```jldoctest
julia> fdcoefficient(n=2, m=2, d=:c)
Dict{Int64, Rational{Int64}} with 3 entries:
  0  => -2//1
  -1 => 1//1
  1  => 1//1
```
"""
function fdcoefficient(; n::Int=1, m::Int=2, d=:c)
  # `:central`  central,  `dⁿf/dxⁿ = [f(x+lh) + ... + f(x-lh)] / hⁿ + O(hᵐ), l = Int(m/2) + Int(ceil(n/2)) - 1`
  # `:forward`  forward,  `dⁿf/dxⁿ = [f(x)    + ... + f(x+mh)] / hⁿ + O(hᵐ)`
  # `:backward` backward, `dⁿf/dxⁿ = [f(x-mh) + ... + f(x)   ] / hⁿ + O(hᵐ)`
  n ≥ 1 || throw(ArgumentError("n = $n must satisfy n ≥ 1."))
  m ≥ 1 || throw(ArgumentError("m = $m must satisfy m ≥ 1."))
  if d == :c
      iseven(m) || throw(ArgumentError("m = $m must be even number for central finite difference."))
  end
  I = NaN
  I = d == :c ? (-(Int(m/2)+Int(ceil(n/2))-1):(Int(m/2)+Int(ceil(n/2))-1)) : I
  I = d == :f ? (0:n+m-1) : I
  I = d == :b ? (-n-m+1:0) : I
  I₀ = 0//1
  ℓ = 0:length(I)-1
  n in ℓ || throw(ArgumentError("n $n ∉ $ℓ"))
  A = @. (I' - I₀)^ℓ / factorial(ℓ)
  C = A \ (ℓ .== n)
  return Dict(I[j] => C[j] for j in keys(I))
end

@doc raw"""
`fdvalue(f, a; n::Int=1, m::Int=2, d=:c, h=0.1)`

This function calculates the differential coefficient $f^{(n)}(a)$, a value of the derivative function $f^{(n)}=\frac{\mathrm{d}^n f}{\mathrm{d}x^n}$ at the point $a$.

```math
\frac{\mathrm{d}^n f}{\mathrm{d}x^n} (a) = \frac{1}{h^n} \sum_{i} c_i f(a+ih) + O(\Delta x^m).
```

## Examples

```jldoctest
julia> fdvalue(x -> x^2, 1.0)
2.0000000000000004

julia> (x -> 2*x)(1.0)
2.0

julia> fdvalue(sin, 0.0)
0.9983341664682815

julia> fdvalue(sin, 0.0, m=4)
0.9999966706326067

julia> fdvalue(sin, 0.0, m=6)
0.9999999928710186

julia> cos(0.0)
1.0
```
"""
function fdvalue(f, a; n::Int=1, m::Int=2, d=:c, h=0.1)
  C = fdcoefficient(n=n, m=m, d=d)
  sum(C[i]*f(a+i*h) for i in keys(C)) / h^n
end

@doc raw"""
`fdmatrix(N::Int; n::Int=1, m::Int=2, d=:c, h=0.1)`

This function returns a discrete approximation of a differential operator as a [sparse matrix](https://github.com/JuliaSparse/SparseArrays.jl).

| Arguments | Description |
| --- | --- |
| `n` | order of derivative ``n`` |
| `m` | order of accuracy ``m`` |
| `d` | direction, `:c` central, `:f` forward, `:b` backward |
| `h` | grid spacing ``\Delta x`` |

## Examples

The central, ``n=1`` and ``m=2`` discrete approximation of the differential operator is
```math
\frac{\mathrm{d}}{\mathrm{d} x}
\simeq
\frac{1}{2\Delta x}
\left(\begin{array}{ccccccc}
   0 &  1 & 0 & \ldots & 0 & 0 & 0 \\
  -1 &  0 & 1 & \ldots & 0 & 0 & 0 \\
   0 & -1 & 0 & \ldots & 0 & 0 & 0 \\
  \vdots & \vdots & \vdots & \ddots & \vdots & \vdots & \vdots \\
  0 & 0 & 0 & \ldots &  0 &  1 & 0 \\
  0 & 0 & 0 & \ldots & -1 &  0 & 1 \\
  0 & 0 & 0 & \ldots &  0 & -1 & 0
\end{array}\right).
```

```jldoctest
julia> fdmatrix(5, n=1, m=2, d=:c, h=1//1)
5×5 SparseArrays.SparseMatrixCSC{Rational{Int64}, Int64} with 8 stored entries:
   ⋅     1//2    ⋅      ⋅     ⋅  
 -1//2    ⋅     1//2    ⋅     ⋅  
   ⋅    -1//2    ⋅     1//2   ⋅  
   ⋅      ⋅    -1//2    ⋅    1//2
   ⋅      ⋅      ⋅    -1//2   ⋅  
```

The central, ``n=1`` and ``m=1`` discrete approximation of the differential operator is
```math
\frac{\mathrm{d}}{\mathrm{d} x}
\simeq
\frac{1}{\Delta x}
\left(\begin{array}{ccccccc}
  -1 &  1 &  0 & \ldots & 0 & 0 & 0 \\
   0 & -1 &  1 & \ldots & 0 & 0 & 0 \\
   0 &  0 & -1 & \ldots & 0 & 0 & 0 \\
  \vdots & \vdots & \vdots & \ddots & \vdots & \vdots & \vdots \\
  0 & 0 & 0 & \ldots & -1 &  1 &  0 \\
  0 & 0 & 0 & \ldots &  0 & -1 &  1 \\
  0 & 0 & 0 & \ldots &  0 &  0 & -1
\end{array}\right).
```

```jldoctest
julia> fdmatrix(5, n=1, m=1, d=:f, h=1//1)
5×5 SparseArrays.SparseMatrixCSC{Rational{Int64}, Int64} with 9 stored entries:
 -1//1   1//1    ⋅      ⋅      ⋅  
   ⋅    -1//1   1//1    ⋅      ⋅  
   ⋅      ⋅    -1//1   1//1    ⋅  
   ⋅      ⋅      ⋅    -1//1   1//1
   ⋅      ⋅      ⋅      ⋅    -1//1
```

The central, ``n=2`` and ``m=2`` discrete approximation of the differential operator is
```math
\frac{\mathrm{d}^2}{\mathrm{d} x^2}
\simeq
\frac{1}{\Delta x^2}
\left(\begin{array}{ccccccc}
  -2 &  1 &  0 & \ldots & 0 & 0 & 0 \\
   1 & -2 &  1 & \ldots & 0 & 0 & 0 \\
   0 &  1 & -2 & \ldots & 0 & 0 & 0 \\
  \vdots & \vdots & \vdots & \ddots & \vdots & \vdots & \vdots \\
  0 & 0 & 0 & \ldots & -2 &  1 &  0 \\
  0 & 0 & 0 & \ldots &  1 & -2 &  1 \\
  0 & 0 & 0 & \ldots &  0 &  1 & -2
\end{array}\right).
```

```jldoctest
julia> fdmatrix(5, n=2, m=2, d=:c, h=1//1)
5×5 SparseArrays.SparseMatrixCSC{Rational{Int64}, Int64} with 13 stored entries:
 -2//1   1//1    ⋅      ⋅      ⋅  
  1//1  -2//1   1//1    ⋅      ⋅  
   ⋅     1//1  -2//1   1//1    ⋅  
   ⋅      ⋅     1//1  -2//1   1//1
   ⋅      ⋅      ⋅     1//1  -2//1
```
"""
function fdmatrix(N::Int; n::Int=1, m::Int=2, d=:c, h=0.1)
  C = fdcoefficient(n=n, m=m, d=d)
  return h^(-n) * spdiagm(Dict(i => fill(C[i],N-abs(i)) for i in keys(C))...)
end

end
