#version 100

precision mediump float;

uniform float TIME;
uniform vec2 RESOLUTION;

vec2 translate(in vec2 coord) {
    return ((2.0 * coord) - RESOLUTION) / RESOLUTION;
}

void main() {
    vec2 coord = translate(gl_FragCoord.xy);
    if (distance(vec2(0.0), coord) < 1.0) {
        gl_FragColor = vec4(abs(sin(TIME / 3.0)), coord.x, coord.y, 1.0);
    } else {
        gl_FragColor = vec4(0.0);
    }
}
