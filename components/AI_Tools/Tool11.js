const ToolEleven = {

    template: `
 <div id="Tool-11">
 
        <header>
            <div class="logo">Star Graphix<span> Certificate Generator</span></div>
            <div style="font-size:.75rem;color:var(--text-muted)">A4 Certificate Generator &amp; PDF Exporter</div>
        </header>

        <div class="app">
            <div class="sidebar">

                <div>
                    <div class="section-label">① Background Image (A4)</div>
                    <div class="upload-zone" :class="{ done: bgDataUrl }" @click="$refs.bgInput.click()">
                        <input type="file" ref="bgInput" @change="handleBgUpload" accept="image/*">
                        <div class="uz-icon">🖼️</div>
                        <p>Click or drop an A4-size image<br>(JPG / PNG / WEBP)</p>
                        <div class="uz-name">{{ bgFilename }}</div>
                    </div>
                </div>

                <div class="toggle-row">
                    <label for="toggle-bg">Show Background Image</label>
                    <label class="toggle">
                        <input type="checkbox" id="toggle-bg" v-model="showBg"
                            @change="showStatus(showBg ? 'Background visible' : 'Background hidden')">
                        <div class="toggle-track"></div>
                        <div class="toggle-thumb"></div>
                    </label>
                </div>

                <div class="sep"></div>

                <div>
                    <div class="section-label">② Add Text Fields</div>
                    <div class="field-name-row" style="margin-bottom:8px">
                        <input type="text" v-model="newFieldName" @keydown.enter="addField"
                            placeholder="Field name (e.g. Name)">
                        <button class="btn btn-outline" @click="addField" style="white-space:nowrap">+ Add</button>
                    </div>

                    <div class="fields-list">
                        <div v-for="f in fields" :key="f.id" class="field-item"
                            :class="{ selected: selectedFieldId === f.id }" @click="selectField(f.id)">
                            <div class="fi-dot"></div>
                            <div class="fi-name">{{ f.name }}</div>
                            <button class="fi-del" title="Remove" @click.stop="removeField(f.id)">✕</button>
                        </div>
                    </div>
                </div>

                <div v-if="selectedFieldData" class="field-controls">
                    <div style="font-size:.78rem;font-weight:600;color:var(--text-muted)">✏️ <span>{{
                            selectedFieldData.name }}</span> Settings</div>

                    <div class="ctrl-row">
                        <label>Horizontal Align</label>
                        <div class="ctrl-btn-group">
                            <button class="ctrl-btn" :class="{ active: selectedFieldData.textAlign === 'left' }"
                                @click="selectedFieldData.textAlign = 'left'">⬅ Left</button>
                            <button class="ctrl-btn" :class="{ active: selectedFieldData.textAlign === 'center' }"
                                @click="selectedFieldData.textAlign = 'center'">⬛ Center</button>
                            <button class="ctrl-btn" :class="{ active: selectedFieldData.textAlign === 'right' }"
                                @click="selectedFieldData.textAlign = 'right'">➡ Right</button>
                        </div>
                    </div>

                    <div class="ctrl-row">
                        <label>Vertical Align</label>
                        <div class="ctrl-btn-group">
                            <button class="ctrl-btn" :class="{ active: selectedFieldData.vertAlign === 'flex-start' }"
                                @click="selectedFieldData.vertAlign = 'flex-start'">⬆ Top</button>
                            <button class="ctrl-btn" :class="{ active: selectedFieldData.vertAlign === 'center' }"
                                @click="selectedFieldData.vertAlign = 'center'">⬛ Middle</button>
                            <button class="ctrl-btn" :class="{ active: selectedFieldData.vertAlign === 'flex-end' }"
                                @click="selectedFieldData.vertAlign = 'flex-end'">⬇ Bottom</button>
                        </div>
                    </div>

                    <div class="ctrl-row">
                        <label>Font</label>
                        <div class="font-row">
                            <select v-model="selectedFieldData.fontFamily">
                                <option value="'DM Sans', sans-serif">DM Sans</option>
                                <option value="'Playfair Display', serif">Playfair</option>
                                <option value="Georgia, serif">Georgia</option>
                                <option value="Arial, sans-serif">Arial</option>
                                <option value="'Courier New', monospace">Courier</option>
                                <option value="Impact, sans-serif">Impact</option>
                            </select>
                            <input type="number" v-model.number="selectedFieldData.fontSize" min="6" max="96"
                                title="Font size">
                            <input type="color" v-model="selectedFieldData.color" title="Text color">
                        </div>
                    </div>

                    <div class="ctrl-row">
                        <label>Style</label>
                        <div class="ctrl-btn-group">
                            <button class="ctrl-btn" style="font-weight:700"
                                :class="{ active: selectedFieldData.fontWeight === 'bold' }"
                                @click="toggleStyle('fontWeight', 'bold', 'normal')">B</button>
                            <button class="ctrl-btn" style="font-style:italic"
                                :class="{ active: selectedFieldData.fontStyle === 'italic' }"
                                @click="toggleStyle('fontStyle', 'italic', 'normal')">I</button>
                            <button class="ctrl-btn" style="text-decoration:underline"
                                :class="{ active: selectedFieldData.textDecoration === 'underline' }"
                                @click="toggleStyle('textDecoration', 'underline', 'none')">U</button>
                        </div>
                    </div>

                    <div class="ctrl-row">
                        <label>Box Size (px)</label>
                        <div class="size-row">
                            <label>Width <input type="number" v-model.number="selectedFieldData.w" min="40"
                                    max="780"></label>
                            <label>Height <input type="number" v-model.number="selectedFieldData.h" min="20"
                                    max="1100"></label>
                        </div>
                    </div>
                </div>

                <div class="sep"></div>

                <div>
                    <div class="section-label">③ Upload Excel Data (max 50 rows)</div>
                    <div class="upload-zone" :class="{ done: excelRows.length > 0 }" @click="$refs.excelInput.click()">
                        <input type="file" ref="excelInput" @change="handleExcelUpload" accept=".xlsx,.xls,.csv">
                        <div class="uz-icon">📊</div>
                        <p>Upload .xlsx / .xls / .csv<br>Columns must match field names</p>
                        <div class="uz-name">{{ excelFilename }}</div>
                    </div>

                    <div v-if="excelRows.length > 0" class="excel-preview" style="margin-top:8px">
                        <table>
                            <thead>
                                <tr>
                                    <th v-for="h in excelHeaders" :key="h">{{ h }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, idx) in excelPreviewRows" :key="idx">
                                    <td v-for="h in excelHeaders" :key="h">{{ row[h] || '' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <button class="btn btn-success" :disabled="!isGenerateReady" @click="generatePDF">⬇ Generate
                    PDF</button>
                <button class="btn btn-danger" @click="clearAll">🗑 Clear All</button>

            </div>

            <div class="canvas-area" @mousedown="deselectField">
                <div class="zoom-controls">
                    <button class="zoom-btn" @click.stop="zoomOut">−</button>
                    <div class="zoom-label">{{ Math.round(zoom * 100) }}%</div>
                    <button class="zoom-btn" @click.stop="zoomIn">+</button>
                </div>

                <div id="a4-frame" :style="{ transform: 'scale(' + zoom + ')' }">
                    <div v-if="!bgDataUrl" class="no-bg-hint">
                        <div class="hint-icon">🖼️</div>
                        <p>Upload a background image to start</p>
                    </div>

                    <img v-if="bgDataUrl" :src="bgDataUrl" id="bg-image" :style="{ opacity: showBg ? 1 : 0 }"
                        alt="background">

                    <div v-for="f in fields" :key="f.id" class="textbox" :class="{ selected: selectedFieldId === f.id }"
                        :style="{ left: f.x + 'px', top: f.y + 'px', width: f.w + 'px', height: f.h + 'px', alignItems: f.vertAlign }"
                        @mousedown.stop="startDrag(f, $event)">

                        <div class="textbox-label" :style="{
   textAlign: f.textAlign,
   fontSize: f.fontSize + 'px',
   fontFamily: f.fontFamily,
   color: f.color,
   fontWeight: f.fontWeight,
   fontStyle: f.fontStyle,
   textDecoration: f.textDecoration
}" v-text="'{{ ' + f.name + ' }}'">
                        </div>

                        <div class="textbox-handle" @mousedown.stop.prevent="startResize(f, $event)"></div>
                        <button class="textbox-remove" @click.stop="removeField(f.id)">✕</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showLimitModal" class="modal-overlay">
            <div class="modal">
                <div class="m-icon">⚠️</div>
                <h3>Excel Row Limit Exceeded</h3>
                <p>Your Excel file contains more than <strong>50 data rows</strong>.<br>
                    Please reduce it to 50 rows or fewer and re-upload.</p>
                <button class="btn btn-primary" @click="showLimitModal = false">Got it</button>
            </div>
        </div>

        <div v-if="showProgressOverlay" class="progress-overlay">
            <div class="progress-box">
                <h3>Generating PDF…</h3>
                <div class="progress-bar-wrap">
                    <div class="progress-bar-fill" :style="{ width: progressPct + '%' }"></div>
                </div>
                <div class="progress-text">{{ progressText }}</div>
            </div>
        </div>

        <div class="status-bar" :class="{ show: showStatusBar }">{{ statusText }}</div>
    </div>
    `,

    data() {
        return {
            bgDataUrl: null,
            bgFilename: '',
            showBg: true,

            newFieldName: '',
            fields: [],
            selectedFieldId: null,

            excelRows: [],
            excelHeaders: [],
            excelFilename: '',

            zoom: 1,

            // UI States
            statusText: '',
            showStatusBar: false,
            statusTimer: null,

            showLimitModal: false,
            showProgressOverlay: false,
            progressPct: 0,
            progressText: 'Preparing…',

            // Drag & Drop / Resize states
            draggingField: null,
            resizingField: null,
            mouseOffset: { x: 0, y: 0 },
            startSize: { w: 0, h: 0 }
        }
    },
    computed: {
        selectedFieldData() {
            return this.fields.find(f => f.id === this.selectedFieldId);
        },
        excelPreviewRows() {
            return this.excelRows.slice(0, 5);
        },
        isGenerateReady() {
            return this.bgDataUrl && this.excelRows.length > 0 && this.fields.length > 0;
        }
    },
    mounted() {
        // Attach global mouse events for dragging and resizing
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    },
    beforeDestroy() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    },
    methods: {
        // ─── Helpers ─────────────────────────────────────────────
        uid() {
            return '_' + Math.random().toString(36).slice(2, 9);
        },
        showStatus(msg, dur = 2500) {
            this.statusText = msg;
            this.showStatusBar = true;
            clearTimeout(this.statusTimer);
            this.statusTimer = setTimeout(() => {
                this.showStatusBar = false;
            }, dur);
        },

        // ─── Zoom ────────────────────────────────────────────────
        zoomIn() {
            this.zoom = Math.min(1.5, +(this.zoom + 0.1).toFixed(1));
        },
        zoomOut() {
            this.zoom = Math.max(0.3, +(this.zoom - 0.1).toFixed(1));
        },

        // ─── File Uploads ────────────────────────────────────────
        handleBgUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
                this.bgDataUrl = e.target.result;
                this.bgFilename = '✓ ' + file.name;
                this.showStatus('Background image loaded');
            };
            reader.readAsDataURL(file);
        },
        handleExcelUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
                const wb = XLSX.read(e.target.result, { type: 'binary' });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const raw = XLSX.utils.sheet_to_json(ws, { header: 1 });

                if (raw.length === 0) return;

                this.excelHeaders = raw[0].map(h => String(h).trim());
                const dataRows = raw.slice(1).filter(r => r.some(c => c !== undefined && c !== ''));

                if (dataRows.length > 50) {
                    this.showLimitModal = true;
                    this.$refs.excelInput.value = '';
                    return;
                }

                this.excelRows = dataRows.map(row => {
                    const obj = {};
                    this.excelHeaders.forEach((h, i) => {
                        obj[h] = row[i] !== undefined ? String(row[i]) : '';
                    });
                    return obj;
                });

                this.excelFilename = `✓ ${file.name} (${this.excelRows.length} rows)`;
                this.showStatus(`Excel loaded: ${this.excelRows.length} rows`);
            };
            reader.readAsBinaryString(file);
        },

        // ─── Field Management ────────────────────────────────────
        addField() {
            const name = this.newFieldName.trim();
            if (!name) return;
            if (this.fields.find(f => f.name.toLowerCase() === name.toLowerCase())) {
                this.showStatus('Field name already exists');
                return;
            }

            const newField = {
                id: this.uid(),
                name: name,
                x: 80,
                y: 80 + this.fields.length * 60,
                w: 220,
                h: 44,
                textAlign: 'center',
                vertAlign: 'center',
                fontSize: 18,
                fontFamily: "'DM Sans', sans-serif",
                color: '#222222',
                fontWeight: 'normal',
                fontStyle: 'normal',
                textDecoration: 'none',
            };

            this.fields.push(newField);
            this.newFieldName = '';
            this.selectField(newField.id);
            this.showStatus(`Field "${name}" added`);
        },
        removeField(id) {
            this.fields = this.fields.filter(f => f.id !== id);
            if (this.selectedFieldId === id) {
                this.selectedFieldId = null;
            }
            this.showStatus('Field removed');
        },
        selectField(id) {
            this.selectedFieldId = id;
        },
        deselectField(event) {
            // Deselect if clicking directly on the canvas area or A4 frame
            if (event.target.id === 'a4-frame' || event.target.id === 'bg-image' || event.target.classList.contains('canvas-area')) {
                this.selectedFieldId = null;
            }
        },
        toggleStyle(prop, activeValue, inactiveValue) {
            if (this.selectedFieldData) {
                this.selectedFieldData[prop] = this.selectedFieldData[prop] === activeValue ? inactiveValue : activeValue;
            }
        },

        // ─── Drag & Drop / Resize Logic ──────────────────────────
        startDrag(field, event) {
            this.selectField(field.id);
            this.draggingField = field;

            // Get exact offset of mouse within the element adjusted for zoom
            this.mouseOffset.x = event.clientX - field.x * this.zoom;
            this.mouseOffset.y = event.clientY - field.y * this.zoom;
        },
        startResize(field, event) {
            this.selectField(field.id);
            this.resizingField = field;

            this.mouseOffset.x = event.clientX;
            this.mouseOffset.y = event.clientY;
            this.startSize.w = field.w;
            this.startSize.h = field.h;
        },
        onMouseMove(event) {
            if (this.draggingField) {
                let nx = (event.clientX - this.mouseOffset.x) / this.zoom;
                let ny = (event.clientY - this.mouseOffset.y) / this.zoom;

                // Bounds checking
                nx = Math.max(0, Math.min(794 - this.draggingField.w, nx));
                ny = Math.max(0, Math.min(1123 - this.draggingField.h, ny));

                this.draggingField.x = Math.round(nx);
                this.draggingField.y = Math.round(ny);
            }
            else if (this.resizingField) {
                const dx = (event.clientX - this.mouseOffset.x) / this.zoom;
                const dy = (event.clientY - this.mouseOffset.y) / this.zoom;

                this.resizingField.w = Math.max(60, Math.round(this.startSize.w + dx));
                this.resizingField.h = Math.max(24, Math.round(this.startSize.h + dy));
            }
        },
        onMouseUp() {
            this.draggingField = null;
            this.resizingField = null;
        },

        // ─── PDF Generation ──────────────────────────────────────
        async generatePDF() {
            this.showProgressOverlay = true;
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
            const A4W = 595.28, A4H = 841.89;
            const frameW = 794, frameH = 1123;

            const total = this.excelRows.length;

            for (let i = 0; i < total; i++) {
                const row = this.excelRows[i];
                this.progressPct = Math.round((i / total) * 90);
                this.progressText = `Rendering page ${i + 1} of ${total}…`;

                // Build a hidden clone for rendering without disrupting Vue UI
                const clone = this.buildClone(row);
                document.body.appendChild(clone);

                await new Promise(r => setTimeout(r, 50)); // let fonts render

                const canvas = await html2canvas(clone, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    width: frameW,
                    height: frameH,
                    logging: false,
                });

                document.body.removeChild(clone);

                const imgData = canvas.toDataURL('image/jpeg', 0.95);

                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, 0, A4W, A4H, '', 'FAST');
            }

            this.progressPct = 100;
            this.progressText = 'Saving…';

            await new Promise(r => setTimeout(r, 200));
            pdf.save('certificates.pdf');

            this.showProgressOverlay = false;
            this.showStatus(`✓ PDF with ${total} page(s) downloaded!`, 3500);
        },
        buildClone(row) {
            const wrap = document.createElement('div');
            wrap.style.cssText = `
        position:fixed; left:-9999px; top:0;
        width:794px; height:1123px;
        overflow:hidden; background:white;
      `;

            // Background image
            if (this.bgDataUrl) {
                const img = document.createElement('img');
                img.src = this.bgDataUrl;
                img.style.cssText = `
          position:absolute;inset:0;width:100%;height:100%;
          object-fit:cover;z-index:0;
          opacity:${this.showBg ? '1' : '0'};
        `;
                wrap.appendChild(img);
            }

            // Text fields
            this.fields.forEach(f => {
                const val = row[f.name] !== undefined ? row[f.name] : '';
                const box = document.createElement('div');
                box.style.cssText = `
          position:absolute;
          left:${f.x}px; top:${f.y}px;
          width:${f.w}px; height:${f.h}px;
          display:flex; align-items:${f.vertAlign};
          z-index:10; overflow:hidden;
        `;
                const lbl = document.createElement('div');
                lbl.style.cssText = `
          width:100%;
          text-align:${f.textAlign};
          font-size:${f.fontSize}px;
          font-family:${f.fontFamily};
          color:${f.color};
          font-weight:${f.fontWeight};
          font-style:${f.fontStyle};
          text-decoration:${f.textDecoration};
          line-height:1.3;
          word-break:break-word;
        `;
                lbl.textContent = val;
                box.appendChild(lbl);
                wrap.appendChild(box);
            });

            return wrap;
        },

        // ─── Reset ───────────────────────────────────────────────
        clearAll() {
            if (!confirm('Clear everything and start over?')) return;

            this.bgDataUrl = null;
            this.bgFilename = '';
            this.fields = [];
            this.selectedFieldId = null;
            this.excelRows = [];
            this.excelHeaders = [];
            this.excelFilename = '';

            if (this.$refs.bgInput) this.$refs.bgInput.value = '';
            if (this.$refs.excelInput) this.$refs.excelInput.value = '';

            this.showStatus('Cleared');
        }
    }

}