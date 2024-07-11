using FiniteDifferenceMatrices
using Documenter

DocMeta.setdocmeta!(FiniteDifferenceMatrices, :DocTestSetup, :(using FiniteDifferenceMatrices); recursive=true)

makedocs(;
    modules=[FiniteDifferenceMatrices],
    authors="Shuhei Ohno",
    sitename="FiniteDifferenceMatrices.jl",
    format=Documenter.HTML(;
        canonical="https://ohno.github.io/FiniteDifferenceMatrices.jl",
        edit_link="main",
        assets=String[],
    ),
    pages=[
        "Home" => "index.md",
        "API reference" => "API.md",
    ],
)

deploydocs(;
    repo="github.com/ohno/FiniteDifferenceMatrices.jl",
    devbranch="main",
)
