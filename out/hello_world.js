SHADER_VERT = `
#ifdef GL_ES
precision mediump float;
#endif

attribute vec2 POSITION;

void main() {
    gl_Position = vec4(POSITION, 0.0, 1.0);
}
`;

SHADER_FRAG = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 RESOLUTION;
uniform float TIME;

void main() {
    vec2 st = gl_FragCoord.xy / RESOLUTION;
    gl_FragColor = vec4(abs(sin(TIME / 3.0)), st.x, st.y, 1.0);
}
`;
