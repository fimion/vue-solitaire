<script setup vapor lang="ts">
import { useTemplateRef, onMounted, onUpdated, nextTick, watch } from "vue";

defineOptions({
  name: "VerticalSpread",
});

const spreadContainer = useTemplateRef<HTMLDivElement>("spread");

function addSpread() {
  let spread = 1;
  if (!spreadContainer.value) return;
  if(spreadContainer.value.children && spreadContainer.value.children.length === 0) {
    return setTimeout(addSpread, 0);
  }
  Array.from(spreadContainer.value.children).forEach((e: HTMLElement) => {
    if (e.style) {
      e.style.gridRow = `${spread}/${spread + 8}`;
      spread++;
      if (e.classList.contains("face-up") && spread > 1) spread++;
    }
  });
}
onUpdated(() => {
  nextTick(addSpread);
})
watch(spreadContainer, ()=>nextTick(addSpread));
</script>

<template>
  <div ref="spread" class="vertical-spread">
    <slot />
  </div>
</template>

<style scoped>
.vertical-spread {
  display: grid;
  grid-auto-rows: calc(var(--card-height) / 8);
}

@media screen and (min-width: 768px) {
  .vertical-spread {
    grid-auto-rows: 19px;
  }
}

.vertical-spread:deep( > *) {
  grid-column: 1;
  grid-row-start: span 1;
  grid-row-end: span 8;
  z-index: 1;
}
</style>
