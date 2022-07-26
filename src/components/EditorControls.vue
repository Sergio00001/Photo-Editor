<template>
    <div class="general__controlls flex flex-col justify-between items-center lg:flex-row">
        <button
            class="border rounded py-2 px-4 border-teal-500 text-xl lg:hover:bg-teal-500 lg:hover:text-white active:bg-teal-500 active:text-white transition duration-300 w-full lg:w-auto"
            :class="{ 'disabled': $store.state.locked }"
            @click="$store.dispatch('resetFilters')"
        >Reset Filters</button>
        <div class="controlls__row flex flex-col w-full lg:flex-none lg:w-auto lg:flex-row ">
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                class="opacity-0 hidden"
                @change="$store.dispatch('loadFile')"
            >
            <button
                class="animate-bounce border rounded py-2 px-4 border-gray-500 bg-gray-800 text-white lg:mr-4 my-3 lg:my-0"
                @click="getPhoto"
            >Choose Image</button>
            <button
                class="border rounded py-2 px-4 border-teal-500 bg-teal-500 text-white"
                :class="{ 'disabled': $store.state.locked }"
                @click="$store.commit('savePhoto')"
            >Save Image</button>
        </div>
    </div>
</template>
<script>
import { usePhoto } from '../hooks/usePhoto'
export default {

    setup(props) {
        const getPhoto = usePhoto;
        return {
            getPhoto,
        };
    },
}
</script>
<style>
</style>