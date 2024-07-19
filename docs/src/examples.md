```@meta
CurrentModule = FiniteDifferenceMatrices
```

# Examples

Here are some practical examples. Please refer to the [API reference](./API.md) for how to use each function.

## Order of Accuracy

Here is an example of ``\sin'(0)=\cos(0)=1``. The value asymptotically approaches the exact value as the order of the accuracy ``m`` increases.

```@example
using FiniteDifferenceMatrices
using Printf

for m in 2:2:12
  @printf("m = %2d    %.18f\n", m, fdvalue(sin, 0.0, n=1, m=m, d=:c, h=big"0.05"))
end
```

## Derivative

We approximate a function `f` to a vector `[f(0.0), f(0.1), f(0.2), ...]`. Its derivative is calculated as the product of a finite difference matrix and the vector. The values ​​at the ends of the domain have large errors.

```@example
using FiniteDifferenceMatrices
using CairoMakie
CairoMakie.activate!(type = "svg")

# domain X, function Y, differential operator D
Δx = 0.2
X = -3.7:Δx:3.7
Y = sin.(X)
D = fdmatrix(length(X), n=1, m=2, d=:c, h=Δx)

# derivative
Z1 = cos.(X) # analytical derivative
Z2 = D*Y     # numerical derivative

# plot
f = Figure(size=(420,300), fontsize=11.5)
ax = Axis(f[1,1], xlabel=L"x", ylabel=L"\sin'(x)", ylabelsize=16.5, xlabelsize=16.5)
lines!(ax, X, Z1, label="analytical")
scatter!(ax, X, Z2, label="numerical")
axislegend(ax, position=:cb, rowgap=0, padding=(5,5,2,2), framevisible=false)
f
```

## Discrete Approximation of Hamiltonian

The non-dimensionalized Hamiltonian of the [harmonic oscillator](https://ohno.github.io/Antique.jl/stable/HarmonicOscillator/), its ground state wave function and the energy are written as

```math
\hat{H} = - \frac{1}{2} \frac{\mathrm{d}^2}{\mathrm{d}x^2} + \frac{1}{2}x^2,
\\
\psi_0(x) = \pi^{-1/4} \exp \left( -\frac{1}{2}x^2 \right),
\\
E_0 = \frac{\langle \psi_0 | \hat{H} | \psi_0 \rangle}{\langle \psi_0 | \psi_0 \rangle} = \frac{1}{2}.
```

The energy is calculated as `(ψ' * H * ψ) / (ψ' * ψ)` when we approximate the Hamiltonian to a sparse matrix `H` and the wave function to a vector `ψ`.

```@example
using FiniteDifferenceMatrices
using SparseArrays

Δx = 0.1
X = -10:Δx:10
H = -1/2 * fdmatrix(length(X), n=2, m=4, d=:c, h=Δx) + spdiagm([1/2*x^2 for x in X])
ψ = [π^(-1//4)*exp(-1/2*x^2) for x in X]
E = (ψ' * H * ψ) / (ψ' * ψ) # energy
# S = sqrt(Δx * ψ' * ψ) # norm
```

## Imaginary Time Evolution

The imaginary time Schrödinger equation and its formal solution are written as

```math
-\frac{\partial \varPsi(x,\tau)}{\partial \tau}
= \hat{H} \varPsi(x,\tau),
\\
\varPsi(x,\tau)
= \exp \left[- \hat{H} \tau \right] \varPsi(x,0).
```

It is projected to the ground state (g.s.) in the long imaginary-time limit ``\tau\rightarrow\infty``. It is able to calculate the imaginary time evolution by a direct treatment because Julia has built-in matrix exponentials. The efficient matrix exponentials for sparse matrices are supported in [FastExpm.jl](https://github.com/fmentink/FastExpm.jl).

```@example
using FiniteDifferenceMatrices
using SparseArrays
using CairoMakie
CairoMakie.activate!(type = "svg")

# domain X, Hamiltonian H, initial state ψ₀
Δx = 0.1
X = -10:Δx:10
H = -1/2 * fdmatrix(length(X), n=2, m=4, d=:c, h=Δx) + spdiagm([1/2*x^2 for x in X])
Ψ₀ = [-2.5 ≤ x ≤ 2.5 ? 0.2 : 0.0 for x in X]

# plot
f = Figure(size=(420,300), fontsize=11.5)
ax = Axis(f[1,1], xlabel="x", ylabel="Ψ(x,τ)", limits=(-5,5,0.0,0.8), titlesize=16.5, ylabelsize=16.5, xlabelsize=16.5)
for τ in [0.0, 0.1, 1.0, 10.0]
    Ψ = exp(-Matrix{Float64}(H)*τ) * Ψ₀
    lines!(ax, X, Vector{Float64}(real(Ψ / sqrt(Δx * Ψ' * Ψ))), label="τ = $τ")
end
lines!(ax, X, x -> π^(-1//4)*exp(-1/2*x^2), label="g.s.", color=:black, linestyle=:dash, linewidth=2)
axislegend(ax, position=:rt, rowgap=0, padding=(0,0,0,0), framevisible=false)
f
```