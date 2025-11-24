const ToolThree = {
    template: `
        <div id="Tool-3" class="qr-generator">
            <div class="tool-header">
                <h2>QR Code Generator</h2>
                <p>Create custom QR codes for URLs, text, or other data</p>
            </div>
    
            <div class="generator-container">
                <div class="input-section">
                    <div class="form-group">
                        <label for="qr-data">Enter text or URL:</label>
                        <textarea  id="qr-data" v-model="qrData"  placeholder="Enter text or URL to encode..." rows="3"></textarea>
                    </div>
                <div class="form-group">
                    <label for="qr-size">QR Code Size:</label>
                    <select id="qr-size" v-model="selectedSize">
                        <option v-for="size in sizeOptions" :value="size.value">{{ size.label }}</option>
                    </select>
                </div>
                <button  class="generate-btn"  @click="generateQR"  :disabled="!qrData">
                    Generate QR Code
                </button>
            </div>
            <div class="output-section" v-if="qrCodeUrl">
                <div class="qr-preview">
                    <img :src="qrCodeUrl" alt="Generated QR Code" class="qr-image" />
                    <div class="qr-actions">
                        <button class="download-btn" @click="downloadQR">
                            <i class="fas fa-download"></i> Download QR Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            qrData: '',
            selectedSize: '150x150',
            qrCodeUrl: '',
            sizeOptions: [
                { value: '100x100', label: 'Small (100x100)' },
                { value: '150x150', label: 'Medium (150x150)' },
                { value: '250x250', label: 'Large (250x250)' },
                { value: '300x300', label: 'Extra Large (300x300)' },
                { value: '500x500', label: 'Jumbo (500x500)' }
            ]
        };
    },
    computed: {

    },
    methods: {
        generateQR() {
            if (!this.qrData) return;

            const encodedData = encodeURIComponent(this.qrData);
            this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${this.selectedSize}&data=${encodedData}`;
        },
        downloadQR() {
            if (!this.qrCodeUrl) return;

            const link = document.createElement('a');
            link.href = this.qrCodeUrl;
            link.download = `qr-code-${new Date().getTime()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },
    watch: {
        qrData(newVal) {
            if (newVal && this.qrCodeUrl) {
                this.generateQR();
            }
        },
        selectedSize() {
            if (this.qrData && this.qrCodeUrl) {
                this.generateQR();
            }
        }
    }
};