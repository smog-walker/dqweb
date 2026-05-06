## dqweb（展示站）

这是从移动端项目拆出来的前端展示站（无后端），用于演示：首页商品、商品详情、活动中心、购物车、下单与订单列表。

### 本地运行

```bash
npm install
npm run dev
```

### 构建

```bash
npm run build
npm run start
```

### GitHub Pages

- 已配置 GitHub Actions 自动部署（推送到 main 后自动更新 Pages）
- 仓库 Settings → Pages → Build and deployment 选择 “GitHub Actions”
- 页面地址通常为：`https://smog-walker.github.io/dqweb/`

### 图片资源

- 页面使用 `public/pac/*.jpg`（数字命名）作为静态资源路径
- `pac/` 目录用于存放源图片，`npm run dev/build` 会通过脚本生成 `public/pac/1.jpg..12.jpg`
