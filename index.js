Vue.component("login-page", {
  props: {
      /**
       * Login api for login handler
       */
    loginApi: {
      type: String,
      required: true,
    },

    /**
     * successUrl for redirect path after successful login
     */
    successUrl: {
      type: String,
      required: true,
    },
  },

  data() {
    return { email: "", password: "", hasError: false };
  },
  watch: {

    /**
     * Hide error feedback ui on input change if visible
     */
    email() {
      if (this.hasError) {
        this.hasError = false;
      }
    },
    password() {
      if (this.hasError) {
        this.hasError = false;
      }
    },
  },

  methods: {
    /**
     * Call login api
     */
    loginHandler() {
      if (this.email && this.password) {
        fetch(this.loginApi)
          .then((response) => response.json())
          .then((data) => {
            this.hasError = false;
            if (this.successUrl) {
                /**
                 * Redirect to the successUrl path
                 */
              window.location.href = this.successUrl;
              this.password = "";
              this.email = "";
            }
          })
          .catch((error) => {
            this.hasError = true;
            console.error("Login error: " + error);
          });
      } else {
        alert("Email and password are required");
      }
    },
  },

  template: `<div class="global-container">
  <div class="card shadow login-form">
      <div class="card-body">
          <h4 class="card-title text-center">Log in to App</h4>
          <hr />
          <div class="card-text mb-2">
              <div v-if="hasError" class="alert alert-danger alert-dismissible fade show" role="alert">Incorrect
                  username or password.</div>
          </div>

          <form @submit.prevent="loginHandler()">
              <div class="form-group">
                  <label for="email">Email:</label>
                  <input placeholder="Email" v-model="email" type="email" class="form-control form-control-sm"
                      id="email" aria-describedby="emailHelp">
              </div>
              <div class="form-group">
                  <label for="password">Password:</label>
                  <input v-model="password" type="password" class="form-control form-control-sm" id="password"
                      placeholder="password">
              </div>
              <a href="#" class="mb-1" style="float:right;font-size:12px;">Forgot password?</a>
              <button :disabled="!email||!password" type="submit" class="btn btn-primary btn-block">Log in</button>

              <div class="sign-up">
                  Don't have an account? <a href="#">Create One</a>
              </div>
          </form>
      </div>
  </div>
</div>`,
});

/**
 * Mount the vue app
 */
new Vue({
  el: "#app",
});
