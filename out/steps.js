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
uniform vec2 MOUSE;

float curve(in float a, in float b, in float k) {
    return smoothstep(a - k, a, b) - smoothstep(a, a + k, b);
}

void main() {
    vec2 coord = gl_FragCoord.xy / RESOLUTION;
    float k = 1.2;
    float t =
        clamp(((MOUSE.x / RESOLUTION.x) * (1.0 + k)) - (k / 2.0), 0.0, 1.0);
    float y = smoothstep(0.0, t, coord.x) - smoothstep(t, 1.0, coord.x);
    float z = curve(y, coord.y, 0.025);
    gl_FragColor =
        vec4(((1.0 - z) * vec3(y)) + (z * vec3(t, 1.0 - t, 0.5)), 1.0);
}
`;
