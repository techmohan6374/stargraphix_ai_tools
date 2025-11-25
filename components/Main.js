const Main = {
    template: `
        <div id="Tools">
            <div class="ai-heading-container">
                <div class="heading-name">AI Tools</div>
                <div class="profile-card" v-on:click="showLogin()">{{ profileName }}</div>
            </div>
            <div class="row m-0">
                <div class="col-12 col-md-6 col-xl-3 mt-4" v-for="val in aiTools">
                    <div class="card ai-tools-card">
                        <div class="tool-template-badge free" v-if="val.toolSubscription == 'Own Tool' ">
                           <iconify-icon icon="streamline:pen-tool-solid"></iconify-icon> {{val.toolSubscription}}
                        </div>
                        <div class="tool-template-badge premium" v-else>
                          <iconify-icon icon="icomoon-free:embed"></iconify-icon> {{val.toolSubscription}}
                        </div>
                        <div class="tool-image">
                            <img :src="val.toolImage" :alt="val.toolImage" loading="lazy">
                        </div>
                        <div class="tool-name">
                            {{val.toolName}}
                        </div>
                        <div class="tool-content">
                            {{val.toolDescription}}
                        </div>
                        <button v-on:click="redirectToTool(val.id)">
                            <iconify-icon icon="fluent:open-12-regular"></iconify-icon>Open Tool
                        </button>
                    </div>
                </div>
            </div>
            <div id="googleLoginModal" class="modal fade">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="left-side">
                               <div class="flex modal-icon">
                                    <iconify-icon icon="mage:user-fill"></iconify-icon>
                               </div> Profile Information
                            </div>
                            <div class="right-side">
                                <button class="flex" v-on:click="hideLogin()">
                                    <iconify-icon icon="ic:twotone-close" width="24" height="24"></iconify-icon>
                                </button>
                            </div>
                        </div>
                        <div class="modal-body flex">
                            <div class="profile-body flex" v-if="user">
                                <img :src="user.photo" style="width:110px;border-radius:50%">
                                <h4>Hi, {{ user.name }}</h4>
                                <p class="quote">{{ randomQuote }}</p>
                            </div>

                            <button class="flex logout-btn" v-on:click="logout">
                                  <iconify-icon icon="ic:outline-logout"></iconify-icon>
                                   Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            user: null,
            aiTools: [
                {
                    id: 1,
                    toolImage: 'resources/images/AI_Tools/1.png',
                    toolName: 'Background Removal',
                    toolDescription: 'Remove image backgrounds instantly with clean, precise cutouts.\nUpload any photo in seconds.\nDownload a ready, transparent result.',
                    toolSubscription: 'Own Tool'
                },
                {
                    id: 2,
                    toolImage: 'resources/images/AI_Tools/2.jpg',
                    toolName: 'Image Editor',
                    toolDescription: 'Edit images easily with crop, adjust, and enhance tools.\nMake quick changes in a simple interface.\nPerfect for fast and clean edits.',
                    toolSubscription: 'Own Tool'
                },
                {
                    id: 3,
                    toolImage: 'resources/images/AI_Tools/3.jpg',
                    toolName: 'QR Code Generator',
                    toolDescription: 'Create QR codes instantly from any text or link. Customize design and style easily. Download clean, high-quality codes for you.',
                    toolSubscription: 'Own Tool'
                },
                {
                    id: 4,
                    toolImage: 'resources/images/AI_Tools/4.jpg',
                    toolName: 'Passport Size Maker',
                    toolDescription: 'Create perfect passport-size photos automatically.\nAdjust framing and background easily.\nDownload print-ready sheets instantly.',
                    toolSubscription: 'Own Tool'
                },
                {
                    id: 5,
                    toolImage: 'resources/images/AI_Tools/5.jpg',
                    toolName: 'Image Upscaler',
                    toolDescription: 'Enhance photo resolution using powerful AI.\nImprove clarity, sharpness, and detail.\nGet high-quality results from low-quality images.',
                    toolSubscription: 'Embeded Tool'
                },
                {
                    id: 6,
                    toolImage: 'resources/images/AI_Tools/6.jpg',
                    toolName: 'Photo to Anime',
                    toolDescription: 'Transform your photo into anime-style artwork.\nUpload and generate colorful illustrations.\nPerfect for fun, art, and social media.',
                    toolSubscription: 'Embeded Tool'
                },
                {
                    id: 7,
                    toolImage: 'resources/images/AI_Tools/7.jpg',
                    toolName: 'AI Image Extender',
                    toolDescription: 'Extend images beyond their original frame.\nAI fills backgrounds with natural detail.\nCreate wide, seamless visuals easily.',
                    toolSubscription: 'Embeded Tool'
                },
                {
                    id: 8,
                    toolImage: 'resources/images/AI_Tools/8.jpg',
                    toolName: 'HD Background Removal',
                    toolDescription: 'Get high-definition background removal results.\nPerfect edge detection with clean output.\nIdeal for products, portraits, and design.',
                    toolSubscription: 'Embeded Tool'
                },
                {
                    id: 9,
                    toolImage: 'resources/images/AI_Tools/9.jpg',
                    toolName: 'Flipbook Viewer',
                    toolDescription: 'Convert PDFs into interactive flipbooks easily.\nAdd smooth page animations and effects.\nShare or embed for modern presentations.',
                    toolSubscription: 'Own Tool'
                },
                {
                    id: 10,
                    toolImage: 'resources/images/AI_Tools/10.jpg',
                    toolName: 'Barcode Generator',
                    toolDescription: 'Generate barcodes instantly from text or numbers.\nSupports multiple standard formats.\nDownload clean, scannable barcodes easily.',
                    toolSubscription: 'Own Tool'
                },
                {
                    id: 11,
                    toolImage: 'resources/images/AI_Tools/11.jpg',
                    toolName: 'AI Invoice Maker',
                    toolDescription: 'Create invoices instantly with AI tools.\nAuto-fill client and item details automatically.\nExport clean, professional PDFs easily.',
                    toolSubscription: 'Own Tool'
                },
                {
                    id: 12,
                    toolImage: 'resources/images/AI_Tools/12.jpg',
                    toolName: 'Digital Card',
                    toolDescription: 'Create smart digital business cards quickly.\nShare using QR code or secure link.\nModern, clean, customizable design options.',
                    toolSubscription: 'Own Tool'
                },
                {
                    id: 13,
                    toolImage: 'resources/images/AI_Tools/13.jpg',
                    toolName: 'AI Resume Maker',
                    toolDescription: 'Build resumes using AI guidance effectively.\nChoose templates and layouts effortlessly.\nExport ATS-ready professional resumes instantly.',
                    toolSubscription: 'Own Tool'
                }
            ],
            quotes: [
                "Today looks great for you, {{name}}!",
                "Good energy is coming your way, {{name}}.",
                "You’re unstoppable today, {{name}}!",
                "A bright day awaits you, {{name}}.",
                "Unlock new possibilities today, {{name}}.",
                "Shine with confidence, {{name}}.",
                "Your journey gets better today, {{name}}.",
                "Great things are lined up for you, {{name}}.",
                "Today is your power day, {{name}}!",
                "You’re meant to achieve something big today, {{name}}."
            ]
        };
    },
    created() {
        this.showLogin();
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        $('.modal-backdrop.show').css('display', 'none');
        $('body').css('overflow', 'auto');
        $('body').css('padding', '0px');
    },
    computed: {
        profileName() {
            if (!this.user || !this.user.name) return "";

            const words = this.user.name.trim().split(/\s+/);

            const first = words[0] ? words[0][0].toUpperCase() : "";
            const second = words[1] ? words[1][0].toUpperCase() : "";

            return first + second;
        },
        randomQuote() {
            if (!this.user) return "";
            let q = this.quotes[Math.floor(Math.random() * this.quotes.length)];
            return q.replace("{{name}}", this.user.name);
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                localStorage.removeItem("user");
                this.$router.push("/");
            });
        },
        redirectToTool(toolId) {
            if ([11, 12, 13].includes(toolId)) {
                alert("This tool is coming soon!");
                return;
            }
            this.$router.push(`/Tool${toolId}`);
        },
        showLogin() {
            $('#googleLoginModal').modal('show');
        },
        hideLogin() {
            $('#googleLoginModal').modal('hide');
        }
    }
};

{/* <p>{{ user.email }}</p> */ }