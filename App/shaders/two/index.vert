attribute float aRandom;
attribute vec3 aColor;

varying float vRandom;
varying vec3 vColor;

uniform float uIntensity;
uniform float uTime;

void main() {
  vec3 newPosition = position;
  newPosition.z += aRandom * 0.3;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  vRandom = aRandom;
  vColor = aColor;
}