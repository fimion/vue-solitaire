<script setup>
import { onMounted, onUpdated, ref, nextTick } from "vue";

defineOptions({
  name: "VerticalSpread",
});

const spreadContainer = ref(null);

function addSpread() {
  let spread = 1;
  if (!spreadContainer.value) return;
  spreadContainer.value.childNodes.forEach((e) => {
    if (e.style) {
      e.style.gridRow = `${spread}/${spread + 8}`;
      spread++;
      if (e.classList.contains("face-up") && spread > 1) spread++;
    }
  });
}

onMounted(() => {
  nextTick(addSpread);
});

onUpdated(() => {
  nextTick(addSpread);
});
</script>

<template>
  <div ref="spreadContainer" :class="$style['vertical-spread']">
    <slot />
  </div>
</template>

<style module>
.vertical-spread {
  display: grid;
  grid-auto-rows: calc(var(--card-height) / 8);
}

@media screen and (min-width: 768px) {
  .vertical-spread {
    grid-auto-rows: 19px;
  }
}

.vertical-spread > *:global {
  grid-column: 1;
  grid-row-end: span 8;
  z-index: 1;
}
</style>
