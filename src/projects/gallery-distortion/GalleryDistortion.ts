import * as THREE from 'three';
import { ThreeBase } from '../ThreeBase';
import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';
import girl from '../../assets/girl.jpg';

// TODO Utiliser une orthographic camera
export class GalleryDistortion extends ThreeBase {
    geometry: THREE.BufferGeometry;
    material: THREE.RawShaderMaterial;
    mesh: THREE.Mesh;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas, new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight));

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
        // console.log(elapsedTime);
    }
}
