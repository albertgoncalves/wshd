with import <nixpkgs> {};
mkShell {
    buildInputs = [
        clang_10
        glibcLocales
        htmlTidy
        nodejs
        parallel
        python3
        python3Packages.flake8
        shellcheck
    ];
    shellHook = ''
        . .shellhook
    '';
}
