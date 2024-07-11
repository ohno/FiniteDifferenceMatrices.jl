using FiniteDifferenceMatrices
using Test

@testset "FiniteDifferenceMatrices.jl" begin

  for k in keys(FiniteDifferenceMatrices.Fornberg1988)
    d = k[1]
    n = k[2]
    m = k[3]
    I = NaN
    I = d == :c ? (-(Int(m/2)+Int(ceil(n/2))-1):(Int(m/2)+Int(ceil(n/2))-1)) : I
    I = d == :f ? (0:n+m-1) : I
    I = d == :b ? (-n-m+1:0) : I
    C = fdcoefficient(n=n, m=m, d=d)
    println("d = :$d, n = $n, m = $m")
    for j in 1:length(I)
      i = I[j]
      Fornberg = FiniteDifferenceMatrices.Fornberg1988[k][j]
      ThisWork = C[i]
      acceptance = isequal(Fornberg, ThisWork)
      println(acceptance ? "✔" : "✗", " i = $i  $Fornberg == $ThisWork")
      @test acceptance
    end
    println()
  end

end
