```@meta
CurrentModule = FiniteDifferenceMatrices
```

# Examples

```@example
using FiniteDifferenceMatrices
using Printf
for m in 2:2:12
    @printf("m = %2d    %.16f\n", m, fdvalue(sin, 0.0, n=1, m=m, d=:c, h=0.1))
end
@printf("cos(0.0)  %.16f", cos(0.0))
```

```@example
Δx = 0.2
X = -4.0:Δx:4.0
Y = sin.(X)
Z = cos.(X)

using FiniteDifferenceMatrices
using CairoMakie
f = Figure(size=(420,300), fontsize=11.5)
ax = Axis(f[1,1], xlabel=L"x", ylabel=L"\sin'(x)", limits=(-4,4,-1.1,1.1), ylabelsize=16.5, xlabelsize=16.5)
lines!(ax, X, Z, label="cos(x)")
for m in 2:2:8
  D = fdmatrix(length(X), n=1, m=m, d=:c, h=Δx)
  W = D*Y
  scatter!(ax, X, Float64.(W), label="m = $m")
end
axislegend(ax, position=:rt, rowgap=0, padding=(5,5,2,2), framevisible=false)
f
```