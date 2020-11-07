#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 RESOLUTION;
uniform float TIME;

#define PI 3.14159265359

float plot(in float x, in float y, in float k) {
    return step(x - k, y) - step(x + k, y);
}

float sin_pos(in float x) {
    return (sin(x) / 2.0) + 0.5;
}

float cos_pos(in float x) {
    return (cos(x) / 2.0) + 0.5;
}

void main() {
    vec2 coord = gl_FragCoord.xy / RESOLUTION;
    float k = (sin_pos(TIME) / 100.0) + 0.02;
    float x = sin_pos(coord.x * cos_pos(TIME * PI) * PI * 4.0);
    vec3 color =
        vec3(sin_pos(coord.x / k), sin_pos(0.75 / k), cos_pos(coord.y / k)) +
        vec3(plot(x, coord.y, k));
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
