<script setup lang="ts">
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import { Icon } from "@iconify/vue";

interface props {
  files: any[];
  imagePreviewHeight: number;
  imgName: string | null;
}

const props = defineProps<props>();
const emits = defineEmits(["load-base64"]);

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFilePoster,
  FilePondPluginImageResize
);

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

const handleLoad = async (event: any) => {
  if (event.length > 0) {
    const file = event[0].file;
    const reader = new FileReader();
    console.log(file.name);
    if (file.name != props.imgName) {
      let blob = await fetch(file.objectURL).then((r) => r.blob());

      reader.readAsDataURL(blob);

      reader.onloadend = function () {
        const base64data = reader.result;
        emits("load-base64", base64data);
      };
    }
  }
};
</script>

<template>
  <file-pond
    ref="pond"
    :imagePreviewHeight="imagePreviewHeight"
    :credits="false"
    class="custome"
    :server="server"
    :files="files"
    label-idle="<div class='tw-w-full tw-flex tw-flex-col tw-items-center tw-gap-2'>
      <div>
        <img src='/src/modules/dashboard/assets/icons/ic_upload.svg' />
      </div>    
    	<p>
        Drag & Drop una Imagen o da click
      </p>
    </div>"
    accepted-file-types="image/jpeg, image/png"
    v-on:updatefiles="handleLoad"
  />
</template>

<style scoped></style>
