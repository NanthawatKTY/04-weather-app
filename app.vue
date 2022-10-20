<script>
//https://api.openweathermap.org/data/2.5/weather?q=London&appid=b602a779f2c109df4861272763a38686

</script>

<template>
  <div class="h-screen relarive overflow-hidden">
    <img src="" alt="" />
    <div class="absolute w-full h-full top-0 overlay"/>
    <div class="absolute w-full h-full top-0 p-48">
      <div class="flex justify-between">
        <div>
          <h1 class="text-7xl text-white">Vancuver</h1>
          <p class="font-extralight text-2xl mt-2 text-white">Sunday Dec 9th</p>
          <img src="" alt="atmostphere-icon">
        </div>
        <div>
          <p class="text-9xl text-white font-extralight">
           33°
          </p>
        </div>
      </div>

      <!-- search input -->
      <div class="mt-20">
        <input type="text" class="w-1/2 h-10 pl-2" placeholder="Search a place ...">
        <button class="bg-sky-400 w-20 text-white h-10">Search</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .overlay {
    background: rgba(62, 62, 62, 0.5)
  }
</style>