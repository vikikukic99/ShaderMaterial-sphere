import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  BufferAttribute,
  Color,
  Clock,
  SphereGeometry,
  IcosahedronGeometry,
  Vector3,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'stats.js';

import vertex from './shaders/two/index.vert';
import fragment from './shaders/two/index.frag';

export default class App {
  constructor() {
    this._init();
  }

  _init() {
    // RENDERER
    this._gl = new WebGLRenderer({
      canvas: document.querySelector('#canvas'),
    });

    this._gl.setSize(window.innerWidth, window.innerHeight);

    // CAMERA
    const aspect = window.innerWidth / window.innerHeight;
    this._camera = new PerspectiveCamera(60, aspect, 0.1, 50);
    this._camera.position.z = 5;

    // SCENE
    this._scene = new Scene();

    // CLOCK
    this._clock = new Clock();

    // INIT PLANE
    this._initAttribute();

    // CONTROLS
    const controls = new OrbitControls(this._camera, this._gl.domElement);

    // STATS
    this._stats = new Stats();
    document.body.appendChild(this._stats.dom);

    this._animate();

    this._initEvents();
  }

  _initPlane() {
    const g = new PlaneGeometry(1, 1);
    const m = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    const mesh = new Mesh(g, m);
    this._scene.add(mesh);
  }

  _initAttribute() {
    const g = new SphereGeometry(1, 40, 40);

    const randomArray = [];
    const amount = g.attributes.position.count;
    console.log(g.attributes);

    for (let i = 0; i < amount; i++) {
      randomArray.push(Math.random());
    }

    const bufferAttribute = new BufferAttribute(
      new Float32Array(randomArray),
      1
    );

    g.setAttribute('aRandom', bufferAttribute);

    const colorArray = [];
    for (let i = 0; i < amount; i++) {
      const r = Math.random();
      const g = Math.random();
      const b = Math.random();

      colorArray.push(r, g, b);
    }

    const colorAttribute = new BufferAttribute(new Float32Array(colorArray), 3);
    g.setAttribute('aColor', colorAttribute);

    const m = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uColor1: { value: new Color(0x5afffe) },
        uColor2: { value: new Color(0xe10d31) },
        uIntensity: { value: 0.3 },
        uTime: { value: 0 },
      },
    });

    const mesh = new Mesh(g, m);
    this._mesh = mesh;

    this._scene.add(mesh);
  }

  _initEvents() {
    window.addEventListener('resize', this._resize.bind(this));
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
  }

  _onMouseMove(e) {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    this._ico.material.uniforms.uMouse.value.x = x;
  }

  _resize() {
    this._gl.setSize(window.innerWidth, window.innerHeight);

    const aspect = window.innerWidth / window.innerHeight;
    this._camera.aspect = aspect;
    this._camera.updateProjectionMatrix();
  }

  _animate() {
    this._stats.begin();
    this._clock.delta = this._clock.getDelta()

    this._mesh.material.uniforms.uIntensity.value = Math.cos(
      this._clock.elapsedTime
    )

    

    this._gl.render(this._scene, this._camera);
    this._stats.end();
    window.requestAnimationFrame(this._animate.bind(this));
  }
}
