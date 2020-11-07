precision mediump float;

attribute vec2 POSITION;

void main() {
    gl_Position = vec4(POSITION, 0.0, 1.0);
}
