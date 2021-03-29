Vue.component("login-page", {
    props:["value"],
    template:`<h1>{{value}}</h1>`
});


new Vue({
    el: "#app",
    data: {
      value: "Login-page component",
    },
  
})