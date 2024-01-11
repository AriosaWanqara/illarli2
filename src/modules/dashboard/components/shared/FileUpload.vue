<script setup lang="ts">
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";
import vueFilePond from "vue-filepond";
import { ref } from "vue";

import { PinturaEditorModal } from "@pqina/vue-pintura";
import { getEditorDefaults } from "@pqina/pintura";

// Import Pintura styles
import "@pqina/pintura/pintura.css";

interface props {
  files: any[];
  imagePreviewHeight: number;
  imgName: string | null;
  labelTemplate: string;
  aspectFatio: number;
  isCorpCircular: boolean;
}

const props = defineProps<props>();
const emits = defineEmits(["load-base64"]);
const pond = ref();
const FilePond = vueFilePond(
  FilePondPluginFilePoster,
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);
const uploadBlob = ref();
const showEditor = ref(false);

const server = {
  load: (
    source: any,
    load: any,
    error: any,
    progress: any,
    abort: any,
    headers: any
  ) => {
    var myRequest = new Request(source);
    fetch(myRequest)
      .then(function (response) {
        response.blob().then(function (myBlob) {
          load(myBlob);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const willRenderCanvas = (shapes: any, state: any) => {
  const { utilVisibility, selectionRect, lineColor, backgroundColor } = state;

  // Exit if crop utils is not visible
  if (utilVisibility.crop <= 0) return shapes;

  // Get variable shortcuts to the crop selection rect
  const { x, y, width, height } = selectionRect;

  return {
    // Copy all props from current shapes
    ...shapes,

    // Now we add an inverted ellipse shape to the interface shapes array
    interfaceShapes: [
      {
        x: x + width * 0.5,
        y: y + height * 0.5,
        rx: width * 0.5,
        ry: height * 0.5,
        opacity: utilVisibility.crop,
        inverted: true,
        backgroundColor: [...backgroundColor, 0.5],
        strokeWidth: 1,
        strokeColor: [...lineColor],
      },
      // Spread all existing interface shapes onto the array
      ...shapes.interfaceShapes,
    ],
  };
};

const handleLoad = async (event: any) => {
  if (event.length > 0) {
    const file = event[0].file;
    const reader = new FileReader();
    if (file.name != props.imgName) {
      let blob = await fetch(file.objectURL).then((r) => r.blob());
      uploadBlob.value = file;
      showEditor.value = true;
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        // emits("load-base64", base64data);
      };
    }
  } else {
    uploadBlob.value = null;
    emits("load-base64", null);
  }
};

const edit = getEditorDefaults();

const handleProcess = (event: any) => {
  converBase64(event.detail.dest);
};

async function converBase64(newFile: any) {
  const reader = new FileReader();
  let blob = await fetch(newFile.objectURL).then((r) => r.blob());

  pond.value.removeFile(uploadBlob.value);
  pond.value.addFile(newFile);

  reader.readAsDataURL(blob);
  reader.onloadend = function () {
    const base64data = reader.result;
    emits("load-base64", base64data);
  };
}

const onReOpenEditor = () => {
  if (uploadBlob.value) {
    showEditor.value = true;
  }
};
</script>

<template>
  <div class="">
    <file-pond
      ref="pond"
      :filePosterHeight="imagePreviewHeight"
      :imagePreviewHeight="imagePreviewHeight"
      :credits="''"
      class="custome"
      @click="onReOpenEditor"
      :server="server"
      :files="files"
      :label-idle="props.labelTemplate"
      accepted-file-types="image/jpeg, image/png"
      v-on:updatefiles="handleLoad"
    />
    <div class="" v-if="props.isCorpCircular">
      <PinturaEditorModal
        :src="uploadBlob"
        v-if="showEditor"
        cropImageSelectionCornerStyle="circle"
        v-bind="edit"
        :imageCropAspectRatio="props.aspectFatio"
        @pintura:hide="showEditor = false"
        @pintura:process="handleProcess($event)"
        :willRenderCanvas="willRenderCanvas"
      ></PinturaEditorModal>
    </div>
    <div class="" v-else>
      <PinturaEditorModal
        :src="uploadBlob"
        v-if="showEditor"
        cropImageSelectionCornerStyle="circle"
        v-bind="edit"
        :imageCropAspectRatio="props.aspectFatio"
        @pintura:hide="showEditor = false"
        @pintura:process="handleProcess($event)"
      ></PinturaEditorModal>
    </div>
  </div>
</template>

<style>
.pintura-editor {
  --color-background: 255, 255, 255;
  --color-foreground: 10, 10, 10;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  html {
    color: #fff;
    background: #111;
  }

  .pintura-editor {
    --color-background: 10, 10, 10;
    --color-foreground: 255, 255, 255;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
}
</style>
