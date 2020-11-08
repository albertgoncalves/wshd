SHADER_VERT = `
precision mediump float;

attribute vec2 POSITION;

void main() {
    gl_Position = vec4(POSITION, 0.0, 1.0);
}
`;

SHADER_FRAG = `
#version 100

precision mediump float;

uniform float TIME;
uniform vec2 MOUSE;
uniform vec2 RESOLUTION;

/* NOTE: See https://www.shadertoy.com/view/XdfGRH. */
/* NOTE: @danguafer (2013)
 * See https://www.shadertoy.com/user/Danguafer.
 */

vec2 translate(in vec2 xy) {
    return ((2.0 * xy) - RESOLUTION) / RESOLUTION;
}

float f(in vec2 p0, in vec2 p1) {
    /* NOTE: Equivalent to 0.03 / pow(distance(p1, p0), 2.0). */
    return 0.03 / (pow(p1.x - p0.x, 2.0) + pow(p1.y - p0.y, 2.0));
}

void main() {
    float t = TIME * 0.75;
    float t1 = t * 2.0;
    float t2 = t * 3.0;
    float t3 = t * 4.0;
    float sin_t3 = sin(t3);
    float cos_t2 = cos(t2);
    /* NOTE: pos_ determines the balls' position in time. */
    vec2 pos0 = vec2((0.1 * sin_t3) + (0.4 * cos_t2),
                     (0.4 * sin(t1)) + (0.2 * cos_t2));
    vec2 pos1 = vec2((0.1 * sin(t2)) + (0.3 * cos(t1)),
                     (0.1 * -sin_t3) + (0.3 * cos_t2));
    vec2 pos2 = translate(MOUSE);
    vec2 pixel = translate(gl_FragCoord.xy);
    vec2 norm = vec2(pow(pixel.x, 2.0), pow(pixel.y, 2.0));
    vec3 color =
        vec3(pow((abs(norm.x + norm.y) * 2.0) + abs(norm.x - norm.y), 3.75));
    color = max(color, 1.0);
    color.r *= distance(pos0, pixel);
    color.g *= distance(pos1, pixel);
    color.b *= distance(pos2, pixel);
    color *= pow(f(pos0, pixel) + f(pos1, pixel) + f(pos2, pixel), 1.35);
    gl_FragColor = vec4(color, 1.0);
}
`;
