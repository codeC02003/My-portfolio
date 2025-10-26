varying vec3 vPosition;
uniform float uTime;

float random(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898,78.233,45.164))) * 43758.5453);
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(mix(mix(random(i + vec3(0,0,0)),
                     random(i + vec3(1,0,0)), f.x),
                 mix(random(i + vec3(0,1,0)),
                     random(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(random(i + vec3(0,0,1)),
                     random(i + vec3(1,0,1)), f.x),
                 mix(random(i + vec3(0,1,1)),
                     random(i + vec3(1,1,1)), f.x), f.y), f.z);
}

void main() {
  float n = noise(vPosition * 3.0 + uTime * 0.5);
  float intensity = smoothstep(0.3, 1.0, n);
  vec3 color = mix(vec3(0.0, 0.3, 0.4), vec3(0.0, 1.0, 1.0), intensity);
  gl_FragColor = vec4(color, 0.9);
}
