<template>
  <div class="flex justify-center items-center bg-teal-500 py-10 lg:py-4 h-full lg:h-screen">
    <div class="rounded shadow w-5/6 lg:w-3/4 px-8 py-4 bg-white 2xl:h-1/2">
      <h2 class="text-xl my-2 2xl:text-2xl 2xl:text-center ">Photo Editor</h2>
      <div class="editor__wrapper flex flex-col-reverse items-center mb-5 2xl:h-5/6 lg:flex lg:flex-row ">
        <div
          class="controll__panel border-2 rounded w-full p-4 lg:w-2/3"
          :class="{ 'disabled': locked }"
        >
          <label class="text-lg p-1">Filters</label>
          <div class="filter__options grid grid-cols-2">
            <button
              class="bg-white text-xs flex justify-center sm:text-lg text-gray-500 p-2 border rounded border-gray-500 m-1"
              id="filter"
              :class="filter.class"
              v-for="filter in filters"
              :key="filter.id"
              @click="chooseFilter"
            >{{ filter.title }}</button>
          </div>
          <div class="slider pl-1">
            <div class="filder__info flex justify-between items-center text-gray-500">
              <p class="text-lg py-2">{{ chosenFilter }}</p>
              <p class="text-lg py-2">{{ filterValue }}%</p>
            </div>
            <input
              type="range"
              v-model="filterValue"
              @change="changeFilter"
              min="0"
              :max="maxValue"
              class="w-full py-4 accent-teal-500"
            >
          </div>
          <div class="rotate">
            <label class="text-lg p-2">Rotate & Flip</label>
            <div class="rotate__options flex">
              <button
                class=" flex justify-center items-center bg-white text-gray-500 text-lg sm:p-3 p-1 border rounded border-gray-500 lg:hover:bg-teal-500 lg:hover:text-white lg:hover:border-teal-500 active:bg-teal-500 active:text-white active:border-teal-500 transition m-1 duration-300 w-1/2"
                @click="rotateRight"
              >
                <img
                  src="./assets/rotate.svg"
                  alt="svg"
                  class="w-2/3 sm:w-1/2 2xl:w-1/4"
                ></button>
              <button
                class="flex justify-center items-center bg-white text-gray-500 text-lg sm:p-3 p-1 border rounded border-gray-500 lg:hover:bg-teal-500 lg:hover:text-white lg:hover:border-teal-500 active:bg-teal-500 active:text-white active:border-teal-500 transition m-1 duration-300 w-1/2"
                @click="rotateLeft"
              >
                <img
                  src="./assets/rotate.svg"
                  alt="svg"
                  class="w-2/3 sm:w-1/2 2xl:w-1/4 rotate-180"
                ></button>
              <button
                class="flex justify-center items-center bg-white text-gray-500 text-lg sm:p-3 p-1 border rounded border-gray-500 lg:hover:bg-teal-500 lg:hover:text-white lg:hover:border-teal-500 active:bg-teal-500 active:text-white active:border-teal-500 transition m-1 duration-300 w-1/2"
                @click="flipHorizontal"
              >
                <img
                  src="./assets/reflect-horizontal.svg"
                  alt="svg"
                  class="w-2/3 sm:w-1/2 2xl:w-1/4"
                ></button>
              <button
                class="flex justify-center items-center bg-white text-gray-500 text-lg sm:p-3 p-1 border rounded border-gray-500 lg:hover:bg-teal-500 lg:hover:text-white lg:hover:border-teal-500 active:bg-teal-500 active:text-white active:border-teal-500 transition m-1 duration-300 w-1/2"
                @click="flipVertical"
              >
                <img
                  src="./assets/reflect-vertical.svg"
                  alt="svg"
                  class="w-2/3 sm:w-1/2 2xl:w-1/4"
                ></button>
            </div>
          </div>
        </div>
        <div
          id="preview__img"
          class="flex justify-center w-full h-full ml-0 my-3 lg:my-0 lg:ml-5 xl:ml-2 overflow-hidden"
        >
          <img
            src="./assets/image-placeholder.svg"
            alt="svg"
            class="rounded object-contain"
          >
        </div>
      </div>
      <div class="general__controlls flex flex-col justify-between items-center lg:flex-row">
        <button
          class="border rounded py-2 px-4 border-teal-500 text-xl lg:hover:bg-teal-500 lg:hover:text-white active:bg-teal-500 active:text-white transition duration-300 w-full lg:w-auto"
          :class="{ 'disabled': locked }"
          @click="resetFilters"
        >Reset Filters</button>
        <div class="controlls__row flex flex-col w-full lg:flex-none lg:w-auto lg:flex-row ">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            class="opacity-0 hidden"
            @change="loadFile"
          >
          <button
            class="animate-bounce border rounded py-2 px-4 border-gray-500 bg-gray-800 text-white lg:mr-4 my-3 lg:my-0"
            @click="getPhoto"
          >Choose Image</button>
          <button
            class="border rounded py-2 px-4 border-teal-500 bg-teal-500 text-white"
            :class="{ 'disabled': locked }"
            @click="savePhoto"
          >Save Image</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      locked: true,
      chosenFilter: 'Brightness',
      chosenImg: null,
      filterValue: 100,
      brightness: 100,
      saturation: 100,
      inversion: 0,
      grayscale: 0,
      maxValue: 200,
      rotatePos: 0,
      horizontalPos: 1,
      verticalPos: 1,
      photoName: '',
      filters: [
        { id: 1, title: 'Brightness', class: 'active' },
        { id: 2, title: 'Saturation' },
        { id: 3, title: 'Inversion' },
        { id: 4, title: 'Grayscale' },
      ]
    }
  },
  methods: {
    getPhoto(e) {
      e.target.classList.remove('animate-bounce')
      let file = document.querySelector('#fileInput')
      file.click()
    },

    loadFile() {
      let previewImg = document.querySelector('#preview__img img')
      let file = fileInput.files[0]
      if (!file) return
      this.photoName = file.name
      previewImg.src = URL.createObjectURL(file)
      this.unlockPanel()
      this.chosenImg = previewImg
    },

    savePhoto() {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = this.chosenImg.naturalWidth
      canvas.height = this.chosenImg.naturalHeight

      ctx.filter = `brightness(${this.brightness}%) saturate(${this.saturation}%) invert(${this.inversion}%) grayscale(${this.grayscale}%)`
      ctx.translate(canvas.width / 2, canvas.height / 2)
      if (this.rotatePos) {
        ctx.rotate(this.rotatePos * Math.PI / 180)
      }
      ctx.scale(this.horizontalPos, this.verticalPos)
      ctx.drawImage(this.chosenImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)

      const link = document.createElement('a')
      link.download = this.photoName
      link.href = canvas.toDataURL()
      link.click()
    },

    applyFilters() {
      this.chosenImg.style.filter = `brightness(${this.brightness}%) saturate(${this.saturation}%) invert(${this.inversion}%) grayscale(${this.grayscale}%)`
      this.chosenImg.style.transform = `rotate(${this.rotatePos}deg) scale(${this.horizontalPos}, ${this.verticalPos})`
    },

    unlockPanel() {
      if (this.locked) {
        this.locked = false
        this.filterValue = this.brightness
      } else {
        this.locked = true
      }
    },

    chooseFilter(e) {
      let filters = document.querySelectorAll('#filter')
      filters.forEach(filter => {
        filter.classList.remove('active')
      })
      e.target.classList.add('active')
      this.chosenFilter = e.target.innerText
      if (this.chosenFilter === 'Brightness') {
        this.filterValue = this.brightness
        this.maxValue = 200
      } else if (this.chosenFilter === 'Saturation') {
        this.filterValue = this.saturation
        this.maxValue = 200
      } else if (this.chosenFilter === 'Inversion') {
        this.filterValue = this.inversion
        this.maxValue = 100
      } else {
        this.filterValue = this.grayscale
        this.maxValue = 100
      }
    },

    changeFilter() {
      if (this.chosenFilter === 'Brightness') {
        this.brightness = this.filterValue
      } else if (this.chosenFilter === 'Saturation') {
        this.saturation = this.filterValue
      } else if (this.chosenFilter === 'Inversion') {
        this.inversion = this.filterValue
      } else {
        this.grayscale = this.filterValue
      }
      this.applyFilters()
    },

    resetFilters() {
      let filters = document.querySelectorAll('#filter')
      filters.forEach(filter => {
        filter.classList.remove('active')
      })
      filters[0].classList.add('active')

      this.chosenFilter = 'Brightness'
      this.brightness = 100
      this.saturation = 100
      this.inversion = 0
      this.grayscale = 0
      this.maxValue = 200
      this.rotatePos = 0
      this.horizontalPos = 1
      this.verticalPos = 1
      this.photoName = ''

      this.chosenImg.style.transform = `rotate(${this.rotatePos}deg) scale(${this.horizontalPos}, ${this.verticalPos})`
      this.filterValue = this.brightness
      this.applyFilters()
    },

    rotateRight() {
      this.rotatePos += 90
      this.applyFilters()
    },

    rotateLeft() {
      this.rotatePos -= 90
      this.applyFilters()
    },

    flipHorizontal() {
      this.horizontalPos = this.horizontalPos === 1 ? -1 : 1
      this.applyFilters()
    },

    flipVertical() {
      this.verticalPos = this.verticalPos === 1 ? -1 : 1
      this.applyFilters()
    }
  },
}
</script>

<style>
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
