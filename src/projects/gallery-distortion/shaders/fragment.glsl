precision mediump float;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vTime;

void main () {
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    // float uvY = sin(vUv.y * vTime) ; 
    // float uvY = sin(vUv.y) ; 
    // vec2 uv = sin(vUv * vTime); 
    // vec2 uv = sin(vUv * vTime * 10.0); 

    vec3 texture = texture2D(uTexture,vUv).rgb;
    // vec3 texture = texture2D(uTexture, vec2(vUv.x, uvY)).rgb;
    // vec3 texture = texture2D(uTexture, uv).rgb;

    float base = 0.5;
    float frequency = 10.0;

    float textureR = texture.r;
    float textureG = texture.g;
    float textureB = sin(texture.b  * vTime * frequency) + base ;
    // gl_FragColor = vec4(texture,1.0);
    gl_FragColor = vec4(textureR,textureG,textureB,1.0);
}