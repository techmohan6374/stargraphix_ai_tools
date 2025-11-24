var firebaseConfig = {
    apiKey: "AIzaSyBj-6nNKS4Nki7mvf-DeNc47hfpTKrFUUY",
    authDomain: "login-4f527.firebaseapp.com",
    projectId: "login-4f527",
    storageBucket: "login-4f527.firebasestorage.app",
    messagingSenderId: "320553753734",
    appId: "1:320553753734:web:b8b721bfdbf17887b3c507",
    measurementId: "G-8ZLNSSCYPW"
};

firebase.initializeApp(firebaseConfig);

// Google Auth Provider
var provider = new firebase.auth.GoogleAuthProvider();

const Login = {
    template: `
          <div id="Tools">
            <div class="ai-heading-container">
                <div class="heading-name">AI Tools</div>
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
                        <button v-on:click="showLogin()">
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
                                Sign Up Required
                            </div>
                            <div class="right-side">
                                <button><iconify-icon icon="ic:twotone-close" width="24" height="24"></iconify-icon></button>
                            </div>
                        </div>
                        <div class="modal-body">
                            <h3>If you want to access AI tools, please sign up with Google</h3>
                            <p>Signing up allows you to unlock all AI-powered features and personalized tools instantly.</p>
                            <button v-on:click="googleSignup()">Continue with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
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
            ]
        }
    },
    methods: {
        googleSignup() {
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    // User Info
                    const user = result.user;

                    // Save user details in localStorage (optional)
                    localStorage.setItem("user", JSON.stringify({
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                        uid: user.uid
                    }));

                    // Redirect to Main page
                    this.$router.push("/Main");
                })
                .catch((error) => {
                    console.error("Login Error: " + error.message);
                });
        },
        showLogin() {
            $('#googleLoginModal').modal('show');
        },
        hideLogin() {
            $('#googleLoginModal').modal('show');
        }
        // redirectToTool(toolId) {
        //     this.$router.push(`/Tool${toolId}`);
        // }

    }
};
