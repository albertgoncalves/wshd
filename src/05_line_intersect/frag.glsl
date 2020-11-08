#version 100

precision mediump float;

uniform vec2 MOUSE;
uniform vec2 RESOLUTION;

struct Edge {
    vec2 i;
    vec2 j;
};

struct Rect {
    float bottom;
    float top;
    float left;
    float right;
};

vec2 scale(in vec2 xy) {
    return xy / RESOLUTION;
}

bool ccw(in vec2 a, in vec2 b, in vec2 c) {
    return ((b.y - a.y) * (c.x - a.x)) < ((c.y - a.y) * (b.x - a.x));
}

bool intersect(in Edge a, in Edge b) {
    return (ccw(a.i, b.i, b.j) != ccw(a.j, b.i, b.j)) &&
        (ccw(a.i, a.j, b.i) != ccw(a.i, a.j, b.j));
}

bool intersect(in Edge e, in Rect r) {
    if (intersect(e, Edge(vec2(r.left, r.bottom), vec2(r.right, r.bottom)))) {
        return true;
    }
    if (intersect(e, Edge(vec2(r.left, r.top), vec2(r.right, r.top)))) {
        return true;
    }
    if (intersect(e, Edge(vec2(r.left, r.bottom), vec2(r.left, r.top)))) {
        return true;
    }
    if (intersect(e, Edge(vec2(r.right, r.bottom), vec2(r.right, r.top)))) {
        return true;
    }
    return false;
}

#define N 6

void main() {
    Edge source = Edge(scale(gl_FragCoord.xy), scale(MOUSE));
    Rect rects[N];
    rects[0] = Rect(0.3, 0.55, 0.2, 0.3);
    rects[1] = Rect(0.725, 0.8, 0.275, 0.325);
    rects[2] = Rect(0.7, 0.95, 0.55, 0.725);
    rects[3] = Rect(0.3, 0.525, 0.525, 0.825);
    rects[4] = Rect(0.125, 0.225, 0.35, 0.45);
    rects[5] = Rect(0.8, 0.9, 0.1, 0.2);
    vec3 color =
        vec3(smoothstep(0.5, 0.95, 1.0 - distance(source.i, source.j)));
    for (int i = 0; i < N; ++i) {
        if (intersect(source, rects[i])) {
            color = vec3(0.0);
            break;
        }
    }
    gl_FragColor = vec4(color, 1.0);
}
