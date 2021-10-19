uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uTime;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main () {
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    float speed = 2.0;
    float frequency = 3.0;

    float modifier = sin((modelPosition.x * frequency) + uTime * speed) * 0.1;
    modifier += sin((modelPosition.y * frequency) + uTime * speed) * 0.1;
    // modifier += sin(modelPosition.z + uTime * speed) * 0.1;

    modelPosition += modifier;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}