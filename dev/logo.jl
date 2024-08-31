# Please run `include("./dev/logo.jl")` on RELP.
# https://convertio.co/ja/svg-ico/

xₘᵢₙ = 50
Δx = 25
r = 7.5

using Printf

svg = """
<?xml version="1.0" encoding="UTF-8"?>
<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="325pt"
  height="300pt"
  viewBox="0 0 325 300"
>

<!-- <rect width="325" height="300" fill="#FFFFFF"/> -->
<path d="$(@sprintf("M%5.1f,%5.1f L%5.1f,%5.1f L%5.1f,%5.1f L%5.1f,%5.1f",  50+12.5,25,  25+12.5,25,  25+12.5,300-25,  50+12.5,300-25))" stroke="#24292E" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="$(@sprintf("M%5.1f,%5.1f L%5.1f,%5.1f L%5.1f,%5.1f L%5.1f,%5.1f", 275-12.5,25, 300-12.5,25, 300-12.5,300-25, 275-12.5,300-25))" stroke="#24292E" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
"""

for x in xₘᵢₙ:Δx:(300-xₘᵢₙ)
  global svg *= """
    <circle cx="$(@sprintf("%5.1f", x   +12.5))" cy="$(@sprintf("%5.1f", x))" r="$r" fill="#4063D8"/>
  """
end
svg *= "\n"

for x in xₘᵢₙ:Δx:(300-1*Δx-xₘᵢₙ)
  global svg *= """
    <circle cx="$(@sprintf("%5.1f", x+1*Δx+12.5))" cy="$(@sprintf("%5.1f", x))" r="$r" fill="#389826"/>
  """
end
svg *= "\n"

for x in xₘᵢₙ:Δx:(300-2*Δx-xₘᵢₙ)
  global svg *= """
    <circle cx="$(@sprintf("%5.1f", x+2*Δx+12.5))" cy="$(@sprintf("%5.1f", x))" r="$r" fill="#CB3C33"/>
  """
end
svg *= "\n"

for x in xₘᵢₙ:Δx:(300-3*Δx-xₘᵢₙ)
  global svg *= """
    <circle cx="$(@sprintf("%5.1f", x+3*Δx+12.5))" cy="$(@sprintf("%5.1f", x))" r="$r" fill="#9558B2"/>
  """
end
svg *= "\n"

svg *= """
</svg>
"""

# HTML(svg) |> display

path = "./docs/src/assets/logo.svg"
mkpath(dirname(path))
file = open(path, "w")
Base.write(file, svg)
close(file)
