<script setup>
import Input from "./Input.vue";
import svgc from "./svgc.vue";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

</script>

<script>
export default {
  components:{
    Input, svgc
  },
  data() {
    return {
      Quality: "",
      y1: 0,
      y2: 0,
      Lbl: [],
      Ds: [],
      Ts: [],
      Gs: [],
      Ps: [],
      packet: 0,
      dpkt: [],
      ddpkt: [],
      prop: false,
      top2: false,
      top3: false,
      top4: false,
      top5: false,
      top6: false,

      sT: false,
      sP: false,

      dt2 : 0,
      dt3 : 0,
      dt4 : 0,
      dt5 : 0,
      dt6 : 0,

      delay2: 0,
      delay3: 0,
      delay4: 0,
      delay5: 0,
      delay6: 0,

      L: 0,
      R: 0,
      S: 250000000,
      T: 0,
      P: 0,
      Pr: 0,
      Q: 0,
      Delay: 0,
      Jitter: 0,
      // good: 0,
      svg: "M10, 80 ",
    };
  },
  methods: {
    pkt(e){
      this.packet = Number(e);
    },
    d2(e){
      this.dt2 =e
    },
    d3(e){
      this.dt3 =e
    },
    d4(e){
      this.dt4 =e
    },
    d5(e){
      this.dt5 =e
    },
    d6(e){
      this.dt6 =e
    },
    l(event) {
      this.L = event;
    },
    r(event) {
      this.R = event;
    },
    TQ() {
      this.sT = true;
      this.T = Math.round(parseInt(this.L) / (parseInt(this.R) * 125));
    },
    pr(event) {
      this.Pr = event;
    },
    q(e) {
      this.Q = e;
    },
    pck(e){
      this.packet = e;
    },
    dd() {
      let packetL = Math.floor(Math.random() * (this.packet * (0.4)));
      let arr = [];
      for (let i = 1; i <= this.packet; i++) {
        arr.push(i);
      }
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      let arr2 = [];
      if(packetL > 0){
        arr2 = arr.slice(0, packetL);
      }
      for (let i = 0; i < arr2.length; i++) {
        arr.splice(arr.indexOf(arr2[i]), 1);
      }
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (Number(arr[i]) > Number(arr[j])) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
        }
      }
      for (let i = 0; i < arr2.length; i++) {
        for (let j = i + 1; j < arr2.length; j++) {
          if (Number(arr2[i]) > Number(arr2[j])) {
            let temp = arr2[i];
            arr2[i] = arr2[j];
            arr2[j] = temp;
          }
        }
      }
      this.dpkt = arr;
      this.ddpkt = arr2;
      
      for (let i = 1; i <= this.packet; i++) {
        if((arr2.length > 0) && (arr2.includes(i))){
          gsap.registerPlugin(MotionPathPlugin);
          gsap.to(".prop"+i, {
            duration: 5,
            delay: i,
            motionPath: {
              path: "#path",
              autoRotate: false,
              align: "#path",
              ease: "power1.inOut",
              alignOrigin: [0.5, 0.5],
            },
          }).then(() => {
            gsap.registerPlugin(MotionPathPlugin);
            gsap.to(".prop"+i, {
              duration: 5,
              translateY: "200",
              opacity: 0,
            });
          });
        }
        else{
          gsap.registerPlugin(MotionPathPlugin);
          gsap.to(".prop"+i, {
            duration: 5,
            delay: i,
            motionPath: {
              path: "#path",
              autoRotate: false,
              align: "#path",
              ease: "power1.inOut",
              alignOrigin: [0.5, 0.5],
            },
          });
          gsap.to(".pprop", {
            duration:1,
            delay: this.packet,
            display: "block",
            opacity: 1
          })
        }
      }
      let del = []
      if(this.top2){
        let d2 = ((parseInt(this.dt2) / parseInt(this.S)) * 1000000)
        this.delay2 = (parseFloat(d2) + parseFloat(this.T)).toFixed(2)
        del.push(this.delay2)
      }
      if(this.top3){
        let d3 = ((parseInt(this.dt3) / parseInt(this.S)) * 1000000)
        this.delay3 = (parseFloat(d3) + parseFloat(this.T)).toFixed(2)
        del.push(this.delay3)
      }
      if(this.top4){
        let d4 = ((parseInt(this.dt4) / parseInt(this.S)) * 1000000)
        this.delay4 = (parseFloat(d4) + parseFloat(this.T)).toFixed(2)
        del.push(this.delay4)
      }
      if(this.top5){
        let d5 = ((parseInt(this.dt5) / parseInt(this.S)) * 1000000)
        this.delay5 = (parseFloat(d5) + parseFloat(this.T)).toFixed(2)
        del.push(this.delay5)
      }
      if(this.top6){
        let d6 = ((parseInt(this.dt6) / parseInt(this.S)) * 1000000)
        this.delay6 = (parseFloat(d6) + parseFloat(this.T)).toFixed(2)
        del.push(this.delay6)
      }
      this.Delay = (parseFloat(this.delay2)+parseFloat(this.delay3)+parseFloat(this.delay4)+parseFloat(this.delay5)+parseFloat(this.delay6) + parseFloat(this.Pr) + parseFloat(this.Q)).toFixed(2)
      let j = []
      for (let i=0;i <= del.length-1; i++){
        if(i <= del.length-2){
          j.push(Math.abs((parseFloat(del[i]) - parseFloat(del[i+1]))))
          this.Jitter+=j[i]
        }else{
          j.push(parseFloat(del[i]))
          this.Jitter+=j[i]
        }
      }
      // this.good = ((parseFloat(this.packet)-this.dpkt.length)/parseFloat(this.packet)).toFixed(2)
    },
    draw(){
      this.prop = true
      this.top2 ? this.svg = this.svg + "L150, 30 " : this.svg = this.svg
      this.top3 ? this.svg = this.svg + "L130, 150 " : this.svg = this.svg
      this.top4 ? this.svg = this.svg + "L290, 145 " : this.svg = this.svg
      this.top5 ? this.svg = this.svg + "L330, 50 " : this.svg = this.svg
      this.top6 ? this.svg = this.svg + "L450, 90 " : this.svg = this.svg
    },
  // Fuzzy Code +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getY(Jitter, X){
        this.y1 = 0; this.y2= 0;
        if(X >= Jitter[4]){
          X = Jitter[4];
        }else if(X <= Jitter[0]){
          X = Jitter[0];
        }
        for(let i = 0; i < Jitter.length-1 ; i++){
            if((i == 0) &&(X >= Jitter[0] && X <= Jitter[1])){
                this.y1 = this.findY(X, Jitter[0], 0, Jitter[1], 1)
                this.y2 = 0
                this.Lbl[0] = 0
                this.Lbl[1] = 0
                this.Lbl[2] = 0
            }
            if((i == Jitter.length - 2) && (X >= Jitter[Jitter.length-2] && X <= Jitter[Jitter.length-1])){
                this.y1 = this.findY(X, Jitter[Jitter.length-1], 0, Jitter[Jitter.length - 2], 1)
                this.y2 = 0
                this.Lbl[0] = 0
                this.Lbl[1] = 0
                this.Lbl[2] = 2
            }
            if(X >= Jitter[i+1] && X < Jitter[i+2]){
                this.y1 = this.findY(X, Jitter[i+1], 0, Jitter[i + 2], 1)
                this.y2 = this.findY(X, Jitter[i+1], 1, Jitter[i + 2], 0)
                if(i == 0){
                    this.Lbl[0] = 0
                    this.Lbl[1] = 1
                    this.Lbl[2] = 0
                }else if(i == 1){
                    this.Lbl[0] = 0
                    this.Lbl[1] = 1
                    this.Lbl[2] = 2
                }
            }
        }
        return this.Lbl
    },
    show(){
        // Jitter
        let Jitter = 0;
        Jitter = this.tringle(5, 0, 60)
        let j1 = 0; let j2 = 0;
        this.Js = this.getY(Jitter, parseFloat(this.Jitter))
        // E2EDelay
        let E2EDelay = 0;
        E2EDelay = this.tringle(5, 0, 150)
        let d1 = 0; let d2 = 0; let Ds = [];
        this.Ds = this.getY(E2EDelay, this.Delay, Ds)
        // Throughput
        let Throughput = 0;
        Throughput = this.tringle(5, 60, 0)
        let th1 = 0; let th2 = 0;
        this.Ts = this.getY(Throughput, (this.packet/this.Delay).toFixed(2))
        // Goodput
        let Goodput = 0;
        Goodput = this.tringle(5, 60, 0)
        let g1 = 0; let g2 = 0;
        this.Gs = this.getY(Goodput, (this.dpkt.length/this.Delay).toFixed(2))
        // PacketLoss
        // let PacketLoss = 0;
        // PacketLoss = this.tringle(5, 0, 60)
        // let pl1 = 0; let pl2 = 0;
        // this.Ps = this.getY(PacketLoss, this.Delay)

        let Sum = 0;
        for (let j = 0; j <= 2;j++){
            Sum += this.Js[j] + this.Ds[j] + this.Ts[j] + this.Gs[j]
        }
        if(Sum <= 3){
            this.Quality = "<span class='text-green-700'>Very Good</span>"
        }else if(Sum > 3 && Sum <= 6){
            this.Quality = "<span class='text-green-500'>Good</span>"
        }else if(Sum > 6 && Sum <= 9){
            this.Quality = "<span class='text-yellow-400'>Normal</span>"
        }else if(Sum > 9 && Sum <= 12){
            this.Quality = "<span class='text-red-400'>Bad</span>"
        }else if(Sum > 12 && Sum <= 15){
            this.Quality = "<span class='text-red-700'>Very Bad</span>"
        }
    },
    findY(X,x1,y1,x2,y2){
        return (X-x1)*(y2-y1)/(x2-x1)+y1
    },
    tringle(mem, min, max){
        let stp = 0;
        let arr = [];
        stp = (max-min)/(mem-1);
        for(let i=0;i<mem;i++){
            if(arr.length == 0){
                arr[0] = min;
            }else{
                arr[i] = arr[i-1]+stp;
            }
        }
        return arr;
    },
  },
};
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-center font-bold mt-10 -mb-10 text-2xl">
      Computer Network Measurement
    </h1>
    <div class="flex gap-x-3">
      <router-link class="text-lg text-white bg-teal-600 hover:text-yellow-200 hover:bg-teal-500 hover:px-4 transition-all duration-500 font-bold py-1 px-2" to="/">Home</router-link>
      <router-link class="text-lg text-white bg-teal-600 hover:text-yellow-200 hover:bg-teal-500 hover:px-4 transition-all duration-500 font-bold py-1 px-2" to="/nine">Nine</router-link>
      <router-link class="text-lg text-white bg-teal-600 hover:text-yellow-200 hover:bg-teal-500 hover:px-4 transition-all duration-500 font-bold py-1 px-2" to="/twelve">Twelve</router-link>
    </div>
    <main class="mt-14">
      <div class="ml-10 justify-center items-center h-full">
        <div class="relative bg-teal bg-opacity-60 rounded h-96">
          <div class="layer"></div>
          <div v-for="p in packet" :key="p">
            <div v-if="prop"
              :class="'prop'+p" class="w-5 h-6 rounded ring-2 ring-yellow-300 bg-red-500 absolute top-40 left-20"
            >
              <span class="absolute -left-3 top-5">Packet Prope</span>
            </div>
          </div>

          <!-- Lines +++++++++++++ -->
          <svgc :path="svg" />

          <label class="absolute t1 text-white font-bold">N1</label>
          <label class="absolute t2 text-white font-bold">N2</label>
          <label class="absolute t3 text-white font-bold">N3</label>
          <label class="absolute t5 text-white font-bold">N4</label>
          <label class="absolute t4 text-white font-bold">N5</label>
          <label class="absolute t6 text-white font-bold">N6</label>
          <!-- <label v-if="delay2" class="absolute dt2">{{delay2}} m/s</label>
          <label v-if="delay3" class="absolute dt3">{{delay3}} m/s</label>
          <label v-if="delay4" class="absolute dt5">{{delay4}} m/s</label>
          <label v-if="delay5" class="absolute dt4">{{delay5}} m/s</label>
          <label v-if="delay6" class="absolute dt6">{{delay6}} m/s</label> -->
          <img class="absolute top1 z-10" src="1.png" width="140" height="140" />
          <img class="absolute top2" src="1.png" width="140" height="140" />
          <img class="absolute top3" src="1.png" width="140" height="140" />
          <img class="absolute top4" src="1.png" width="140" height="140" />
          <img class="absolute top5" src="1.png" width="140" height="140" />
          <img class="absolute top6" src="1.png" width="140" height="140" />
          <!-- Electtric Icon ++++++++++++++ -->
          <!-- from 1 to Others -->
          <img v-if="dt2 && Delay" src="./2.png" class="absolute f1t2 animate-pulse" alt="" width="40" height="40">
          <img v-if="dt3 && Delay && !dt2" src="./2.png" class="absolute f1t3 animate-pulse" alt="" width="40" height="40">
          <img v-if="dt4 && Delay && !dt2 && !dt3" src="./2.png" class="absolute f1t4 animate-pulse" alt="" width="40" height="40">
          <img v-if="dt5 && Delay && !dt2 && !dt3 && !dt4" src="./2.png" class="absolute f1t5 animate-pulse" alt="" width="40" height="40">
          <img v-if="dt6 && Delay && !dt4 && !dt5 && !dt3 && !dt2" src="./2.png" class="absolute f1t6 animate-pulse" alt="" width="40" height="40">

          <!-- From 2 to others -->
          <img v-if="(dt2 && dt3) && Delay" src="./2.png" class="absolute f2t3 animate-pulse" alt="" width="40" height="40">
          <img v-if="(dt2 && dt4) && Delay && !dt3" src="./2.png" class="absolute f2t4 animate-pulse" alt="" width="40" height="40">
          <img v-if="(dt2 && dt5) && Delay && !dt3 && !dt4" src="./2.png" class="absolute f2t5 animate-pulse" alt="" width="40" height="40">
          <img v-if="(dt2 && dt6) && Delay && !dt3 && !dt4 && !dt5" src="./2.png" class="absolute f2t6 animate-pulse" alt="" width="40" height="40">

          <!-- From 3 to others -->
          <img v-if="(dt3 && dt4) && Delay" src="./2.png" class="absolute f3t4 animate-pulse" alt="" width="40" height="40">
          <img v-if="(dt3 && dt5) && Delay && !dt4" src="./2.png" class="absolute f3t5 animate-pulse" alt="" width="40" height="40">
          <img v-if="(dt3 && dt6) && Delay && !dt4 && !dt5" src="./2.png" class="absolute f3t6 animate-pulse" alt="" width="40" height="40">

          <!-- From 4 to others -->
          <img v-if="(dt4 && dt5) && Delay" src="./2.png" class="absolute f4t5 animate-pulse" alt="" width="40" height="40">
          <img v-if="(dt4 && dt6) && Delay && !dt5" src="./2.png" class="absolute f4t6 animate-pulse" alt="" width="40" height="40">

          <!-- From 5 to others -->
          <img v-if="(dt5 && dt6) && Delay" src="./2.png" class="absolute f5t6 animate-pulse" alt="" width="40" height="40">
        </div>
      </div>
    </main>

    <header class="mt-5">
      <div class="pprop hidden text-2xl bg-slate-100 rounded-md px-4 py-1 w-1/2 mx-auto border-2 shadow-lg">
        <p>Quality of Service: <span class="font-bold" v-html="Quality"></span></p>
      </div>
      <div class="flex flex-col justify-center items-center">
          <div class="pprop hidden relative mt-3 overflow-x-auto shadow-md sm:rounded-lg">
            <h1 class="font-bold text-center text-2xl mb-3">Measurements</h1>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th colspan="1" scope="col" class="px-2 py-3 text-center text-white">
                  Node
                </th>
                <th scope="col" colspan="3" class="px-2 py-3 text-center text-white">
                  Delay
                </th>
                <!-- <th scope="col" colspan="1" class="px-2 py-3 text-center text-white">
                  Jitter
                </th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-if="top2" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N2
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay2)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j2}}
                </td> -->
              </tr>
              <tr v-if="top3" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="1" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N3
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay3)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j3}}
                </td> -->
              </tr>
              <tr v-if="top4" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="1" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N4
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay4)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j4}}
                </td> -->
              </tr>
              <tr v-if="top5" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="1" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N5
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay5)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j5}}
                </td> -->
              </tr>
              <tr v-if="top6" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="1" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N6
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay6)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j6}}
                </td> -->
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  End to End Delay
                </th>
                <td class="px-6 py-4 text-center">
                  {{((Delay))}} m/s 
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  Jitter
                </th>
                <td class="px-6 py-4 text-center">
                  {{Jitter}} m/s 
                </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  Throughput
                </th> 
                <td class="px-6 py-4 text-center">
                  {{(packet/Delay).toFixed(2)}} m/s
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  Goodput
                </th>
                <td class="px-6 py-4 text-center">
                  {{(dpkt.length/Delay).toFixed(2)}} m/s
                </td>
              </tr>
            </tbody>
            </table>
          </div>
        <button
          @click="dd(); show()"
          class="mt-3 text-white z-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-1/2 mx-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 select-none cursor-pointer"
        >
          RUN
        </button>

        <div class="flex space-x-10 mt-3 items-center">
          <label>Packets</label>
          <Input namee="packet" @value="pkt"></Input>
          <button @click="draw" class="bg-blue-700 ring-4 text-white px-10 h-10 rounded-lg">Draw</button>
        </div>

        <div v-if="Delay" class="flex flex-col space-y-3 w-full px-16 border-2 p-2 my-3">
            <label class="font-semibold">Delivered Packets</label>
            <div class="flex bg-gray-200 px-3 py-2 justify-center rounded-md text-lg"><label for="">{{dpkt.length}}</label> <span v-if="dpkt.length > 0">-{{dpkt}}</span></div>
            <label class="font-semibold">Dropped Packets</label>
            <div class="flex bg-gray-200 px-3 py-2 justify-center rounded-md text-lg"><label for="">{{ddpkt.length}}</label> <span v-if="dpkt.length > 0">-{{ddpkt}}</span></div>
        </div>

        <div class="flex gap-x-8 justify-center items-center my-3 bg-gray-300 px-3 py-2 rounded-lg">
          <div class="rounded-md p-2 space-x-3">
            <input @click="top2 ? top2 = false : top2 = true" type="checkbox" name="top2" id="top2">
            <label for="top2">N2</label>
            <div v-if="top2">
              <Input label="Distance" namee="Distance2" @value="d2" :disabled="!top2"></Input>
            </div>
          </div>  
          <div class=" rounded-md p-2 space-x-3">
            <input @click="top3 ? top3 = false : top3 = true" type="checkbox" name="top3" id="top3">
            <label for="top3">N3</label>
            <div v-if="top3">
              <Input label="Distance" namee="Distance3" @value="d3" :disabled="!top3"></Input>
            </div>
          </div>
          <div class=" rounded-md p-2 space-x-3">
            <input @click="top4 ? top4 = false : top4 = true" type="checkbox" name="top4" id="top4">
            <label for="top4">N4</label>
            <div v-if="top4">
              <Input label="Distance" namee="Distance4" @value="d4" :disabled="!top4"></Input>
            </div>
          </div>
          <div class=" rounded-md p-2 space-x-3">
            <input @click="top5 ? top5 = false : top5 = true" type="checkbox" name="top5" id="top5">
            <label for="top5">N5</label>
            <div v-if="top5">
              <Input label="Distance" namee="Distance5" @value="d5" :disabled="!top5"></Input>
            </div>
          </div>
          <div class=" rounded-md p-2 space-x-3">
            <input @click="top6 ? top6 = false : top6 = true" type="checkbox" name="top6" id="top6">
            <label for="top6">N6</label>
            <div v-if="top6">
              <Input label="Distance" namee="Distance6" @value="d6" :disabled="!top6"></Input>
            </div>
          </div>
        </div>

        <form class="flex justify-center gap-8 w-full">
          <div class="rounded-lg border-2 p-3 my-3 w-1/5">
            <p class="font-bold text-center mb-2 -mt-3">Transmission Delay</p>
            <Input name="L" label="L (Length of Packet)" @value="l" />
            <Input name="R" label="R (Transmission Speed)" @value="r" />
            <Input name="T" label="T" :disabled="true" :value="T" />
            <p
              @click="TQ()"
              class="text-white select-none cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Transmission
            </p>
          </div>

          <div class="rounded-lg border-2 p-3 my-3 w-1/5">
            <p class="font-bold text-center mb-2 -mt-3">Queuing Delay</p>
            <Input name="Queuing" label="Queuing Delay" @value="q" :value="Q" />
          </div>

          <div class="rounded-lg border-2 p-3 my-3 w-1/5">
            <p class="font-bold text-center mb-2 -mt-3">Processing Delay</p>
            <Input name="Pr" label="Process Delay" @value="pr" :value="Pr" />
          </div>
        </form>

      </div>
    </header>
  </div>
</template>

<style scoped>
  .f5t6{
    top: 134px;
    left: 870px;
  }
  .f4t6{
    top: 204px;
    left: 870px;
  }
  .f4t5{
    top: 200px;
    left: 670px;
  }
  .f3t6{
    top: 224px;
    left: 680px;
  }
  .f3t5{
    top: 190px;
    left: 510px;
  }
  .f3t4{
    top: 290px;
    left: 500px;
  }
  .f2t6{
    top: 80px;
    left: 530px;
  }
  .f2t5{
    top: 60px;
    left: 510px;
  }
  .f2t4{
    top: 180px;
    left: 510px;
  }
  .f2t3{
    top: 180px;
    left: 316px;
  }
  .f1t2{
    top: 97px;
    left: 190px;
  }
  .f1t3{
    top: 223px;
    left: 180px;
  }
  .f1t4{
    top: 210px;
    left: 300px;
  }
  .f1t5{
    top: 114px;
    left: 390px;
  }
  .f1t6{
    top: 160px;
    left: 490px;
  }


  #app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;

    font-weight: normal;
  }

  .top1 {
    top: 100px;
  }
  .t1{
    top: 110px;
    left: 60px
  }
  .top2 {
    left: 300px;
  }
  .t2{
    top:10px;
    left: 360px;
  }
  .top3 {
    top: 250px;
    left: 250px;
  }
  .t3{
    top: 340px;
    left: 310px;
  }
  .top4 {
    top: 50px;
    left: 650px;
  }
  .t4{
    top: 60px;
    left: 710px;
  }
  .top5 {
    top: 240px;
    left: 600px;
  }
  .t5{
    top: 330px;
    left: 660px;
  }
  .top6 {
    top: 130px;
    left: 950px;
  }
  .t6{
    top: 140px;
    left: 1010px;
  }
  .dt2{
    top: 50px;
    left: 260px
  }
  .dt3{
    top: 300px;
    left: 230px
  }
  .dt3e{
    top: 180px;
    left: 317px;
  }
  .dt4{
    top: 80px;
    left: 620px
  }
  .dt4e{
    top: 290px;
    left: 480px;
  }
  .dt5{
    top: 280px;
    left: 570px
  }
  .dt5e{
    top: 182px;
    left: 678px;
  }
  .dt6{
    top: 180px;
    left: 900px
  }
  .dt6e{
    top: 126px;
    left: 840px;
  }
  .l1i1 {
    top: 145px;
    left: 100px;
    transform: rotate(60deg);
  }

  .bg-teal{
    background: url('bg.jpg') no-repeat center center fixed;
    background-size: cover;
    position: relative;
  }

  .layer {
    background-color: rgba(112, 112, 112, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
