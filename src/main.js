import { createApp } from 'vue'
import App from './App'
import router from "@/router/router";
import directives from "@/directives";


// import VIntersection from "@/directives/VIntersection";
// import VFocus from "@/directives/VFocus";
// app.directive('intersection', VIntersection)
// app.directive('focus', VFocus)

const app = createApp(App)

directives.forEach(directive =>{
    app.directive(directive.name, directive)
})


app
    .use(router)
    .mount('#app')
