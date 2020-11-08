#version 100

precision mediump float;

uniform float TIME;
uniform vec2 RESOLUTION;

vec2 translate(in vec2 coord) {
    return ((2.0 * coord) - RESOLUTION) / RESOLUTION;
}

#define N 4

void main() {
    float t = TIME * 0.5;
    vec2 xs[N];
    xs[0] = vec2((sin(t * 6.0) * 0.2) + (cos(t * 5.5) * 0.4),
                 (sin(t * 3.0) * 0.4) + (cos(t * 2.0) * 0.1));
    xs[1] = vec2((sin(t * 5.0) * 0.6) + (cos(t * 4.5) * 0.6),
                 (sin(t * 4.0) * 0.3) + (cos(t * 7.0) * 0.3));
    xs[2] = vec2((sin(t * 0.5) * 0.1) + (cos(t * 9.0) * 0.15),
                 (sin(t * 1.5) * 0.8) + (cos(t * 3.5) * 0.2));
    xs[3] = vec2((sin(t * 2.5) * 0.5) + (cos(t * 1.5) * 0.05),
                 (sin(t * 5.5) * 0.7) + (cos(t * 6.5) * 0.7));
    vec2 pixel = translate(gl_FragCoord.xy);
    float color = 0.0;
    for (int i = 0; i < N; ++i) {
        color += 0.075 / distance(xs[i], pixel);
    }
    gl_FragColor = vec4(vec3(color), 1.0);
}
