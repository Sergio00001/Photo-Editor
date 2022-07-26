import { createStore } from 'vuex'

export default createStore({
    state: {
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
    },

    getters: {},

    mutations: {
        unlockPanel(state) {
            if (state.locked) {
                state.locked = false
                state.filterValue = state.brightness
            }
        },

        applyFilters(state) {
            state.chosenImg.style.filter = `brightness(${state.brightness}%) saturate(${state.saturation}%) invert(${state.inversion}%) grayscale(${state.grayscale}%)`
            state.chosenImg.style.transform = `rotate(${state.rotatePos}deg) scale(${state.horizontalPos}, ${state.verticalPos})`
        },

        setFilter(state) {
            if (state.chosenFilter === 'Brightness') {
                state.filterValue = state.brightness
                state.maxValue = 200
            } else if (state.chosenFilter === 'Saturation') {
                state.filterValue = state.saturation
                state.maxValue = 200
            } else if (state.chosenFilter === 'Inversion') {
                state.filterValue = state.inversion
                state.maxValue = 100
            } else {
                state.filterValue = state.grayscale
                state.maxValue = 100
            }
        },

        savePhoto(state) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            canvas.width = state.chosenImg.naturalWidth
            canvas.height = state.chosenImg.naturalHeight

            ctx.filter = `brightness(${state.brightness}%) saturate(${state.saturation}%) invert(${state.inversion}%) grayscale(${state.grayscale}%)`
            ctx.translate(canvas.width / 2, canvas.height / 2)
            if (state.rotatePos) {
                ctx.rotate(state.rotatePos * Math.PI / 180)
            }
            ctx.scale(state.horizontalPos, state.verticalPos)
            ctx.drawImage(state.chosenImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)

            const link = document.createElement('a')
            link.download = state.photoName
            link.href = canvas.toDataURL()
            link.click()
        },
    },

    actions: {
        loadFile({ state, commit }) {
            let previewImg = document.querySelector('#preview__img img')
            let file = fileInput.files[0]
            if (!file) return
            state.photoName = file.name
            previewImg.src = URL.createObjectURL(file)
            commit('unlockPanel')
            state.chosenImg = previewImg
        },


        changeFilter({ state, commit }) {
            if (state.chosenFilter === 'Brightness') {
                state.brightness = state.filterValue
            } else if (state.chosenFilter === 'Saturation') {
                state.saturation = state.filterValue
            } else if (state.chosenFilter === 'Inversion') {
                state.inversion = state.filterValue
            } else {
                state.grayscale = state.filterValue
            }
            commit('applyFilters')
        },

        resetFilters({ state, commit }) {
            let filters = document.querySelectorAll('#filter')
            filters.forEach(filter => {
                filter.classList.remove('active')
            })
            filters[0].classList.add('active')
            state.chosenFilter = 'Brightness'
            state.brightness = 100
            state.saturation = 100
            state.inversion = 0
            state.grayscale = 0
            state.maxValue = 200
            state.rotatePos = 0
            state.horizontalPos = 1
            state.verticalPos = 1
            state.photoName = ''
            state.chosenImg.style.transform = `rotate(${state.rotatePos}deg) scale(${state.horizontalPos}, ${state.verticalPos})`
            state.filterValue = state.brightness
            commit('applyFilters')
        },

        rotateRight({ state, commit }) {
            state.rotatePos += 90
            commit('applyFilters')
        },

        rotateLeft({ state, commit }) {
            state.rotatePos -= 90
            commit('applyFilters')
        },

        flipHorizontal({ state, commit }) {
            state.horizontalPos = state.horizontalPos === 1 ? -1 : 1
            commit('applyFilters')
        },

        flipVertical({ state, commit }) {
            state.verticalPos = state.verticalPos === 1 ? -1 : 1
            commit('applyFilters')
        }
    },

    modules: {}
})