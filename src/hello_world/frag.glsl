#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 RESOLUTION;
uniform float TIME;

void main() {
    vec2 coord = gl_FragCoord.xy / RESOLUTION;
    if ((pow(coord.x, 2.0) + pow(coord.y, 2.0)) < 1.0) {
        gl_FragColor = vec4(abs(sin(TIME / 3.0)), coord.x, coord.y, 1.0);
    } else {
        gl_FragColor = vec4(0.0);
    }
}
