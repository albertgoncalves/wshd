#version 100

precision mediump float;

uniform float TIME;
uniform vec2 MOUSE;
uniform vec2 RESOLUTION;

/* NOTE: See `https://thebookofshaders.com/13/`. */
/* NOTE: @patriciogv (2015)
 * See `http://patriciogonzalezvivo.com`.
 */

float random(in vec2 xy) {
    return fract(sin(dot(xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

/* NOTE: See `https://www.shadertoy.com/view/4dS3Wd`. */
float noise(in vec2 xy) {
    vec2 i = floor(xy);
    vec2 f = fract(xy);
    /* NOTE: Four corners in 2D of a tile. */
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = smoothstep(0.0, 1.0, f);
    return mix(a, b, u.x) + ((c - a) * u.y * (1.0 - u.x)) +
        ((d - b) * u.x * u.y);
}

#define N_OCTAVES 4

float fbm(in vec2 xy) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0) + (MOUSE / 1500.0);
    /* NOTE: Rotate to reduce axial bias. */
    float s = sin(0.5);
    float c = cos(0.5);
    mat2 rot = mat2(c, s, -s, c);
    for (int i = 0; i < N_OCTAVES; ++i) {
        v += a * noise(xy);
        a *= 0.5;
        xy = (rot * xy * 2.0) + shift;
    }
    return v;
}

void main() {
    vec2 coord = (gl_FragCoord.xy / RESOLUTION) * 3.0;
    coord += coord * abs(sin(TIME * 0.05) * 3.0);
    vec2 q = vec2(fbm(coord + (0.0 * TIME)), fbm(coord + vec2(1.0)));
    vec2 r = vec2(fbm(coord + (1.0 * q) + vec2(1.7, 9.2) + (0.15 * TIME)),
                  fbm(coord + (1.0 * q) + vec2(8.3, 2.8) + (0.126 * TIME)));
    float f = fbm(coord + r);
    vec3 color = mix(vec3(0.101961, 0.619608, 0.666667),
                     vec3(0.666667, 0.666667, 0.498039),
                     clamp(f * f * 4.0, 0.0, 1.0));
    color = mix(color, vec3(0.0, 0.0, 0.164706), clamp(length(q), 0.0, 1.0));
    color = mix(color, vec3(0.666667, 1.0, 1.0), clamp(r.x, 0.0, 1.0));
    gl_FragColor =
        vec4(((f * f * f) + (0.6 * f * f) + (0.5 * f)) * color, 1.0);
}
