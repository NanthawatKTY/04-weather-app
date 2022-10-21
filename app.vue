<script setup lang="ts">
  //https://api.openweathermap.org/data/2.5/weather?q=London&appid=b602a779f2c109df4861272763a38686
  const cookie = useCookie("city")
  if (!cookie.value) cookie.value = "Toronto"

  
  
  //Config for the API
  const config = useRuntimeConfig()
  console.log({config});

  const search = ref(cookie.value)
  const input = ref("")
  const background = ref("")

  ////// useFetch //////
  // const {
  //   data,
  //   error
  // } = await useFetch(
  //   () => `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=b033ddcbc6344ea29ee651ad6389e957`
  // )

  ////// useAsyncData //////
  // useAsyncData can use res to do some logic you want.
  const {
    data: city,
    error
  } = useAsyncData(
    "city",

    async () => {
      let response;

      try {
        response = await $fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search.value}`, 
          {
            params:{
              units: "metric",
              appid: config.WEATHER_APP_SECRET_KEY,

            }
          }

        )

        cookie.value = search.value

        const temp = response.main.temp;

        if (temp <= -10) {
          background.value =
            "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
        } else if (temp > -10 && temp <= 0) {
          background.value =
            "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
        } else if (temp > 0 && temp <= 10) {
          background.value =
            "https://images.unsplash.com/photo-1560258018-c7db7645254e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4032&q=80";
        } else {
          background.value =
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3546&q=80";
        }
      } catch (error) {}
      return response
    }, {
      watch: [search]
    }
  )

  let today:any = new Date()
  today = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handlerClickSearch = () => {
    //trim() is used to remove white spaces
    //split() is used to split the string into an array
    //join() is used to join the array into a string
    //Example: "London, UK" => ["London", "UK"] => "London,UK"
    const formatedSearch = input.value.trim().split(" ").join("+")
    search.value = formatedSearch
    input.value = ""
  }

  const handlerGoback = () => {
    search.value = cookie.value
  }
</script>

<template>
  <div v-if="city" class="my-auto mx-auto h-screen relative overflow-hidden">
    <!-- <div class="md:flex"> -->
      <img :src="background" alt="" class="h-full w-full object-cover md:h-full md:w-full"/>
      <div class="absolute w-full h-full top-0 overlay" />
      <div class="absolute w-full h-full top-0 p-12 md:p-48">
        <div class="flex justify-between md:text-center">
          <div>
            <h1 class="text-7xl text-white">{{city.name}}</h1>
            <p class="font-extralight text-2xl mt-2 text-white">{{today}}</p>
            <img :src="`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`" class="w-56 -mt-11 -ml-11"
              alt="atmostphere-icon">
          </div>
          <div>
            <p class="text-5xl text-white font-extralight sm:text-7xl">
              <!-- {{Math.round(city.main.temp - 273.15)}}°C -->
              {{city.main.temp}}°C
            </p>
          </div>
        </div>
  
        <!-- search input -->
        <div class="mt-20">
          <input v-model="input" type="text" class="w-1/2 h-10 pl-2" placeholder="Search a place ...">
          <button @click="handlerClickSearch" class="bg-sky-400 w-15 sm:w-20 text-white h-10">Search</button>
        </div>
      </div>
    <!-- </div> -->
  </div>
  <div v-else class="p-10">
    <h1 class="text-7xl">Sorry, we can't find that place.</h1>
    <button @click="handlerGoback" class="mt-5 bg-sky-400 px-10 w-50 text-white h-10">Go back</button>
  </div>
</template>

<style scoped>
  .overlay {
    background: rgba(62, 62, 62, 0.5)
  }
</style>