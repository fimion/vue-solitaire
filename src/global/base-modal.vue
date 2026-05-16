<script vapor lang="ts">
import {useId, useTemplateRef} from "vue";
import {watchOnce} from "@vueuse/core";
defineOptions({
  name: "BaseModal",
})
interface Props {
  hideCancel?: boolean;
  defaultOpen?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  close: [string],
}>()

const dialogId = "dialog-" + useId();

function handleDialogEvents(e: Event & {target: HTMLDialogElement}) {
  if(e.type === "close") {
    emit("close", e.target.returnValue ?? "");
  }
}

const dialogEl = useTemplateRef<HTMLDialogElement>("dialog");

defineExpose({
  dialog: dialogEl,
  dialogId: dialogId,
})

watchOnce(dialogEl, ()=>{
  if (props.defaultOpen) {
    dialogEl.value.showModal();
  }
})
</script>
<template>
  <slot name="activator" :commandfor="dialogId" :command="'show-modal'" >
    <button type="button" :commandfor="dialogId" command="show-modal">
      <slot name="activator-text">Open Modal</slot>
    </button>
  </slot>
  <dialog :id="dialogId" ref="dialog" @close="handleDialogEvents">
    <form v-if="!props.hideCancel" method="dialog" class="cancel-form"><button aria-label="Close modal" value="cancel" class="cancel-btn">X</button></form>
    <div>
      <slot></slot>
    </div>
  </dialog>
</template>

<style scoped>
dialog{
  margin: auto;
  padding: 2rem;
  min-height: 30vh;
  max-width: 80vw;
  min-width: 50vw;
  border-radius: 8px;
  box-shadow: var(--box-height-5);
  background-color: var(--color-white);
  color: var(--color-black);
  place-content: center;
}
dialog:open{
  display: grid;
}

button, :deep(button){
  padding: 5px;
  margin-right: 5px;
  background-color: var(--color-btn);
  border-color: var(--color-btn-border);
}

.cancel-form {
  position: absolute;
  inset-inline-end: 0;
  inset-block-start: 0;
  padding:0.5rem;
}
.cancel-btn {
  display: grid;
  place-items: center;
  box-sizing: border-box;
  aspect-ratio: 1;
  padding:0;
  width: 2em;
  height: 2em;
  background: none;
  border: 1px solid var(--color-black);
  border-radius: 50%;
}

dialog::backdrop{
  background-color: rgba(0, 0, 0, 0.5);
  margin: auto;
  padding: revert;
}
</style>
