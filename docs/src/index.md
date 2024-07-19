```@meta
CurrentModule = FiniteDifferenceMatrices
```

# FiniteDifferenceMatrices.jl

[![Build Status](https://github.com/ohno/FiniteDifferenceMatrices.jl/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/ohno/FiniteDifferenceMatrices.jl/actions/workflows/CI.yml?query=branch%3Amain)
[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://ohno.github.io/FiniteDifferenceMatrices.jl/stable/)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://ohno.github.io/FiniteDifferenceMatrices.jl/dev/)

A Julia package for discrete approximations of differential operators

## Install

Run the following code on the to install this package.
```julia
import Pkg; Pkg.add(url="https://github.com/ohno/FiniteDifferenceMatrices.jl.git")
```

## Usage

Run the following code before each use.
```@example index
using FiniteDifferenceMatrices
```

A central finite difference of the second-order derivative is
```math
\frac{\mathrm{d}^{2}f}{\mathrm{d} x^{2}}(x) = \frac{f(x+\Delta x) - 2f(x) + f(x-\Delta x)}{\Delta x^{2}} + O(\Delta x^{2}).
```
```@repl index
fdcoefficient(n=2, m=2, d=:c, t=Int)
```

A discrete approximation of the second-order differential operator is
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
```@repl index
fdmatrix(5, n=2, m=2, d=:c, h=1//1)
```

Please see the [Examples](./examples.md) and [API reference](./API.md) for details.

## Developer's Guide

There are several tools for developers.

```sh
git clone https://github.com/ohno/FiniteDifferenceMatrices.jl.git
cd FiniteDifferenceMatrices.jl
julia
julia> include("dev/revice.jl")
julia> include("dev/test.jl")
julia> include("dev/docs.jl")
```

## API reference

```@index
```
