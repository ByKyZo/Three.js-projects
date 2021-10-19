import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export abstract class ThreeBase {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    // camera: THREE.Camera;
    // camera: THREE.OrthographicCamera;
    textureLoader: THREE.TextureLoader;
    clock: THREE.Clock;
    controls: OrbitControls;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, camera: THREE.Camera) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.textureLoader = new THREE.TextureLoader();
        this.clock = new THREE.Clock();

        // this.camera = new THREE.OrthographicCamera(0, window.innerWidth, 0, window.innerHeight);
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
        // this.camera = camera;
        this.camera.position.z = 3;

        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.07;

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.resize();
    }

    abstract animate(elapsedTime: number): void;

    protected initAnimation() {
        requestAnimationFrame(this.initAnimation.bind(this));

        const elapsedTime = this.clock.getElapsedTime();

        this.animate(elapsedTime);

        // Render scene and camera
        this.renderer.render(this.scene, this.camera);
    }

    private resize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

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
