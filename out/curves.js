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

#define PI 3.14159265359

float exp_sustained_impulse(in float x, in float f, in float k) {
    float s = max(x - f, 0.0);
    return min((x * x) / (f * f), 1.0 + ((2.0 / f) * s * exp(-k * s)));
}

void main() {
    vec2 coord = gl_FragCoord.xy / RESOLUTION;
    float t = (sin((TIME + PI) / 1.5) / 2.0) - 0.5;
    float z = exp_sustained_impulse(t, coord.x, coord.y);
    gl_FragColor =
        vec4(coord.x * z, coord.y * (1.0 - z), coord.x * coord.y, 1.0);
}
`;
