<script lang="ts">
    import { onMount } from 'svelte';
    import { GalleryDistortion } from './GalleryDistortion';

    let canvas;
    let project;

    onMount(() => (project = new GalleryDistortion(canvas)));
</script>

<canvas bind:this={canvas} />

<style>
</style>
