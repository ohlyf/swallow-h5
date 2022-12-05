import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { ImgLoader } from "./util/imgUtil";

// 这行代码务必放到createApp的上面
// 保证当我们删除图片缓存，再刷新，执行完createApp就不再执行下面代码
ImgLoader.storageAllImg.apply(ImgLoader);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
