param(
[string] $path,
[string] $regex = "")

$programPath = $PSScriptRoot + "\\count_pages.py"

python $programPath $path $regex