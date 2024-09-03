var documenterSearchIndex = {"docs":
[{"location":"examples/","page":"Examples","title":"Examples","text":"CurrentModule = FiniteDifferenceMatrices","category":"page"},{"location":"examples/#Examples","page":"Examples","title":"Examples","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"Here are some practical examples. Please refer to the API reference for how to use each function.","category":"page"},{"location":"examples/#Order-of-Accuracy","page":"Examples","title":"Order of Accuracy","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"Here is an example of sin(0)=cos(0)=1. The value asymptotically approaches the exact value as the order of the accuracy m increases.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FiniteDifferenceMatrices\nusing Printf\n\nfor m in 2:2:12\n  @printf(\"m = %2d    %.18f\\n\", m, fdvalue(sin, 0.0, n=1, m=m, d=:c, h=big\"0.05\"))\nend","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Here is a comparison of exp(0.0) and fdvalue(exp, 0.0, n=n, m=m, d=:f). The error is proportional to h^m (the solid line). But Float64 values do not follow the scaling law due to the rounding errors in small h. This problem is avoided by using BigFloat.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FiniteDifferenceMatrices\nusing CairoMakie\nCairoMakie.activate!(type = \"svg\")\n\nfor t in [Float64, BigFloat]\n  f = Figure(size=(420*2,420), fontsize=11.5)\n  for n in 1:2\n    ax = Axis(\n      f[1,n],\n      title = \"$t, n=$n\",\n      xlabel = L\"h\",\n      ylabel = L\"|f^{(n)} - \\mathrm{fdvalue}|\",\n      titlesize = 16.5,\n      ylabelsize = 16.5,\n      xlabelsize = 16.5,\n      xscale = log10,\n      yscale = log10,\n      limits = (8e-4,1.2e-1,1e-30,1)\n    )\n    for m in 1:9\n      X = [0.1, 0.05, 0.02, 0.01, 0.005, 0.002, 0.001]\n      Y = [abs(exp(0.0) - fdvalue(exp, 0.0, n=n, m=m, d=:f, h=convert(t,h))) for h in X]\n      a = Y[1] / X[1]^m\n      lines!(ax, [1e-4,1e0], x->a*x^m, color=m, colorrange=(1,9), colormap=:tab10, linestyle=:solid, linewidth=1)\n      scatter!(ax, X, Y, label=\"m = $m\", color=m, colorrange=(1,9), colormap=:tab10)\n    end\n    axislegend(ax, position=:rb, nbanks=3, colgap=10, rowgap=0, padding=(0,0,0,0), framevisible=false)\n  end\n  display(f)\n  save(\"$t.svg\", f) # hide\nend","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: ) (Image: )","category":"page"},{"location":"examples/#Derivative","page":"Examples","title":"Derivative","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"We approximate a function f to a vector [f(0.0), f(0.1), f(0.2), ...]. Its derivative is calculated as the product of a finite difference matrix and the vector. The values ​​at the ends of the domain have large errors.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FiniteDifferenceMatrices\nusing CairoMakie\nCairoMakie.activate!(type = \"svg\")\n\n# domain X, function Y, differential operator D\nΔx = 0.2\nX = -3.7:Δx:3.7\nY = sin.(X)\nD = fdmatrix(length(X), n=1, m=2, d=:c, h=Δx)\n\n# derivative\nZ1 = cos.(X) # analytical derivative\nZ2 = D*Y     # numerical derivative\n\n# plot\nf = Figure(size=(420,300), fontsize=11.5)\nax = Axis(f[1,1], xlabel=L\"x\", ylabel=L\"\\sin'(x)\", ylabelsize=16.5, xlabelsize=16.5)\nlines!(ax, X, Z1, label=\"analytical\")\nscatter!(ax, X, Z2, label=\"numerical\")\naxislegend(ax, position=:cb, rowgap=0, padding=(5,5,2,2), framevisible=false)\nf","category":"page"},{"location":"examples/#Discrete-Approximation-of-Hamiltonian","page":"Examples","title":"Discrete Approximation of Hamiltonian","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"Discrete approximations (the central finite difference of the second-order accuracy) of the Hamiltonian hatH = - frachbar^22m fracmathrmd^2mathrmdx^2 + V(x) , the wave function psi(x) and the energy E are written as","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"pmbH\n= - frachbar^22m cdot frac1h^2\n  left(beginarrayccccccc\n    -2  1  0  ldots \n    1  -2  1  ldots \n    0  1  -2  ldots \n    vdots  vdots  vdots  ddots \n  endarrayright)\n  +\n  left(beginarrayccccccc\n    V(x_1)  0  0  ldots \n    0  V(x_2)  0  ldots \n    0  0  V(x_3)  ldots \n    vdots  vdots  vdots  ddots \n  endarrayright)\n\npmbpsi\n=\nleft(beginarrayc\n  psi(x_1) \n  psi(x_2) \n  psi(x_3) \n  vdots \nendarrayright)\n\nE = fraclanglepsihatHpsiranglelanglepsipsirangle\nsimeq fracpmbpsi^ast pmbH pmbpsipmbpsi^ast pmbpsi","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"Here, we show the non-dimensionalized Hamiltonian of the harmonic oscillator, its ground state wave function and the energy:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"hatH = - frac12 fracmathrmd^2mathrmdx^2 + frac12x^2\n\npsi_0(x) = pi^-14 exp left( -frac12x^2 right)\n\nE_0 = fraclangle psi_0  hatH  psi_0 ranglelangle psi_0  psi_0 rangle = frac12","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FiniteDifferenceMatrices\nusing SparseArrays\n\nΔx = 0.1\nX = -10:Δx:10\nH = -1/2 * fdmatrix(length(X), n=2, m=2, d=:c, h=Δx) + spdiagm([1/2*x^2 for x in X])\nψ = [π^(-1//4)*exp(-1/2*x^2) for x in X]\n# S = sqrt(Δx * ψ' * ψ) # norm\nE = (ψ' * H * ψ) / (ψ' * ψ) # energy\n\n@show E","category":"page"},{"location":"examples/#Variational-Method","page":"Examples","title":"Variational Method","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"This is an example of a variational calculation for the harmonic oscillator. We optimize the parameter alpha to minimize the energy E:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"fracpartial Epartial alpha = 0","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The energy E depends on the parameter alpha because the trial wave function psi_mathrmtrial depends on the parameter alpha:","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"psi_mathrmtrial(x) = left( frac2alphapi right)^frac14 exp left( - alpha x^2 right)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FiniteDifferenceMatrices\nusing SparseArrays\nusing Printf\n\nΔx = 0.1\nX = -10:Δx:10\nH = -1/2 * fdmatrix(length(X), n=2, m=8, d=:c, h=Δx) + spdiagm([1/2*x^2 for x in X])\n\nprintln(\"  α              E\")\nprintln(\"------------------\")\nfor α in 0.1:0.1:1.0\n  ψ = [((2*α)/π)^(1//4)*exp(-α*x^2) for x in X]\n  E = (ψ' * H * ψ) / (ψ' * ψ)\n  @printf(\"%.1f    %.9f\\n\", α, E)\nend\nprintln(\"------------------\")\nprintln(\"minimum:\")\nprintln(\"  α = 0.5\")\nprintln(\"  E = 0.5\")","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"In this case, the trial wave function of alpha=12 is equal to the exact solution. Note that the \"best\" trial wave function (that gives the lowest energy, according to the variational principle) may not yield a better value for other properties (such as the norm or expected values). Please see J. F. Pérez-Torres, J. Chem. Educ. 2019, 96, 4, 704–707 (2019).","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using CairoMakie\nCairoMakie.activate!(type = \"svg\")\n\nf = Figure(size=(420,300), fontsize=11.5)\nax = Axis(f[1,1], xlabel=L\"x\", ylabel=L\"\\psi(x)\", limits=(-5,5,0.0,0.8), titlesize=16.5, ylabelsize=16.5, xlabelsize=16.5)\nfor α in 0.3:0.1:0.6\n  ψ = [((2*α)/π)^(1//4)*exp(-α*x^2) for x in X]\n  lines!(ax, X, ψ, label=\"α = $α\")\nend\nlines!(ax, X, x -> π^(-1//4)*exp(-1/2*x^2), label=\"exact\", color=:black, linestyle=:dash, linewidth=2)\naxislegend(ax, position=:rt, rowgap=0, padding=(0,0,0,0), framevisible=false)\nf","category":"page"},{"location":"examples/#Eigenvalue-Problem","page":"Examples","title":"Eigenvalue Problem","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"The eigenvalue problem of the Hamiltonian matrix pmbH gives approximate energies and approximate wave functions. Please refer to the Antique.jl for the closed forms of the analytical solutions.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FiniteDifferenceMatrices\nusing SparseArrays\nusing LinearAlgebra\n# using ArnoldiMethod\nusing Printf\nimport Antique\nHO = Antique.HarmonicOscillator(k=1.0, m=1.0, ℏ=1.0)\n\nΔx = 0.1\nX = -5:Δx:5\nI = keys(X)\nT = -HO.ℏ^2/2/HO.m * fdmatrix(length(X), n=2, m=8, d=:c, h=Δx)\nV = Diagonal([Antique.V(HO,x) for x in X])\nH = T + V\n\n# decomp, history = partialschur(H, nev=10, tol=1e-9, which=SR())\n# E = real.(decomp.eigenvalues)\nE, ψ = eigen(Matrix{Float64}(H))\n\nprintln(\" n         numerical        analytical\")\nprintln(\"--    --------------    --------------\")\nfor n in 0:9\n  @printf(\"%2d    %.12f    %.12f\\n\", n, E[n+1], Antique.E(HO, n=n))\nend","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The vector ψ[:,1] corresponds to the eigenfunction for the ground state (n=0) and the vector ψ[:,n+1] corresponds to the eigenfunctions of the n-th excited state.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using CairoMakie\nCairoMakie.activate!(type = \"svg\")\n\nf = Figure(size=(840,600), fontsize=11.5)\nfor i in 1:4\n    n = i - 1\n    ax = Axis(\n      f[Int(ceil(i/2)),rem(i-1,2)+1],\n      xlabel = L\"x\",\n      ylabel = L\"|\\psi(x)|^2\",\n      titlesize = 16.5,\n      ylabelsize = 16.5,\n      xlabelsize = 16.5,\n    )\n  lines!(ax, -5..5, x -> Antique.ψ(HO,x,n=n)^2, label=\"analytical\", color=:black, linestyle=:solid, linewidth=1)\n  scatter!(ax, X, (ψ[:,i] / sqrt(Δx)) .^ 2, label=\"numerical\", markersize=6)\n  axislegend(ax, \"n = $n\", position=:rt, rowgap=0, framevisible=false, titlesize=15.0)\nend\nf\nsave(\"eigen.svg\", f) # hide\nnothing # hide","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: )","category":"page"},{"location":"examples/#Imaginary-Time-Evolution","page":"Examples","title":"Imaginary Time Evolution","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"The imaginary time Schrödinger equation and its formal solution are written as","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"-fracpartial varPsi(xtau)partial tau\n= hatH varPsi(xtau)\n\nvarPsi(xtau)\n= exp left- hatH tau right varPsi(x0)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"It is projected to the ground state (g.s.) in the long imaginary-time limit taurightarrowinfty. It is able to calculate the imaginary time evolution by a direct treatment because Julia has built-in matrix exponentials. The efficient matrix exponentials for sparse matrices are supported in FastExpm.jl.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FiniteDifferenceMatrices\nusing SparseArrays\nusing CairoMakie\nCairoMakie.activate!(type = \"svg\")\n\n# domain X, Hamiltonian H, initial state ψ₀\nΔx = 0.1\nX = -10:Δx:10\nH = -1/2 * fdmatrix(length(X), n=2, m=4, d=:c, h=Δx) + spdiagm([1/2*x^2 for x in X])\nΨ₀ = [-2.5 ≤ x ≤ 2.5 ? 0.2 : 0.0 for x in X]\n\n# plot\nf = Figure(size=(420,300), fontsize=11.5)\nax = Axis(f[1,1], xlabel=\"x\", ylabel=\"Ψ(x,τ)\", limits=(-5,5,0.0,0.8), titlesize=16.5, ylabelsize=16.5, xlabelsize=16.5)\nfor τ in [0.0, 0.1, 1.0, 10.0]\n  Ψ = exp(-Matrix{Float64}(H)*τ) * Ψ₀\n  lines!(ax, X, Vector{Float64}(real(Ψ / sqrt(Δx * Ψ' * Ψ))), label=\"τ = $τ\")\nend\nlines!(ax, X, x -> π^(-1//4)*exp(-1/2*x^2), label=\"g.s.\", color=:black, linestyle=:dash, linewidth=2)\naxislegend(ax, position=:rt, rowgap=0, padding=(0,0,0,0), framevisible=false)\nf","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = FiniteDifferenceMatrices","category":"page"},{"location":"#FiniteDifferenceMatrices.jl","page":"Home","title":"FiniteDifferenceMatrices.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Build Status) (Image: Stable) (Image: Dev)","category":"page"},{"location":"","page":"Home","title":"Home","text":"A Julia package for discrete approximations of differential operators","category":"page"},{"location":"#Install","page":"Home","title":"Install","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Run the following code on the to install this package.","category":"page"},{"location":"","page":"Home","title":"Home","text":"import Pkg; Pkg.add(url=\"https://github.com/ohno/FiniteDifferenceMatrices.jl.git\")","category":"page"},{"location":"#Usage","page":"Home","title":"Usage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Run the following code before each use.","category":"page"},{"location":"","page":"Home","title":"Home","text":"using FiniteDifferenceMatrices","category":"page"},{"location":"","page":"Home","title":"Home","text":"A central finite difference of the second-order derivative is","category":"page"},{"location":"","page":"Home","title":"Home","text":"fracmathrmd^2fmathrmd x^2(x) = fracf(x+Delta x) - 2f(x) + f(x-Delta x)Delta x^2 + O(Delta x^2)","category":"page"},{"location":"","page":"Home","title":"Home","text":"fdcoefficient(n=2, m=2, d=:c, t=Int)","category":"page"},{"location":"","page":"Home","title":"Home","text":"A discrete approximation of the second-order differential operator is","category":"page"},{"location":"","page":"Home","title":"Home","text":"fracmathrmd^2mathrmd x^2\nsimeq\nfrac1Delta x^2\nleft(beginarrayccccccc\n  -2   1   0  ldots  0  0  0 \n   1  -2   1  ldots  0  0  0 \n   0   1  -2  ldots  0  0  0 \n  vdots  vdots  vdots  ddots  vdots  vdots  vdots \n  0  0  0  ldots  -2   1   0 \n  0  0  0  ldots   1  -2   1 \n  0  0  0  ldots   0   1  -2\nendarrayright)","category":"page"},{"location":"","page":"Home","title":"Home","text":"fdmatrix(5, n=2, m=2, d=:c, h=1//1)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Please see Tables, Examples and API reference for more information.","category":"page"},{"location":"#Developer's-Guide","page":"Home","title":"Developer's Guide","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"There are several tools for developers.","category":"page"},{"location":"","page":"Home","title":"Home","text":"git clone https://github.com/ohno/FiniteDifferenceMatrices.jl.git\ncd FiniteDifferenceMatrices.jl\njulia\njulia> include(\"dev/revice.jl\")\njulia> include(\"dev/test.jl\")\njulia> include(\"dev/docs.jl\")","category":"page"},{"location":"#API-reference","page":"Home","title":"API reference","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"tables/","page":"Tables","title":"Tables","text":"CurrentModule = FiniteDifferenceMatrices","category":"page"},{"location":"tables/#Tables","page":"Tables","title":"Tables","text":"","category":"section"},{"location":"tables/","page":"Tables","title":"Tables","text":"The three tables of finite difference coefficients are generated by fdcoefficient.","category":"page"},{"location":"tables/","page":"Tables","title":"Tables","text":"using Printf\nusing Markdown\nusing FiniteDifferenceMatrices\ntext = \"\"\nfor d in [:c, :f, :b]\n  if d == :c\n    global text *= \"\\n## Central finite difference\\n\\n\"\n    C₀ = fdcoefficient(n=4, m=8, d=d)\n  elseif d == :f\n    C₀ = fdcoefficient(n=4, m=4, d=d)\n    global text *= \"\\n## Forward finite difference\\n\\n\"\n  elseif d == :b\n    C₀ = fdcoefficient(n=4, m=4, d=d)\n    global text *= \"\\n## Backward finite difference\\n\\n\"\n  end\n  global text *= string(\"|  n  |  m  | \", join([@sprintf(\"%+2d           \",i) for i in sort(collect(keys(C₀)))], \" | \"), \" |\\n\")\n  global text *= string(\"| --- | --- | \", join([\"-------------\" for i in sort(collect(keys(C₀)))], \" | \"), \" |\\n\")\n  for n in 1:4\n  for m in (d == :c ? (2:2:8) : 1:4)\n    global text *= \"|  $n  |  $m  | \"\n    C = fdcoefficient(n=n, m=m, d=d)\n    global text *= string(join([haskey(C,i) ? (C[i].den == 1 ? @sprintf(\"%6d       \", C[i].num) : @sprintf(\"%6d/%-6d\", C[i].num, C[i].den)) : \"             \" for i in sort(collect(keys(C₀)))], \" | \"))\n    global text *= \" |\\n\"\n  end\n  end\nend\nprintln(text)\nMarkdown.parse(text)","category":"page"},{"location":"API/","page":"API reference","title":"API reference","text":"CurrentModule = FiniteDifferenceMatrices","category":"page"},{"location":"API/#API-reference","page":"API reference","title":"API reference","text":"","category":"section"},{"location":"API/","page":"API reference","title":"API reference","text":"","category":"page"},{"location":"API/","page":"API reference","title":"API reference","text":"Modules = [FiniteDifferenceMatrices]","category":"page"},{"location":"API/#FiniteDifferenceMatrices.Fornberg1988","page":"API reference","title":"FiniteDifferenceMatrices.Fornberg1988","text":"Fornberg1988[d,n,m]\n\nThis is a foolish implementation of the tables of B. Fornberg, Math. Comp. 51 699-706 (1988) and Wikipedia by hand. It was coded to test the fdcoefficient().\n\nExamples\n\njulia> FiniteDifferenceMatrices.Fornberg1988[:c,1,2]\n1×3 Matrix{Rational{Int64}}:\n -1//2  0//1  1//2\n\njulia> FiniteDifferenceMatrices.Fornberg1988[:c,2,2]\n1×3 Matrix{Rational{Int64}}:\n 1//1  -2//1  1//1\n\n\n\n\n\n","category":"constant"},{"location":"API/#FiniteDifferenceMatrices.fdcoefficient-Tuple{}","page":"API reference","title":"FiniteDifferenceMatrices.fdcoefficient","text":"fdcoefficient(; n::Int=1, m::Int=2, d=:c, t=Rational{Int})\n\nThis function returns a Dict of the finite difference coefficients c_i of\n\nfracmathrmd^n fmathrmdx^n(x) = frac1Delta x^n sum_i c_i f(x+iDelta x) + O(Delta x^m)\n\nThis implementation is based on a post on discourse by @stevengj and this function is tested to return results equivalent to B. Fornberg, Math. Comp. 51 699-706 (1988).\n\nArguments Description\nn order of derivative n\nm order of accuracy m\nd direction, :c central, :f forward, :b backward\nt type of coefficients, e.g.: Rational{Int}, Rational{BigInt}, Rational{Float64}\n\nExamples\n\nThe coefficients of the central, n=1 and m=2 differences are c_-1 = -12 c_0 = 0 c_1 = 12.\n\nfracmathrmdfmathrmd x(x) = fracf(x+Delta x) - f(x-Delta x)2Delta x + O(Delta x^2)\n\njulia> fdcoefficient(n=1, m=2, d=:c)\nDict{Int64, Rational{Int64}} with 3 entries:\n  0  => 0//1\n  -1 => -1//2\n  1  => 1//2\n\nThe coefficients of the central, n=1 and m=1 differences are c_0 = -1 c_1 = 1.\n\nfracmathrmdfmathrmd x(x) = fracf(x+Delta x) - f(x)Delta x + O(Delta x)\n\njulia> fdcoefficient(n=1, m=1, d=:f)\nDict{Int64, Rational{Int64}} with 2 entries:\n  0 => -1//1\n  1 => 1//1\n\nThe coefficients of the central, n=2 and m=2 differences are c_-1 = 1 c_0 = -2 c_1 = 1.\n\nfracmathrmd^2fmathrmd x^2(x) = fracf(x+Delta x) - 2f(x) + f(x-Delta x)Delta x^2 + O(Delta x^2)\n\njulia> fdcoefficient(n=2, m=2, d=:c)\nDict{Int64, Rational{Int64}} with 3 entries:\n  0  => -2//1\n  -1 => 1//1\n  1  => 1//1\n\n\n\n\n\n","category":"method"},{"location":"API/#FiniteDifferenceMatrices.fdmatrix-Tuple{Int64}","page":"API reference","title":"FiniteDifferenceMatrices.fdmatrix","text":"fdmatrix(N::Int; n::Int=1, m::Int=2, d=:c, h=0.1, t=Rational{Int})\n\nThis function returns a discrete approximation of a differential operator as a SparseMatrixCSC. The numerical error is not ignored in high orders (3n, 4m) and a small grid spacing (h10^-3). Please use high precision arithmetic (h=big\"0.001\" and t=Rational{BigInt}) in that case.\n\nArguments Description\nn order of derivative n\nm order of accuracy m\nd direction, :c central, :f forward, :b backward\nh grid spacing Delta x\nt type of coefficients, e.g.: Rational{Int}, Rational{BigInt}, Float64\n\nExamples\n\nThe central, n=1 and m=2 discrete approximation of the differential operator is\n\nfracmathrmdmathrmd x\nsimeq\nfrac12Delta x\nleft(beginarrayccccccc\n   0   1  0  ldots  0  0  0 \n  -1   0  1  ldots  0  0  0 \n   0  -1  0  ldots  0  0  0 \n  vdots  vdots  vdots  ddots  vdots  vdots  vdots \n  0  0  0  ldots   0   1  0 \n  0  0  0  ldots  -1   0  1 \n  0  0  0  ldots   0  -1  0\nendarrayright)\n\njulia> fdmatrix(5, n=1, m=2, d=:c, h=1//1)\n5×5 SparseArrays.SparseMatrixCSC{Rational{Int64}, Int64} with 8 stored entries:\n   ⋅     1//2    ⋅      ⋅     ⋅  \n -1//2    ⋅     1//2    ⋅     ⋅  \n   ⋅    -1//2    ⋅     1//2   ⋅  \n   ⋅      ⋅    -1//2    ⋅    1//2\n   ⋅      ⋅      ⋅    -1//2   ⋅  \n\nThe central, n=1 and m=1 discrete approximation of the differential operator is\n\nfracmathrmdmathrmd x\nsimeq\nfrac1Delta x\nleft(beginarrayccccccc\n  -1   1   0  ldots  0  0  0 \n   0  -1   1  ldots  0  0  0 \n   0   0  -1  ldots  0  0  0 \n  vdots  vdots  vdots  ddots  vdots  vdots  vdots \n  0  0  0  ldots  -1   1   0 \n  0  0  0  ldots   0  -1   1 \n  0  0  0  ldots   0   0  -1\nendarrayright)\n\njulia> fdmatrix(5, n=1, m=1, d=:f, h=1//1)\n5×5 SparseArrays.SparseMatrixCSC{Rational{Int64}, Int64} with 9 stored entries:\n -1//1   1//1    ⋅      ⋅      ⋅  \n   ⋅    -1//1   1//1    ⋅      ⋅  \n   ⋅      ⋅    -1//1   1//1    ⋅  \n   ⋅      ⋅      ⋅    -1//1   1//1\n   ⋅      ⋅      ⋅      ⋅    -1//1\n\nThe central, n=2 and m=2 discrete approximation of the differential operator is\n\nfracmathrmd^2mathrmd x^2\nsimeq\nfrac1Delta x^2\nleft(beginarrayccccccc\n  -2   1   0  ldots  0  0  0 \n   1  -2   1  ldots  0  0  0 \n   0   1  -2  ldots  0  0  0 \n  vdots  vdots  vdots  ddots  vdots  vdots  vdots \n  0  0  0  ldots  -2   1   0 \n  0  0  0  ldots   1  -2   1 \n  0  0  0  ldots   0   1  -2\nendarrayright)\n\njulia> fdmatrix(5, n=2, m=2, d=:c, h=1//1)\n5×5 SparseArrays.SparseMatrixCSC{Rational{Int64}, Int64} with 13 stored entries:\n -2//1   1//1    ⋅      ⋅      ⋅  \n  1//1  -2//1   1//1    ⋅      ⋅  \n   ⋅     1//1  -2//1   1//1    ⋅  \n   ⋅      ⋅     1//1  -2//1   1//1\n   ⋅      ⋅      ⋅     1//1  -2//1\n\n\n\n\n\n","category":"method"},{"location":"API/#FiniteDifferenceMatrices.fdvalue-Tuple{Any, Any}","page":"API reference","title":"FiniteDifferenceMatrices.fdvalue","text":"fdvalue(f, a; n::Int=1, m::Int=2, d=:c, h=0.1, t=Rational{Int})\n\nThis function calculates the differential coefficient f^(n)(a), a value of the derivative function f^(n)=fracmathrmd^n fmathrmdx^n at the point a.\n\nfracmathrmd^n fmathrmdx^n (a) = frac1h^n sum_i c_i f(a+ih) + O(Delta x^m)\n\nThe numerical error is not ignored in high orders (3n, 4m) and a small grid spacing (h10^-3). Please use high precision arithmetic (h=big\"0.001\" and t=Rational{BigInt}) in that case.\n\nExamples\n\njulia> fdvalue(x -> x^2, 1.0)\n2.0000000000000004\n\njulia> (x -> 2*x)(1.0)\n2.0\n\njulia> fdvalue(sin, 0.0)\n0.9983341664682815\n\njulia> fdvalue(sin, 0.0, m=4)\n0.9999966706326067\n\njulia> fdvalue(sin, 0.0, m=6)\n0.9999999928710186\n\njulia> cos(0.0)\n1.0\n\n\n\n\n\n","category":"method"}]
}
