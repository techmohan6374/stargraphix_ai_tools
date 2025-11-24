const ToolFour = {
    template: `
    <div id="Tool-4">
        <div class="tool-header">
            <h1>Photo Sheet Template Generator</h1>
        </div>

        <div class="tool-content">
            <div class="upload-section flex">
                <div class="upload-area" @click="$refs.fileInput.click()" 
                     @dragover.prevent="dragover = true"
                     @dragleave="dragover = false"
                     @drop.prevent="handleDrop"
                     :class="{active: dragover}">
                    <div class="upload-text">
                        <p>Drag & Drop or Click to Upload</p>
                        <small>(JPG, PNG)</small>
                    </div>
                    <input type="file" ref="fileInput" class="file-input" 
                           @change="handleUpload" accept="image/*" style="display:none;">
                </div>
            </div>

            <div class="preview-container">
                <p class="preview-title">Preview & Download</p>
                <div class="preview-box">
                    <img :src="photoSrc" :class="{active: photoLoaded}">
                    <span v-if="!photoLoaded">No image selected</span>
                </div>

                <div class="grid-preview">
                    <div class="grid-cell flex" v-for="n in 8" :key="n">{{n}}</div>
                </div>

                <button class="download-btn" @click="downloadTemplate" :disabled="!photoLoaded">
                    Download Photo Sheet
                </button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            photo: null,
            photoLoaded: false,
            dragover: false,
            photoSrc: ''
        };
    },
    methods: {
        handleUpload(event) {
            const file = event.target.files[0];
            if (file) this.processFile(file);
        },
        handleDrop(event) {
            this.dragover = false;
            const file = event.dataTransfer.files[0];
            if (file && file.type.match('image.*')) this.processFile(file);
        },
        processFile(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => this.fixOrientation(img);
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        fixOrientation(img) {
            const offCanvas = document.createElement('canvas');
            const offCtx = offCanvas.getContext('2d');
            offCanvas.width = img.width;
            offCanvas.height = img.height;
            offCtx.drawImage(img, 0, 0);

            this.photo = new Image();
            this.photo.onload = () => {
                this.photoLoaded = true;
                this.photoSrc = this.photo.src;
            };
            this.photo.src = offCanvas.toDataURL();
        },
        downloadTemplate() {
            if (!this.photoLoaded) return;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const dpi = 300;
            const widthInches = 6;
            const heightInches = 4;
            canvas.width = widthInches * dpi;
            canvas.height = heightInches * dpi;

            const gap = 20;
            const cols = 4;
            const rows = 2;
            const photoWidth = (canvas.width - (cols + 1) * gap) / cols;
            const photoHeight = (canvas.height - (rows + 1) * gap) / rows;

            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    ctx.drawImage(this.photo, gap + c * (photoWidth + gap), gap + r * (photoHeight + gap), photoWidth, photoHeight);
                }
            }

            const link = document.createElement('a');
            link.download = 'photo_sheet_landscape.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    }
};
