<template>
    <div
        class="controll__panel border-2 rounded w-full p-4 lg:w-2/3"
        :class="{ 'disabled': $store.state.locked }"
    >
        <label class="text-lg p-1">Filters</label>
        <div class="filter__options grid grid-cols-2">
            <button
                class="bg-white text-xs flex justify-center sm:text-lg text-gray-500 p-2 border rounded border-gray-500 m-1"
                id="filter"
                :class="filter.class"
                v-for="filter in $store.state.filters"
                :key="filter.id"
                @click="chooseFilter"
            >{{ filter.title }}</button>
        </div>
        <div class="slider pl-1">
            <div class="filder__info flex justify-between items-center text-gray-500">
                <p class="text-lg py-2">{{ $store.state.chosenFilter }}</p>
                <p class="text-lg py-2">{{ $store.state.filterValue }}%</p>
            </div>
            <input
                type="range"
                v-model="$store.state.filterValue"
                @change="$store.dispatch('changeFilter')"
                min="0"
                :max="$store.state.maxValue"
                class="w-full py-4 accent-teal-500"
            >
        </div>
        <div class="rotate">
            <label class="text-lg p-2">Rotate & Flip</label>
            <div class="rotate__options flex">
                <button
                    class=" flex justify-center items-center bg-white text-gray-500 text-lg sm:p-3 p-1 border rounded border-gray-500 lg:hover:bg-teal-500 lg:hover:text-white lg:hover:border-teal-500 active:bg-teal-500 active:text-white active:border-teal-500 transition m-1 duration-300 w-1/2"
                    @click="$store.dispatch('rotateRight')"
                >
                    <img
                        src="../assets/rotate.svg"
                        alt="svg"
                        class="w-2/3 sm:w-1/2 2xl:w-1/4"
                    ></button>
                <button
                    class="flex justify-center items-center bg-white text-gray-500 text-lg sm:p-3 p-1 border rounded border-gray-500 lg:hover:bg-teal-500 lg:hover:text-white lg:hover:border-teal-500 active:bg-teal-500 active:text-white active:border-teal-500 transition m-1 duration-300 w-1/2"
                    @click="$store.dispatch('rotateLeft')"
                >
                    <img
                        src="../assets/rotate.svg"
                        alt="svg"
                        class="w-2/3 sm:w-1/2 2xl:w-1/4 rotate-180"
                    ></button>
                <button
                    class="flex justify-center items-center bg-white text-gray-500 text-lg sm:p-3 p-1 border rounded border-gray-500 lg:hover:bg-teal-500 lg:hover:text-white lg:hover:border-teal-500 active:bg-teal-500 active:text-white active:border-teal-500 transition m-1 duration-300 w-1/2"
                    @click="$store.dispatch('flipHorizontal')"
                >
                    <img
                        src="../assets/reflect-horizontal.svg"
                        alt="svg"
                        class="w-2/3 sm:w-1/2 2xl:w-1/4"
                    ></button>
                <button
                    class="flex justify-center items-center bg-white text-gray-500 text-lg sm:p-3 p-1 border rounded border-gray-500 lg:hover:bg-teal-500 lg:hover:text-white lg:hover:border-teal-500 active:bg-teal-500 active:text-white active:border-teal-500 transition m-1 duration-300 w-1/2"
                    @click="$store.dispatch('flipVertical')"
                >
                    <img
                        src="../assets/reflect-vertical.svg"
                        alt="svg"
                        class="w-2/3 sm:w-1/2 2xl:w-1/4"
                    ></button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        chooseFilter(e) {
            let filters = document.querySelectorAll("#filter");
            filters.forEach(filter => {
                filter.classList.remove("active");
            });
            e.target.classList.add("active");
            this.$store.state.chosenFilter = e.target.innerText;
            this.$store.commit("setFilter");
        },
    },

}
</script>
<style>
</style>