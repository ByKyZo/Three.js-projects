precision mediump float;
uniform sampler2D uTexture;

varying vec2 vUv;

void main () {
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    vec3 texture = texture2D(uTexture,vUv).rgb;
    gl_FragColor = vec4(texture,1.0);
}