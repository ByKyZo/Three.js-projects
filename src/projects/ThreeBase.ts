import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export abstract class ThreeBase {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    // camera: THREE.PerspectiveCamera;
    // camera: THREE.OrthographicCamera;
    // camera: THREE.OrthographicCamera;
    textureLoader: THREE.TextureLoader;
    clock: THREE.Clock;
    // controls: OrbitControls;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.textureLoader = new THREE.TextureLoader();
        this.clock = new THREE.Clock();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.resize();
    }

    abstract animate(elapsedTime: number): void;

    protected initAnimation() {
        requestAnimationFrame(this.initAnimation.bind(this));

        const elapsedTime = this.clock.getElapsedTime();

        this.animate(elapsedTime);
    }

    private resize() {
        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }

    // animate() {
    //     const elapsedTime = this.clock.getElapsedTime();

    //     this.renderer.render(this.scene, this.camera);
    //     this.controls.update();
    //     requestAnimationFrame(this.animate.bind(this));
    // }
}
