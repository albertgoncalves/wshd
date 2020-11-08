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

uniform vec2 MOUSE;
uniform vec2 RESOLUTION;

#define N 6

uniform vec4 RECTS[N];

vec2 scale(in vec2 xy) {
    return xy / RESOLUTION;
}

bool ccw(in vec2 a, in vec2 b, in vec2 c) {
    return ((b.y - a.y) * (c.x - a.x)) < ((c.y - a.y) * (b.x - a.x));
}

/* NOTE: Edge a decomposes into two points: a.xy, a.zw. */
bool intersect_edge_edge(in vec4 a, in vec4 b) {
    return (ccw(a.xy, b.xy, b.zw) != ccw(a.zw, b.xy, b.zw)) &&
        (ccw(a.xy, a.zw, b.xy) != ccw(a.xy, a.zw, b.zw));
}

/* NOTE: Rect r is determined by four float values:
 *  bottom -> vec4.x
 *  top    ->     .y
 *  left   ->     .z
 *  right  ->     .w
 */
bool intersect_edge_rect(in vec4 e, in vec4 r) {
    if (intersect_edge_edge(e, vec4(r.z, r.x, r.w, r.x))) {
        return true;
    }
    if (intersect_edge_edge(e, vec4(r.z, r.y, r.w, r.y))) {
        return true;
    }
    if (intersect_edge_edge(e, vec4(r.z, r.x, r.z, r.y))) {
        return true;
    }
    if (intersect_edge_edge(e, vec4(r.w, r.x, r.w, r.y))) {
        return true;
    }
    return false;
}

void main() {
    vec4 source = vec4(scale(gl_FragCoord.xy), scale(MOUSE));
    vec3 color =
        vec3(1.0 - smoothstep(0.05, 0.5, distance(source.xy, source.zw)));
    for (int i = 0; i < N; ++i) {
        if (intersect_edge_rect(source, RECTS[i])) {
            color = vec3(0.0);
            break;
        }
    }
    gl_FragColor = vec4(color, 1.0);
}
`;
