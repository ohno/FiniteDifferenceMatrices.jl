```@meta
CurrentModule = FiniteDifferenceMatrices
```

# Tables

The three tables of [finite difference coefficients](https://en.wikipedia.org/wiki/Finite_difference_coefficient) are generated by [`fdcoefficient`](@ref FiniteDifferenceMatrices.fdcoefficient).

```@eval
using Printf
using Markdown
using FiniteDifferenceMatrices
text = ""
for d in [:c, :f, :b]
  if d == :c
    global text *= "\n## Central finite difference\n\n"
    C₀ = fdcoefficient(n=4, m=8, d=d)
  elseif d == :f
    C₀ = fdcoefficient(n=4, m=4, d=d)
    global text *= "\n## Forward finite difference\n\n"
  elseif d == :b
    C₀ = fdcoefficient(n=4, m=4, d=d)
    global text *= "\n## Backward finite difference\n\n"
  end
  global text *= string("|  n  |  m  | ", join([@sprintf("%+2d           ",i) for i in sort(collect(keys(C₀)))], " | "), " |\n")
  global text *= string("| --- | --- | ", join(["-------------" for i in sort(collect(keys(C₀)))], " | "), " |\n")
  for n in 1:4
  for m in (d == :c ? (2:2:8) : 1:4)
    global text *= "|  $n  |  $m  | "
    C = fdcoefficient(n=n, m=m, d=d)
    global text *= string(join([haskey(C,i) ? (C[i].den == 1 ? @sprintf("%6d       ", C[i].num) : @sprintf("%6d/%-6d", C[i].num, C[i].den)) : "             " for i in sort(collect(keys(C₀)))], " | "))
    global text *= " |\n"
  end
  end
end
println(text)
Markdown.parse(text)
```