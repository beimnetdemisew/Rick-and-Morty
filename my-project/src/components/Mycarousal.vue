<template>
    <div class="carousel-container mx-auto my-8 w-11/12 lg:w-3/4 relative">
      <Carousel 
        id="gallery" 
        :items-to-show="1" 
        :wrap-around="false" 
        v-model="currentSlide" 
        :autoplay="true"
        :autoplayTimeout="10000"
        class="z-12"
      >
        <template #default="{ prev, next }">
          <Slide v-for="(slide, index) in slides" :key="index">
            <div class="carousel__item flex justify-center items-center h-72 w-full ml-3 mr-3 mt-1 p-1 bg-gray-300 cursor-pointer">
              <img :src="slide" class="h-full w-full " alt="Slide image">
            </div>
          </Slide>
          <button @click="prev" class="nav-button left-button absolute top-1/2 transform -translate-y-1/2 left-2 bg-black text-white p-2 font-extrabold z-20"> + </button>
          <button @click="next" class="nav-button right-button absolute top-1/2 transform -translate-y-1/2 right-2 bg-black text-white p-2 font-extrabold z-20">-</button>
        </template>
      </Carousel>
  
      <Carousel
        id="thumbnails"
        :items-to-show="4"
        :wrap-around="false"
        v-model="currentSlide"
        ref="carousel"
        class="thumbnails ml-3 mr-3 mt-2 z-10"
      >
        <Slide v-for="(slide, index) in slides" :key="index">
          <div class="carousel__item flex justify-center items-center h-24 w-full bg-gray-400 ml-1 cursor-pointer" @click="slideTo(index)">
            <img :src="slide" class="h-full w-full " alt="Thumbnail image">
          </div>
        </Slide>
      </Carousel>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import { Carousel, Slide } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  
  export default defineComponent({
    name: 'Gallery',
    components: {
      Carousel,
      Slide,
    },
    data() {
      return {
        currentSlide: 0,
        slides: [
        { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxH9yUOLz6ofvHikK-Vx5lP5Frrs3UsbfVQ&s' },
        { image: 'https://w0.peakpx.com/wallpaper/653/714/HD-wallpaper-rick-morty-x-breaking-bad.jpg' },
        { image: 'https://wallpapercave.com/wp/wp1822728.jpg' },

        ]
      }
    },
    methods: {
      slideTo(val) {
        this.currentSlide = val
      },
    },
  })
  </script>
  
  <style scoped>
  .carousel-container {
    position: relative;
  }
  
  .nav-button {
    z-index: 20;
  }
  </style>