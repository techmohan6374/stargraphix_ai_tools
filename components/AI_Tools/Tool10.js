const Tool10 = {
    template: `
        <div id="Tool-10">

            <h2 class="tool-heading">Barcode Generator</h2>

            <textarea id="barcodeData" rows="3" placeholder="Enter value to encode..."></textarea>

            <select id="barcodeFormat">
                <option value="CODE128">CODE128</option>
                <option value="CODE39">CODE39</option>
                <option value="EAN13">EAN13</option>
                <option value="EAN8">EAN8</option>
                <option value="UPC">UPC</option>
            </select>

            <select id="barcodeSize">
                <option value="250x60">250x60</option>
                <option value="150x40">150x40</option>
                <option value="350x90">350x90</option>
                <option value="450x120">450x120</option>
            </select>

            <label>
                <input type="checkbox" id="displayValue" checked>
                Show readable text
            </label>

            <button v-on:click="generateBarcode()">Generate Barcode</button>

            <!-- CLEAR BUTTON -->
            <button style="margin-top:10px; background:#555;" v-on:click="clearBarcode()">Clear</button>

            <div id="previewContainer" style="display:none; margin-top:20px;">
                <svg id="barcode"></svg>

                <button style="margin-top:15px;" v-on:click="downloadPNG()">Download PNG</button>
            </div>
        </div>
    `,

    data() {
        return {};
    },

    methods: {
        generateBarcode() {
            let data = document.getElementById("barcodeData").value;
            if (!data.trim()) {
                alert("Enter some value first!");
                return;
            }

            let format = document.getElementById("barcodeFormat").value;
            let size = document.getElementById("barcodeSize").value;
            let showValue = document.getElementById("displayValue").checked;

            let [w, h] = size.split("x").map(Number);

            try {
                JsBarcode("#barcode", data.trim(), {
                    format: format,
                    lineColor: "#000",
                    width: Math.max(1, Math.round(w / 100)),
                    height: h,
                    displayValue: showValue,
                    margin: 10
                });

                document.getElementById("barcode").setAttribute("width", w);
                document.getElementById("barcode").setAttribute("height", h + (showValue ? 20 : 0));

                document.getElementById("previewContainer").style.display = "block";

            } catch (e) {
                alert("Invalid data for selected barcode format!");
                console.log(e);
            }
        },

        // ⭐ DOWNLOAD PNG
        downloadPNG() {
            const svgEl = document.getElementById("barcode");
            const serializer = new XMLSerializer();
            const svgStr = serializer.serializeToString(svgEl);

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const img = new Image();
            const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(blob);

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(img, 0, 0);

                canvas.toBlob((pngBlob) => {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(pngBlob);
                    link.download = "barcode.png";
                    link.click();
                });

                URL.revokeObjectURL(url);
            };

            img.src = url;
        },

        // ⭐ CLEAR FUNCTION
        clearBarcode() {
            document.getElementById("barcodeData").value = "";
            document.getElementById("previewContainer").style.display = "none";

            // Clear SVG
            let svg = document.getElementById("barcode");
            svg.innerHTML = "";
        }
    }
};
