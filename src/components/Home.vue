<template>
    <div class="home">
        <div class="container min-h-screen">
            <div class="row mt-32">
                <div class="col-md-12 space-y-5">
                    <h1 class="font-bold text-4xl">Computer Network Measurement</h1>
                    <p class="pb-10">Here you can choose which network to test</p>

                    <div class="flex flex-col  justify-center items-center gap-4">
                        <router-link to="/six" class="text-lg text-white bg-teal-600 hover:text-yellow-200 hover:bg-teal-500 transition-all duration-500 font-bold py-3 px-5 w-80 shadow-md">
                            6 Nodes Test
                        </router-link>
                        <router-link to="/nine" class="text-lg text-white bg-teal-600 hover:text-yellow-200 hover:bg-teal-500 transition-all duration-500 font-bold py-3 px-5 w-80 shadow-md">
                            9 Nodes Test
                        </router-link>
                        <router-link to="/twelve" class="text-lg text-white bg-teal-600 hover:text-yellow-200 hover:bg-teal-500 transition-all duration-500 font-bold py-3 px-5 w-80 shadow-md">
                            12 Nodes Test
                        </router-link>

                        <p class="font-[Caveat] text-2xl mt-4 select-none hover:text-red-400 hover:text-3xl transition-all duration-500">
                            Student
                            <span class="block text-xl">Jawad Kadum Hussein</span>
                        </p>
                        <p class="font-[Caveat] text-2xl mt-4 select-none hover:text-red-400 hover:text-3xl transition-all duration-500">
                            Supervisor
                            <span class="block text-xl">Asst.Prof. Dr .Khulood Ahmed Nassar</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>