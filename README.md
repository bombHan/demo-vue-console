##通用后端管理控制台（单页应用）

**目录结构**
- `src` 代码目录
    - `index.js` 入口js
    - `vendor.js` 三方依赖引用导入
    - `layout.pug` html模板文件
    - `views` 子页面，一般路由对应的页面
    - `router` 路由配置
    - `store` vuex初始化，http请求地址配置
    - `style` 样式表
    - `assets` 图片、字体等资源文件
    - `ext` 扩展包，无法从npm上下载的文件，须本地引用
    - `util` 工具类方法
    - `components` 自定义组件
    - `constants` 常量枚举对象
- `dist` 代码输出目录


**涉及的前端技术**
- Vue2.0+
- ElementUI2.0+
- VueX 全局状态追踪、管理机
- Vue-Resouce (老项目中使用的http请求封装类库)
- axios (新项目中取代之前的vue-resource)
- Vue-Router Vue前端路由
- Pug 前端模板引擎
- ECharts3.0+ 前端图形报表引擎
- FontAwesome4.0+ 前端矢量字体图形库


**涉及的前端工具**
- webpack2.0+
- webpack-dev-server 2.0+
- ESlint 代码检查
- git-commit-hook 提交前代码检查

注意使用git11111

