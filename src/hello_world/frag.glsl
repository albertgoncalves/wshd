#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 RESOLUTION;
uniform vec2 MOUSE;
uniform float TIME;

void main() {
    vec2 st = gl_FragCoord.xy / RESOLUTION;
    gl_FragColor = vec4(abs(sin(TIME / 3.0)), st.x, st.y, 1.0);
}
