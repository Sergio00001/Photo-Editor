<template>
    <div class="photo_editor flex justify-center items-center py-10 lg:py-4 h-full lg:h-screen">
        <div class="rounded shadow w-5/6 lg:w-3/4 px-8 py-4 bg-white 2xl:h-1/2">
            <h2 class="text-xl my-2 2xl:text-2xl 2xl:text-center ">Photo Editor</h2>
            <div class="editor__wrapper flex flex-col-reverse items-center mb-5 2xl:h-5/6 lg:flex lg:flex-row ">
                <EditorPanel />
                <PhotoArea />
            </div>
            <EditorControls />
        </div>
    </div>
</template>
<script>
import EditorPanel from '../components/EditorPanel.vue'
import PhotoArea from '../components/PhotoArea.vue'
import EditorControls from '../components/EditorControls.vue'
export default {
    components: { EditorPanel, PhotoArea, EditorControls }
}
</script>
<style>
.photo_editor {
    background-image: url('../assets/background.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.disabled {
    opacity: 0.4;
    pointer-events: none;
}

.active {
    background-color: rgb(20 184 166);
    color: white;
    border: 1px solid rgb(20 184 166);
}
</style>