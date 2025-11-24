const ToolOne = {
    template: `
        <div id="Tool-1">
            <div class="header">
                Background Removal
            </div>
            <div class="main-content">
                <div class="upload-section">
                    <div class="section-title">
                        <i class="fas fa-upload"></i>
                        <h2>Upload Image</h2>
                    </div>
                    <div class="upload-area" id="upload-area">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <h3>Drag & Drop your image here</h3>
                        <p>Supports JPG, PNG, and WEBP formats (max 5MB)</p>
                        <button class="btn" id="browse-btn">
                            <i class="fas fa-folder-open"></i> Browse Files
                        </button>
                        <input type="file" id="file-input" accept="image/*">
                    </div>
                    <div class="image-preview" id="preview-container">
                        <div class="placeholder">Your image preview will appear here</div>
                    </div>
                </div>
                <div class="result-section">
                    <div class="section-title">
                        <i class="fas fa-image"></i>
                        <h2>Result</h2>
                    </div>
                    <div class="result-container">
                        <div class="result-image transparent-bg" id="result-container">
                            <div class="placeholder">Background removed image will appear here</div>
                            <div class="loading" id="loading">
                                <div class="spinner"></div>
                                <p>Removing background...</p>
                            </div>
                        </div>
                        <div class="download-section">
                            <button class="btn btn-download" id="download-btn" disabled>
                                <i class="fas fa-download"></i> Download Result
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        const fileInput = document.getElementById('file-input');
        const browseBtn = document.getElementById('browse-btn');
        const uploadArea = document.getElementById('upload-area');
        const previewContainer = document.getElementById('preview-container');
        const resultContainer = document.getElementById('result-container');
        const downloadBtn = document.getElementById('download-btn');
        const loadingIndicator = document.getElementById('loading');

        // Browse button
        browseBtn.addEventListener('click', () => fileInput.click());

        // File input
        fileInput.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                handleImageUpload(this.files[0]);
            }
        });

        // Drag & drop
        uploadArea.addEventListener('dragover', function (e) {
            e.preventDefault();
            this.style.borderColor = '#ff2c2d';
            this.style.backgroundColor = 'rgba(255, 44, 45, 0.1)';
        });

        uploadArea.addEventListener('dragleave', function () {
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            this.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
        });

        uploadArea.addEventListener('drop', function (e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            this.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleImageUpload(e.dataTransfer.files[0]);
            }
        });

        // Upload & Preview Function
        function handleImageUpload(file) {
            if (!file.type.match('image.*')) {
                alert('Please select an image file (JPG, PNG, WEBP)');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('File size exceeds 5MB limit');
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                previewContainer.innerHTML = '';
                const img = document.createElement('img');
                img.src = e.target.result;
                previewContainer.appendChild(img);

                processImage(e.target.result, file);
            };
            reader.readAsDataURL(file);
        }

        // Process Image Function
        async function processImage(imageSrc, file) {
            loadingIndicator.style.display = 'flex';
            downloadBtn.disabled = true;
            resultContainer.querySelector('.placeholder').style.display = 'none';
            resultContainer.innerHTML = '';

            const formData = new FormData();
            formData.append("image_file", file);
            formData.append("size", "auto");

            try {
                const response = await fetch("https://api.remove.bg/v1.0/removebg", {
                    method: "POST",
                    headers: {
                        "X-Api-Key": "6rY7EK6r6rtXA5XMfvcsNncx" // Replace with your real API key
                    },
                    body: formData
                });

                if (!response.ok) throw new Error("Remove.bg API failed");

                const blob = await response.blob();
                const objectURL = URL.createObjectURL(blob);

                const resultImg = new Image();
                resultImg.src = objectURL;
                resultImg.onload = () => {
                    loadingIndicator.style.display = 'none';
                    resultContainer.appendChild(resultImg);
                    downloadBtn.disabled = false;

                    downloadBtn.onclick = function () {
                        const link = document.createElement('a');
                        link.href = objectURL;
                        link.download = 'background-removed.png';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    };
                };
            } catch (err) {
                loadingIndicator.style.display = 'none';
                alert("Error removing background: " + err.message);
            }
        }
    }
};
