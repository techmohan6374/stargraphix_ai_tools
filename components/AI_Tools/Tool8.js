const ToolEight = {
    template: `
        <div id="Tool-8" style='position:relative;'>
        <div style='position:absolute;top:20px;left:0px;width:100%;height:50px;background-color:#0b0f19;color:white;display:flex;justify-content:center;align-items:center;font-size:20px;'>
        Star Graphix Background Removal</div>
            <iframe
                src="https://gokaygokay-inspyrenet-rembg.hf.space"
                frameborder="0"
                width="100%"
                height="100vh"
                style="width: 100%; height: 100vh; border: none;"
            ></iframe>
            <div class="dotnet-div">
                <a href="https://stargraphix.in/" target="_blank">Developed By @StarGraphix Team</a>
            </div>
        </div>
    `,
    beforeCreate() {
        const url = new URL(window.location.href);

        if (!url.searchParams.has("reloaded")) {
            url.searchParams.set("reloaded", "true");
            window.location.replace(url.toString());
        }
    },
    mounted() {
        setTimeout(() => {
            try {
                document.querySelector('iframe').contentDocument.querySelector('h1').style.display = 'none';
            } catch (e) {
                console.error(e); // still SecurityError, even after 3 seconds
            }
        }, 5000);
    }
};