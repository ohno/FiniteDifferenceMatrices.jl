using FiniteDifferenceMatrices
using Test
using Printf

@testset "FiniteDifferenceMatrices.jl" begin

  @testset "fdcoefficient()" begin
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

  @testset "fdvalue()" begin
    println(" d     x   n   m      h           analytical            numerical")
    println("--  ----  --  --  -----  -------------------  -------------------")
    for d in [:c, :f, :b]
    for x in -1:1:1
    for n in 1:4
    for h = [0.1, 0.01, 0.001]
    for m in 2:2:(14-2n)
      analytical = exp(x)
      numerical  = fdvalue(exp, x, n=n, m=m, d=d, h=big(h), t=Rational{BigInt})
      acceptance = iszero(analytical) ? isapprox(analytical, numerical, atol=1e-2) : isapprox(analytical, numerical, rtol=1e-1)
      @test acceptance
      @printf("%2s  %+.1f  %2d  %2d  %.3f  %+.16f  %+.16f %s\n", d, x, n, m, h, analytical, numerical, acceptance ? "✔" : "✗")
    end
    end
    end
    end
    end
  end

  @testset "fdmatrix()" begin
    println(" d     x   n   m      h           analytical            numerical")
    println("--  ----  --  --  -----  -------------------  -------------------")
    for d in [:c, :f, :b]
    for x in -1:1:1
    for n in 1:4
    for h = [0.1, 0.01, 0.001]
    for m in 2:2:(14-2n)
      M = fdmatrix(101, n=n, m=m, d=d, h=big(h), t=Rational{BigInt})
      X = big.(x .+ h .* (-50:50))
      Y = exp.(X)
      analytical = exp(x)
      numerical  = (M*Y)[51]
      acceptance = iszero(analytical) ? isapprox(analytical, numerical, atol=1e-2) : isapprox(analytical, numerical, rtol=1e-1)
      @test acceptance
      @printf("%2s  %+.1f  %2d  %2d  %.3f  %+.16f  %+.16f %s\n", d, x, n, m, h, analytical, numerical, acceptance ? "✔" : "✗")
    end
    end
    end
    end
    end
  end

end
