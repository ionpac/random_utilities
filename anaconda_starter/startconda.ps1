# this script assumes a "normal" installation of anaconda

pushd $env:USERPROFILE
.\anaconda3\shell\condabin\conda-hook.ps1
conda activate "$env:USERPROFILE\\anaconda3"
popd
