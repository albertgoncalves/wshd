#!/usr/bin/env python3

from glob import glob
from os import environ
from os.path import basename, normpath, join

WD = environ["WD"]
HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="../shared/style.css">
        <link rel="shortcut icon" href="#">
    </head>
    <body>
        <div class="center">
            <a href="../index.html">back</a>
            <h2>
                {title}
            </h2>
        </div>
        <canvas id="canvas" width="512" height="512"></canvas>
        <script src="{filename}.js"></script>
        <script src="../shared/script.js"></script>
    </body>
</html>
"""
JS_TEMPLATE = """
SHADER_VERT = `
{vert}`;

SHADER_FRAG = `
{frag}`;
"""


def main():
    for x in map(normpath, glob(join(WD, "src", "*", ""))):
        source = {}
        with open(join(x, "frag.glsl"), "r") as file:
            source["frag"] = file.read().replace("`", "")
        with open(join(WD, "shared", "vert.glsl"), "r") as file:
            source["vert"] = file.read().replace("`", "")
        x = basename(x)
        stem = join(WD, "out", x)
        with open("{}.html".format(stem), "w") as file:
            file.write(HTML_TEMPLATE.format(**{
                "title": x.split("_", 1)[1].replace("_", " "),
                "filename": x,
            }).lstrip())
        with open("{}.js".format(stem), "w") as file:
            file.write(JS_TEMPLATE.format(**source).lstrip())


if __name__ == "__main__":
    main()

