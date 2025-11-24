const ToolSix = {
    template: `
        <div id="Tool-6">
            <gradio-app src="https://akhaliq-qwen-image-edit-2509-photo-to-anime.hf.space"></gradio-app>
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
        const script = document.createElement("script");
        script.src = "https://gradio.s3-us-west-2.amazonaws.com/5.49.1/gradio.js";
        script.type = "module";
        document.head.appendChild(script);
    }
};
