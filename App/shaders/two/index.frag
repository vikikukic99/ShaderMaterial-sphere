varying float vRandom;
varying vec3 vColor;
varying vec3 vNormal;

uniform vec3 uColor1;
uniform vec3 uColor2;

void main(){
  vec3 color = vColor;
  float alpha = 1.0;

  vec3 finalColor = mix(uColor1, uColor2, vRandom);
  
  gl_FragColor = vec4(finalColor, alpha);

  vec3 absNormal = abs(vNormal);
  if (absNormal.x > absNormal.y && absNormal.x > absNormal.z) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red
  } else if (absNormal.y > absNormal.z) {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // Green
  } else {
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Blue
  }
}

