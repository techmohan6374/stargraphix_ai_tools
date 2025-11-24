const Tool9 = {
  template: `
    <div id="singleFlipBookViewer" class="flipbook-wrapper">

      <!-- Upload Container -->
      <div v-if="showUpload" 
           id="upload-container-file"
           @dragover.prevent="onDragOver"
           @dragleave.prevent="onDragLeave"
           @drop.prevent="onFileDrop"
           @click="openFile"
           :class="{ 'drag-over': isDragOver }">

        <div class="upload-inner">
          <p class="upload-title">Drop PDF Here</p>
          <p class="upload-sub">or Click to Upload</p>
        </div>

      </div>

      <!-- Hidden Input -->
      <input ref="hiddenFileInput"
             type="file" 
             accept="application/pdf" 
             class="hidden-file"
             @change="loadPdf" />

      <div id="flipbookPDFContainer"></div>
    </div>
  `,

  data() {
    return {
      pdfUrl: null,
      showUpload: true,
      isDragOver: false,
    };
  },

  methods: {
    openFile() {
      this.$refs.hiddenFileInput.click();
    },
    onDragOver() {
      this.isDragOver = true;
    },
    onDragLeave() {
      this.isDragOver = false;
    },
    onFileDrop(event) {
      this.isDragOver = false;
      const file = event.dataTransfer.files[0];
      if (file && file.type === "application/pdf") {
        this.loadPdf({ target: { files: [file] } });
      }
    },

    loadPdf(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.pdfUrl = URL.createObjectURL(file);
      this.showUpload = false;

      setTimeout(() => {
        const options = {
          webgl: true,
          backgroundColor: "#212121"
        };
        $("#flipbookPDFContainer").html("");
        $("#flipbookPDFContainer").flipBook(this.pdfUrl, options);
      }, 300);
    }
  }
};
