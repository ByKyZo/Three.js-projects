precision mediump float;
// precision highp float;
uniform sampler2D uTexture;

varying float vWave;
varying vec2 vUv;
varying float vTime;

void main () {
    float base = 0.5;
    float frequency = 10.0;

    float r = texture2D(uTexture,vUv + vWave * 0.1).r;
    float g = texture2D(uTexture,vUv + vWave * 0.5).g;
    float b = texture2D(uTexture,vUv + vWave).b ;

    gl_FragColor = vec4(r,g,b,1.0);
}