# This is just a reminder. You don't use it.

# import Pkg; Pkg.add("PkgTemplates")
using PkgTemplates

t = Template(;
  user = "ohno",
  authors = ["Shuhei Ohno"],
  dir = pwd(),
  julia = v"1",
  plugins = [
    License(; name = "MIT"),
    ProjectFile(; version=v"0.0.1"),
    Git(; manifest = false, ssh = true),
    GitHubActions(;
      extra_versions = ["1.7"]
    ),
    Documenter{GitHubActions}(),
    Readme(;
      inline_badges = true,
      badge_order = DataType[
        GitHubActions,
        Documenter{GitHubActions},
      ],
    ),
  ],
)

generate("FiniteDifferenceMatrices", t)
