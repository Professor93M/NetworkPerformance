<template>
    <svg id="motionPath" class="absolute" viewBox="-20 0 557 190">
        <path
            id="path"
            fill="none"
            style="stroke: #ccc; stroke-width: 0.5"
            :d="path"
        />
        <!-- <image class="" href="../2.png"  width="20" height="20" /> -->
    </svg>
</template>

<script>
export default {
  props: ['path'],
};
</script>
