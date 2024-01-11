<script setup lang="ts">
import FilePondPluginImageEditor from "@pqina/filepond-plugin-image-editor";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";
import vueFilePond from "vue-filepond";
// Import Pintura styles
import "@pqina/pintura/pintura.css";

import {
  createDefaultImageOrienter,
  createDefaultImageReader,
  createDefaultImageWriter,
  legacyDataToImageState,
  locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,

  // filepond
  openEditor,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_filter,
  plugin_filter_defaults,
  plugin_filter_locale_en_gb,
  plugin_finetune,
  plugin_finetune_defaults,
  plugin_finetune_locale_en_gb,
  processImage,
  // plugins
  setPlugins,
} from "@pqina/pintura";

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

interface props {
  files: any[];
  imagePreviewHeight: number;
  imgName: string | null;
  labelTemplate: string;
}

const props = defineProps<props>();
const emits = defineEmits(["load-base64"]);

const FilePond = vueFilePond(
  FilePondPluginImageEditor,
  FilePondPluginFilePoster,
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
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

const editor = {
  // map legacy data objects to new imageState objects
  legacyDataToImageState: legacyDataToImageState,

  // used to create the editor, receives editor configuration, should return an editor instance
  createEditor: openEditor,

  // Required, used for reading the image data
  imageReader: [createDefaultImageReader],

  // optionally. can leave out when not generating a preview thumbnail and/or output image
  imageWriter: [createDefaultImageWriter],

  // used to generate poster images, runs an editor in the background
  imageProcessor: processImage,

  // editor options
  editorOptions: {
    utils: ["crop", "finetune", "filter", "annotate"],
    imageOrienter: createDefaultImageOrienter(),
    ...plugin_finetune_defaults,
    ...plugin_filter_defaults,
    ...markup_editor_defaults,
    locale: {
      ...locale_en_gb,
      ...plugin_crop_locale_en_gb,
      ...plugin_finetune_locale_en_gb,
      ...plugin_filter_locale_en_gb,
      ...plugin_annotate_locale_en_gb,
      ...markup_editor_locale_en_gb,
    },
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
    :filePosterHeight="imagePreviewHeight"
    :imagePreviewHeight="imagePreviewHeight"
    :credits="false"
    class="custome"
    :server="server"
    :files="files"
    :label-idle="props.labelTemplate"
    accepted-file-types="image/jpeg, image/png"
    v-on:updatefiles="handleLoad"
  />
</template>

<style scoped></style>
