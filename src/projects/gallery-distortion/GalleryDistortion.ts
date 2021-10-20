import * as THREE from 'three';
import { ThreeBase } from '../ThreeBase';
import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';
import girl from '../../assets/girl.jpg';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// TODO Utiliser une orthographic camera
export class GalleryDistortion extends ThreeBase {
    geometry: THREE.BufferGeometry;
    material: THREE.RawShaderMaterial;
    // camera: THREE.PerspectiveCamera;
    camera: THREE.OrthographicCamera;
    controls: OrbitControls;
    mesh: THREE.Mesh;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
        const aspectRatio = window.innerWidth / window.innerHeight;

        this.camera = new THREE.OrthographicCamera(
            aspectRatio / -2,
            aspectRatio / 2,
            aspectRatio / 2,
            aspectRatio / -2,
            1,
            1000
        );
        this.camera.position.set(4, 4, 4);
        this.camera.lookAt(0, 0, 0);
        // this.camera.position.z = 3;

        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.07;

        this.geometry = new THREE.PlaneGeometry(1, 2, 32, 32);
        this.material = new THREE.RawShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uTexture: { value: this.textureLoader.load(girl) },
            },
            side: THREE.DoubleSide,
            // wireframe: true,
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.scene.add(this.mesh);
        this.initAnimation();
    }

    animate(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime;
        this.renderer.render(this.scene, this.camera);
        // console.log(elapsedTime);
    }
}
