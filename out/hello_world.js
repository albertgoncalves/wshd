SHADER_VERT = `
precision mediump float;

attribute vec2 POSITION;

void main() {
    gl_Position = vec4(POSITION, 0.0, 1.0);
}
`;

SHADER_FRAG = `
precision mediump float;

uniform vec2 RESOLUTION;
uniform float TIME;

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
`;
