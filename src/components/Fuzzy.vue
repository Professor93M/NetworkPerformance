<script>
import Input from "./Input.vue";
export default {
    components: {
        Input
    },
    methods: {
        getX(e){
            this.X =e
        },
        show(){
            // Jitter
            let Jitter = 0;
            Jitter = this.tringle(5, 0, 60)
            let j1 = 0; let j2 = 0; let Js = [];
            [j1, j2] = this.getY(Jitter, 40, Js)
            console.log("Jitter = " + j1.toFixed(2),j2.toFixed(2), Js)
            // E2EDelay
            let E2EDelay = 0;
            E2EDelay = this.tringle(5, 0, 60)
            let d1 = 0; let d2 = 0; let Ds = [];
            [d1, d2] = this.getY(E2EDelay, 40, Ds)
            console.log("E2EDelay = " + d1.toFixed(2),d2.toFixed(2), Ds)
            // Throughput
            let Throughput = 0;
            Throughput = this.tringle(5, 0, 60)
            let th1 = 0; let th2 = 0; let Ts = [];
            [th1, th2] = this.getY(Throughput, 40, Ts)
            console.log("Throughput = " + th1.toFixed(2),th2.toFixed(2), Ts)
            // Goodput
            let Goodput = 0;
            Goodput = this.tringle(5, 0, 60)
            let g1 = 0; let g2 = 0; let Gs = [];
            [g1, g2] = this.getY(Goodput, 40, Gs)
            console.log("Goodput = " + g1.toFixed(2),g2.toFixed(2), Gs)
            // PacketLoss
            let PacketLoss = 0;
            PacketLoss = this.tringle(5, 0, 60)
            let pl1 = 0; let pl2 = 0; let Ps = [];
            [pl1, pl2] = this.getY(PacketLoss, 40, Ps)
            console.log("PacketLoss = " + pl1.toFixed(2),pl2.toFixed(2), Ps)
            let Sum = 0;
            for (let j = 0; j <= 2;j++){
                Sum += Js[j] + Ds[j] + Ts[j] + Gs[j] + Ps[j]
            }
            if(Sum <= 3){
                this.X = "Quality of Services: (Very Good)"
            }else if(Sum > 3 && Sum <= 6){
                this.X = "Quality of Services: (Good)"
            }else if(Sum > 6 && Sum <= 9){
                this.X = "Quality of Services: (Normal)"
            }else if(Sum > 9 && Sum <= 12){
                this.X = "Quality of Services: (Bad)"
            }else if(Sum > 12 && Sum <= 15){
                this.X = "Quality of Services: (Very Bad)"
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
        getY(Jitter, X, Lbl){
            let y1 = 0; let y2= 0;
            // let Lbl = [];
            for(let i = 0; i < Jitter.length-1 ; i++){
                if((i == 0) &&(X >= Jitter[0] && X <= Jitter[1])){
                    y1 = this.findY(X, Jitter[0], 0, Jitter[1], 1)
                    y2 = 0
                    Lbl[0] = 0
                    Lbl[1] = 0
                    Lbl[2] = 0
                }
                if((i == Jitter.length - 2) && (X >= Jitter[Jitter.length-2] && X <= Jitter[Jitter.length-1])){
                    y1 = this.findY(X, Jitter[Jitter.length-1], 0, Jitter[Jitter.length - 2], 1)
                    y2 = 0
                    Lbl[0] = 0
                    Lbl[1] = 0
                    Lbl[2] = 2
                }
                if(X >= Jitter[i+1] && X < Jitter[i+2]){
                    y1 = this.findY(X, Jitter[i+1], 0, Jitter[i + 2], 1)
                    y2 = this.findY(X, Jitter[i+1], 1, Jitter[i + 2], 0)
                    if(i == 0){
                        Lbl[0] = 0
                        Lbl[1] = 1
                        Lbl[2] = 0
                    }else if(i == 1){
                        Lbl[0] = 0
                        Lbl[1] = 1
                        Lbl[2] = 2
                    }
                }
            }
            return [y1, y2];
        }
    },
    data(){
        return{
            X: "",
        }
    }
}
</script>
<template>
    <h1>Hello</h1>
    <Input name="X" label="X" @value="getX" :value="X" />
    <button @click="show">Show</button>
    <label class="text-xl block">{{X}}</label>
</template>



<!-- getY(Jitter, X, Lbl){
            let y1 = 0; let y2= 0;
            // let Lbl = [];
            for(let i = 0; i < Jitter.length-1 ; i++){
                if((i == 0) &&(X >= Jitter[0] && X <= Jitter[1])){
                    y1 = this.findY(X, Jitter[0], 0, Jitter[1], 1)
                    y2 = 0
                    Lbl[0] = y1
                    Lbl[1] = 0
                    Lbl[2] = 0
                }
                if((i == Jitter.length - 2) && (X >= Jitter[Jitter.length-2] && X <= Jitter[Jitter.length-1])){
                    y1 = this.findY(X, Jitter[Jitter.length-1], 0, Jitter[Jitter.length - 2], 1)
                    y2 = 0
                    Lbl[0] = 0
                    Lbl[1] = 0
                    Lbl[2] = y1
                }
                if(X >= Jitter[i+1] && X < Jitter[i+2]){
                    y1 = this.findY(X, Jitter[i+1], 0, Jitter[i + 2], 1)
                    y2 = this.findY(X, Jitter[i+1], 1, Jitter[i + 2], 0)
                    if(i == 0){
                        Lbl[0] = y1
                        Lbl[1] = y2
                        Lbl[2] = 0
                    }else if(i == 1){
                        Lbl[0] = 0
                        Lbl[1] = y1
                        Lbl[2] = y2
                    }
                }
            }
            return [y1, y2];
        } -->