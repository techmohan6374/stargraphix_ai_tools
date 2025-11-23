const Main = {
    template: `
        <div style="padding:20px;">
            <h2>Main Page</h2>

            <div v-if="user">
                <img :src="user.photo" width="60" style="border-radius:50%">
                <h4>{{ user.name }}</h4>
                <p>{{ user.email }}</p>
            </div>

            <button class="btn btn-danger mt-3" @click="logout">Logout</button>
        </div>
    `,
    data() {
        return {
            user: null
        };
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                localStorage.removeItem("user");
                this.$router.push("/");
            });
        }
    }
};
