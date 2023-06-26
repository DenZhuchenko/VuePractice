import { createApp } from 'vue'
import App from './App'
import router from "@/router/router";
import directives from "@/directives";
import store from "@/store";

const app = createApp(App)

directives.forEach(directive =>{
    app.directive(directive.name, directive)
})


app
    .use(store)
    .use(router)
    .mount('#app')


// import VIntersection from "@/directives/VIntersection";
// import VFocus from "@/directives/VFocus";
// const app = createApp(App)
// app.directive('intersection', VIntersection)
// app.directive('focus', VFocus)
// app
//     .use(router)
//     .mount('#app')