/* global SHADER_FRAG, SHADER_VERT */

"use strict";

// clang-format off

var BUFFER_TRIANGLES = new Float32Array([
    -1.0, -1.0, // 0
     1.0, -1.0, // 1
    -1.0,  1.0, // 2
     1.0,  1.0, // 3
     1.0, -1.0, // 4
    -1.0,  1.0, // 5
]);
var UNIFORM_RECTS = new Float32Array([
    0.3,   0.55,  0.2,   0.3,   // 0
    0.725, 0.8,   0.275, 0.325, // 1
    0.7,   0.95,  0.55,  0.725, // 2
    0.3,   0.525, 0.525, 0.825, // 3
    0.125, 0.225, 0.35,  0.45,  // 4
    0.8,   0.9,   0.1,   0.2,   // 5
]);

// clang-format on

function main() {
    var canvas = document.getElementById("canvas");
    var fps = document.getElementById("fps");
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
        gl.bufferData(gl.ARRAY_BUFFER, BUFFER_TRIANGLES, gl.STATIC_DRAW);
    }
    var width = canvas.width;
    var height = canvas.height;
    var state = {
        frame: {
            time: 0.0,
            count: 0,
        },
        mouse: {
            x: width / 2.0,
            y: height / 2.0,
        },
    };
    var box = canvas.getBoundingClientRect();
    function mouseMove(event) {
        var x = event.clientX - box.left;
        var y = event.clientY - box.top;
        if ((0.0 <= x) && (x < width) && (0.0 <= y) && (y < height)) {
            state.mouse.x = x;
            state.mouse.y = height - y;
        }
    }
    window.addEventListener("mousemove", mouseMove, false);
    gl.uniform4fv(gl.getUniformLocation(program, "RECTS"), UNIFORM_RECTS);
    gl.uniform2f(gl.getUniformLocation(program, "RESOLUTION"), width, height);
    var uniformMouse = gl.getUniformLocation(program, "MOUSE");
    var uniformTime = gl.getUniformLocation(program, "TIME");
    function loop(t) {
        gl.uniform1f(uniformTime, t / 2048.0);
        gl.uniform2f(uniformMouse, state.mouse.x, state.mouse.y);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        ++state.frame.count;
        var elapsed = t - state.frame.time;
        if (1000.0 < elapsed) {
            fps.innerHTML = "<strong>" +
                ((state.frame.count / elapsed) * 1000.0).toFixed(2) +
                "</strong> fps";
            state.frame.time = t;
            state.frame.count = 0;
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

window.onload = main;
