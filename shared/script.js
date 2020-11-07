/* global SHADER_FRAG, SHADER_VERT */

"use strict";

var BUFFER_DATA = new Float32Array([
    -1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
]);

function main() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl");
    var program = gl.createProgram();
    {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, SHADER_VERT);
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(vertexShader));
            return;
        }
        gl.attachShader(program, vertexShader);
    }
    {
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, SHADER_FRAG);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(fragmentShader));
            return;
        }
        gl.attachShader(program, fragmentShader);
    }
    {
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program));
            return;
        }
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        {
            var attribute = gl.getAttribLocation(program, "POSITION");
            gl.enableVertexAttribArray(attribute);
            gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
        }
        gl.bufferData(gl.ARRAY_BUFFER, BUFFER_DATA, gl.STATIC_DRAW);
    }
    var width = canvas.width;
    var height = canvas.height;
    var mouse = {
        x: width / 2.0,
        y: height / 2.0,
    };
    var box = canvas.getBoundingClientRect();
    function mouseMove(event) {
        var x = event.clientX - box.left;
        var y = event.clientY - box.top;
        if ((0.0 <= x) && (x < width) && (0.0 <= y) && (y < height)) {
            mouse.x = x;
            mouse.y = height - y;
        }
    }
    window.addEventListener("mousemove", mouseMove, false);
    var uniformMouse = gl.getUniformLocation(program, "MOUSE");
    var uniformTime = gl.getUniformLocation(program, "TIME");
    gl.uniform2f(gl.getUniformLocation(program, "RESOLUTION"), width, height);
    function loop(t) {
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.uniform1f(uniformTime, t / 2048.0);
        gl.uniform2f(uniformMouse, mouse.x, mouse.y);
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

window.onload = main;
