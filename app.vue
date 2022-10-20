<script setup lang="ts">
  //https://api.openweathermap.org/data/2.5/weather?q=London&appid=b602a779f2c109df4861272763a38686
  const search = ref("london")
  const input = ref("")
  
  const {
    data,
    error
  } = await useFetch(
    () => `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=b033ddcbc6344ea29ee651ad6389e957`
  )

  const handlerClickSearch = () => {
    //trim() is used to remove white spaces
    //split() is used to split the string into an array
    //join() is used to join the array into a string
    //Example: "London, UK" => ["London", "UK"] => "London,UK"
    const formatedSearch = input.value.trim().split(" ").join("+")
    search.value = formatedSearch
    input.value = ""
  }
</script>

<template>
  <div class="h-screen relarive overflow-hidden">
    {{search}}
    <img src="" alt="" />
    <div class="absolute w-full h-full top-0 overlay" />
    <div class="absolute w-full h-full top-0 p-48">
      <div class="flex justify-between">
        <div>
          <h1 class="text-7xl text-white">{{data.name}}</h1>
          <p class="font-extralight text-2xl mt-2 text-white">Sunday Dec 9th</p>
          <img :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`" class="w-56 -mt-11 -ml-11"
            alt="atmostphere-icon">
        </div>
        <div>
          <p class="text-9xl text-white font-extralight">
            <!-- {{Math.round(data.main.temp - 273.15)}}°C -->
            {{data.main.temp}}°C
          </p>
        </div>
      </div>

      <!-- search input -->
      <div class="mt-20">
        <input v-model="input" type="text" class="w-1/2 h-10 pl-2" placeholder="Search a place ...">
        <button @click="handlerClickSearch" class="bg-sky-400 w-20 text-white h-10">Search</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .overlay {
    background: rgba(62, 62, 62, 0.5)
  }
</style>