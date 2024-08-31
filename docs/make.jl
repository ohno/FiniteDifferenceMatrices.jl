using FiniteDifferenceMatrices
using Documenter

import Pkg
# Pkg.activate(".")
# Pkg.add("Printf")
# Pkg.add("Markdown")
# Pkg.add("SparseArrays")
# Pkg.add(name="CairoMakie", version="0.12.4")
Pkg.instantiate()
# using Printf
# using Markdown
# using SparseArrays
# using CairoMakie

DocMeta.setdocmeta!(FiniteDifferenceMatrices, :DocTestSetup, :(using FiniteDifferenceMatrices); recursive=true)

makedocs(;
    modules=[FiniteDifferenceMatrices],
    authors="Shuhei Ohno",
    sitename="FiniteDifferenceMatrices.jl",
    format=Documenter.HTML(;
        canonical="https://ohno.github.io/FiniteDifferenceMatrices.jl",
        edit_link="main",
        assets=String[
            "./assets/fig/logo.ico",
            "./assets/css/table.css",
        ],
    ),
    pages=[
        "Home" => "index.md",
        "Tables" => "tables.md",
        "Examples" => "examples.md",
        "API reference" => "API.md",
    ],
)

deploydocs(;
    repo="github.com/ohno/FiniteDifferenceMatrices.jl",
    devbranch="main",
)
