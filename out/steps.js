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

float plot(in vec2 st, in float pct) {
    return smoothstep(pct - 0.02, pct, st.y) -
        smoothstep(pct, pct + 0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / RESOLUTION;
    float y = smoothstep(0.0, 0.5, st.x) - smoothstep(0.5, 1.0, st.x);
    float pct = plot(st, y);
    vec3 color = ((1.0 - pct) * vec3(y)) + (pct * vec3(1.0, 0.25, 0.75));
    gl_FragColor = vec4(color, 1.0);
}
`;
