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
      top7: false,
      top8: false,
      top9: false,
      top10: false,
      top11: false,
      top12: false,

      sT: false,
      sP: false,

      dt2 : 0,
      dt3 : 0,
      dt4 : 0,
      dt5 : 0,
      dt6 : 0,
      dt7 : 0,
      dt8 : 0,
      dt9 : 0,
      dt10 : 0,
      dt11 : 0,
      dt12 : 0,

      delay2: 0,
      delay3: 0,
      delay4: 0,
      delay5: 0,
      delay6: 0,
      delay7: 0,
      delay8: 0,
      delay9: 0,
      delay10: 0,
      delay11: 0,
      delay12: 0,

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
      svg: "M10, 76 ",
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
    d7(e){
      this.dt7 =e
    },
    d8(e){
      this.dt8 =e
    },
    d9(e){
      this.dt9 =e
    },
    d10(e){
      this.dt10 =e
    },
    d11(e){
      this.dt11 =e
    },
    d12(e){
      this.dt12 =e
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
        this.delay2 = (parseFloat(d2) + parseFloat(this.T))
        del.push(this.delay2)
      }
      if(this.top3){
        let d3 = ((parseInt(this.dt3) / parseInt(this.S)) * 1000000)
        this.delay3 = (parseFloat(d3) + parseFloat(this.T))
        del.push(this.delay3)
      }
      if(this.top4){
        let d4 = ((parseInt(this.dt4) / parseInt(this.S)) * 1000000)
        this.delay4 = (parseFloat(d4) + parseFloat(this.T))
        del.push(this.delay4)
      }
      if(this.top5){
        let d5 = ((parseInt(this.dt5) / parseInt(this.S)) * 1000000)
        this.delay5 = (parseFloat(d5) + parseFloat(this.T))
        del.push(this.delay5)
      }
      if(this.top6){
        let d6 = ((parseInt(this.dt6) / parseInt(this.S)) * 1000000)
        this.delay6 = (parseFloat(d6) + parseFloat(this.T))
        del.push(this.delay6)
      }
      if(this.top7){
        let d7 = ((parseInt(this.dt7) / parseInt(this.S)) * 1000000)
        this.delay7 = (parseFloat(d7) + parseFloat(this.T))
        del.push(this.delay7)
      }
      if(this.top8){
        let d8 = ((parseInt(this.dt8) / parseInt(this.S)) * 1000000)
        this.delay8 = (parseFloat(d8) + parseFloat(this.T))
        del.push(this.delay8)
      }
      if(this.top9){
        let d9 = ((parseInt(this.dt9) / parseInt(this.S)) * 1000000)
        this.delay9 = (parseFloat(d9) + parseFloat(this.T))
        del.push(this.delay9)
      }
      if(this.top10){
        let d10 = ((parseInt(this.dt10) / parseInt(this.S)) * 1000000)
        this.delay10 = (parseFloat(d10) + parseFloat(this.T))
        del.push(this.delay10)
      }
      if(this.top11){
        let d11 = ((parseInt(this.dt11) / parseInt(this.S)) * 1000000)
        this.delay11 = (parseFloat(d11) + parseFloat(this.T))
        del.push(this.delay11)
      }
      if(this.top12){
        let d12 = ((parseInt(this.dt12) / parseInt(this.S)) * 1000000)
        this.delay12 = (parseFloat(d12) + parseFloat(this.T))
        del.push(this.delay12)
      }
      this.Delay = (parseFloat(this.delay2)+parseFloat(this.delay3)+parseFloat(this.delay4)+parseFloat(this.delay5)+parseFloat(this.delay6)+parseFloat(this.delay7)+parseFloat(this.delay8)+parseFloat(this.delay9)+parseFloat(this.delay10)+parseFloat(this.delay11)+parseFloat(this.delay12) + parseFloat(this.Pr) + parseFloat(this.Q)).toFixed(2)
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
      this.top2 ? this.svg = this.svg + "L90 30 " : this.svg = this.svg
      this.top3 ? this.svg = this.svg + "L80 140 " : this.svg = this.svg
      this.top4 ? this.svg = this.svg + "L130 90 " : this.svg = this.svg
      this.top5 ? this.svg = this.svg + "L218 135 " : this.svg = this.svg
      this.top6 ? this.svg = this.svg + "L220 30 " : this.svg = this.svg
      this.top7 ? this.svg = this.svg + "L275 90 " : this.svg = this.svg
      this.top8 ? this.svg = this.svg + "L337 33 " : this.svg = this.svg
      this.top9 ? this.svg = this.svg + "L350 163 " : this.svg = this.svg
      this.top10 ? this.svg = this.svg + "L420 110 " : this.svg = this.svg
      this.top11 ? this.svg = this.svg + "L474 37 " : this.svg = this.svg
      this.top12 ? this.svg = this.svg + "L500 160 " : this.svg = this.svg
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
      <router-link class="text-lg text-white bg-teal-600 hover:text-yellow-200 hover:bg-teal-500 hover:px-4 transition-all duration-500 font-bold py-1 px-2" to="/six">Six</router-link>
      <router-link class="text-lg text-white bg-teal-600 hover:text-yellow-200 hover:bg-teal-500 hover:px-4 transition-all duration-500 font-bold py-1 px-2" to="/nine">Nine</router-link>
    </div>
    <main class="mt-14">
      <div class="ml-10 justify-center items-center h-full">
        <div class="relative bg-teal bg-opacity-60 rounded h-96">
          <div class="layer"></div>
          <div v-for="p in packet" :key="p">
            <div v-if="prop"
              :class="'prop'+p" class="w-5 h-6 rounded ring-2 ring-yellow-300 bg-red-500 absolute top-44 left-10"
            >
              <span class="absolute -left-3 top-5">Packet Probe</span>
            </div>
          </div>
            

          <!-- Lines +++++++++++++ -->
          <svgc :path="svg" />

          <label class="absolute t1 text-white font-bold">N1</label>
          <label class="absolute t2 text-white font-bold">N2</label>
          <label class="absolute t3 text-white font-bold">N3</label>
          <label class="absolute t4 text-white font-bold">N4</label>
          <label class="absolute t5 text-white font-bold">N5</label>
          <label class="absolute t6 text-white font-bold">N6</label>
          <label class="absolute t7 text-white font-bold">N7</label>
          <label class="absolute t8 text-white font-bold">N8</label>
          <label class="absolute t9 text-white font-bold">N9</label>
          <label class="absolute t10 text-white font-bold">N10</label>
          <label class="absolute t11 text-white font-bold">N11</label>
          <label class="absolute t12 text-white font-bold">N12</label>
          <label v-if="delay2" class="absolute dt2">{{delay2}} m/s</label>
          <label v-if="delay3" class="absolute dt3">{{delay3}} m/s</label>
          <label v-if="delay4" class="absolute dt5">{{delay4}} m/s</label>
          <label v-if="delay5" class="absolute dt4">{{delay5}} m/s</label>
          <label v-if="delay6" class="absolute dt6">{{delay6}} m/s</label>
          <label v-if="delay7" class="absolute dt7">{{delay7}} m/s</label>
          <label v-if="delay8" class="absolute dt8">{{delay8}} m/s</label>
          <label v-if="delay9" class="absolute dt9">{{delay9}} m/s</label>
          <label v-if="delay10" class="absolute dt10">{{delay10}} m/s</label>
          <label v-if="delay11" class="absolute dt11">{{delay11}} m/s</label>
          <label v-if="delay12" class="absolute dt12">{{delay12}} m/s</label>
          <img class="absolute top1 z-10" src="1.png" width="110" height="110" />
          <img class="absolute top2" src="1.png" width="110" height="110" />
          <img class="absolute top3" src="1.png" width="110" height="110" />
          <img class="absolute top4" src="1.png" width="110" height="110" />
          <img class="absolute top5" src="1.png" width="110" height="110" />
          <img class="absolute top6" src="1.png" width="110" height="110" />
          <img class="absolute top7" src="1.png" width="110" height="110" />
          <img class="absolute top8" src="1.png" width="110" height="110" />
          <img class="absolute top9" src="1.png" width="110" height="110" />
          <img class="absolute top10" src="1.png" width="110" height="110" />
          <img class="absolute top11" src="1.png" width="110" height="110" />
          <img class="absolute top12" src="1.png" width="110" height="110" />
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
              <tr v-if="top7" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="1" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N7
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay7)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j7}}
                </td> -->
              </tr>
              <tr v-if="top7" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="1" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N7
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay7)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j7}}
                </td> -->
              </tr>
              <tr v-if="top8" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="1" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N8
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay8)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j8}}
                </td> -->
              </tr>
              <tr v-if="top9" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="1" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N9
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay9)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j9}}
                </td> -->
              </tr>
              <tr v-if="top10" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="1" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N10
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay10)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j10}}
                </td> -->
              </tr>
              <tr v-if="top11" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="1" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N11
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay11)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j11}}
                </td> -->
              </tr>
              <tr v-if="top12" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="1" class="text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  N12
                </th>
                <td colspan="4" class="px-6 py-4 text-center">
                  {{(delay12)}}
                </td>
                <!-- <td colspan="4" class="px-6 py-4 text-center">
                  {{j12}}
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

        <div class=" bg-gray-300 px-3 py-2 rounded-lg">
          <div class="flex gap-x-8 justify-center items-center my-3">
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
          <div class="flex gap-x-8 justify-center items-center my-3">
            <div class=" rounded-md p-2 space-x-3">
              <input @click="top7 ? top7 = false : top7 = true" type="checkbox" name="top7" id="top7">
              <label for="top7">N7</label>
              <div v-if="top7">
                <Input label="Distance" namee="Distance7" @value="d7" :disabled="!top7"></Input>
              </div>
            </div>
            <div class=" rounded-md p-2 space-x-3">
              <input @click="top8 ? top8 = false : top8 = true" type="checkbox" name="top8" id="top8">
              <label for="top8">N8</label>
              <div v-if="top8">
                <Input label="Distance" namee="Distance8" @value="d8" :disabled="!top8"></Input>
              </div>
            </div>
            <div class=" rounded-md p-2 space-x-3">
              <input @click="top9 ? top9 = false : top9 = true" type="checkbox" name="top9" id="top9">
              <label for="top9">N9</label>
              <div v-if="top9">
                <Input label="Distance" namee="Distance9" @value="d9" :disabled="!top9"></Input>
              </div>
            </div>
            <div class=" rounded-md p-2 space-x-3">
              <input @click="top10 ? top10 = false : top10 = true" type="checkbox" name="top10" id="top10">
              <label for="top10">N10</label>
              <div v-if="top10">
                <Input label="Distance" namee="Distance10" @value="d10" :disabled="!top10"></Input>
              </div>
            </div>
            <div class=" rounded-md p-2 space-x-3">
              <input @click="top11 ? top11 = false : top11 = true" type="checkbox" name="top11" id="top11">
              <label for="top11">N11</label>
              <div v-if="top11">
                <Input label="Distance" namee="Distance11" @value="d11" :disabled="!top11"></Input>
              </div>
            </div>
            <div class=" rounded-md p-2 space-x-3">
              <input @click="top12 ? top12 = false : top12 = true" type="checkbox" name="top12" id="top12">
              <label for="top12">N12</label>
              <div v-if="top12">
                <Input label="Distance" namee="Distance12" @value="d12" :disabled="!top12"></Input>
              </div>
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

<style >
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
    left: 45px
  }
  .top2 {
    left: 180px;
  }
  .t2{
    top:10px;
    left: 230px;
  }
  .top3 {
    top: 250px;
    left: 150px;
  }
  .t3{
    top: 330px;
    left: 190px;
  }
  .top4 {
    top: 130px;
    left: 270px;
  }
  .t4{
    top: 200px;
    left: 310px;
  }
  .top5 {
    top: 240px;
    left: 450px;
  }
  .t5{
    top: 310px;
    left: 490px;
  }
  .top6 {
    top: 10px;
    left: 450px;
  }
  .t6{
    top: 25px;
    left: 490px;
  }
  .top7 {
    top: 140px;
    left: 570px;
  }
  .t7{
    top: 150px;
    left: 610px;
  }
  .top8 {
    top: 10px;
    left: 700px;
  }
  .t8{
    top: 15px;
    left: 740px;
  }
  .top9 {
    top: 300px;
    left: 730px;
  }
  .t9{
    top: 363px;
    left: 770px;
  }
  .top10 {
    top: 180px;
    left: 870px;
  }
  .t10{
    top: 189px;
    left: 900px;
  }
  .top11 {
    top: 20px;
    left: 990px;
  }
  .t11{
    top: 30px;
    left: 1020px;
  }
  .top12 {
    top: 280px;
    left: 1050px;
  }
  .t12{
    top: 350px;
    left: 1090px;
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
