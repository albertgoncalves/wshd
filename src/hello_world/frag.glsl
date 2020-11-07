#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 RESOLUTION;
uniform float TIME;

void main() {
    vec2 coord = gl_FragCoord.xy / RESOLUTION;
    if (distance(vec2(0.0), coord) < 1.0) {
        gl_FragColor = vec4(abs(sin(TIME / 3.0)), coord.x, coord.y, 1.0);
    } else {
        gl_FragColor = vec4(0.0);
    }
}
