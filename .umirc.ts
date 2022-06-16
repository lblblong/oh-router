import { defineConfig } from 'dumi'

export default defineConfig({
  mode: 'site',
  title: 'oh-router',
  favicon: '/assets/favicon.ico',
  logo: '/assets/logo.png',
  locales: [
    ['en', 'English'],
    ['zh', '中文'],
  ],
  navs: {
    en: [
      {
        title: 'Guide',
        path: '/guide',
      },
      {
        title: 'GitHub',
        path: 'https://github.com/lblblong/oh-router',
      },
    ],
    zh: [
      {
        title: '指南',
        path: '/zh/guide',
      },
      {
        title: 'GitHub',
        path: 'https://github.com/lblblong/oh-router',
      },
    ],
  },
  menus: {
    '/guide': [
      {
        title: 'Getting Started',
        path: '/guide',
      },
      {
        title: 'Configuring Routes',
        path: '/guide/configuring-routes',
      },
      {
        title: 'Navigation',
        path: '/guide/navigation',
      },
      {
        title: 'Nested Routes',
        path: '/guide/nested-routes',
      },
      {
        title: 'Reading URL Parameters',
        path: '/guide/reading-url-parameters',
      },
      {
        title: 'Middleware',
        path: '/guide/middleware',
      },
      {
        title: 'Use in Vue',
        path: '/guide/use-in-vue',
      },
      {
        title: 'Examples',
        children: [
          {
            title: 'Basic',
            path: '/guide/examples/basic',
          },
          {
            title: 'Index Route',
            path: '/guide/examples/index-route',
          },
          {
            title: 'Middleware',
            path: '/guide/examples/middlewares',
          },
          {
            title: 'Nested Routes',
            path: '/guide/examples/nested-routes',
          },
        ],
      },
    ],
    '/zh/guide': [
      {
        title: '快速开始',
        path: '/zh/guide',
      },
      {
        title: '配置路由',
        path: '/zh/guide/configuring-routes',
      },
      {
        title: '路由导航',
        path: '/zh/guide/navigation',
      },
      {
        title: '嵌套路由',
        path: '/zh/guide/nested-routes',
      },
      {
        title: '获取路由参数',
        path: '/zh/guide/reading-url-parameters',
      },
      {
        title: '路由中间件',
        path: '/zh/guide/middleware',
      },
      {
        title: '在 Vue 中使用',
        path: '/zh/guide/use-in-vue',
      },
      {
        title: '使用示例',
        children: [
          {
            title: '基本使用',
            path: '/zh/guide/examples/basic',
          },
          {
            title: '索引路由',
            path: '/zh/guide/examples/index-route',
          },
          {
            title: '路由中间件',
            path: '/zh/guide/examples/middlewares',
          },
          {
            title: '嵌套路由',
            path: '/zh/guide/examples/nested-routes',
          },
        ],
      },
    ],
  },
  metas: [
    {
      name: 'keywords',
      content:
        'oh-router, router, frontend router, frontend-router, react-router, vue-router',
    },
  ],
  styles: [
    `.__dumi-default-layout-hero{
      background: no-repeat center center url("data:image/svg+xml,%3Csvg%20id%3D%22visual%22%20viewBox%3D%220%200%20960%20540%22%20width%3D%22960%22%20height%3D%22540%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22960%22%20height%3D%22540%22%20fill%3D%22%23001220%22%3E%3C%2Frect%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22grad1_0%22%20x1%3D%2243.8%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%2214.444444444444446%25%22%20stop-color%3D%22%23001220%22%20stop-opacity%3D%221%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%2285.55555555555554%25%22%20stop-color%3D%22%23001220%22%20stop-opacity%3D%221%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22grad2_0%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%2256.3%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%2214.444444444444446%25%22%20stop-color%3D%22%23001220%22%20stop-opacity%3D%221%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%2285.55555555555554%25%22%20stop-color%3D%22%23001220%22%20stop-opacity%3D%221%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cg%20transform%3D%22translate(960%2C%200)%22%3E%3Cpath%20d%3D%22M0%20378C-48.5%20362%20-97.1%20346.1%20-132.4%20319.7C-167.8%20293.3%20-189.9%20256.4%20-228.4%20228.4C-266.8%20200.4%20-321.6%20181.2%20-349.2%20144.7C-376.9%20108.1%20-377.4%2054%20-378%200L0%200Z%22%20fill%3D%22%23FBAE3C%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(0%2C%20540)%22%3E%3Cpath%20d%3D%22M0%20-378C54%20-377.6%20107.9%20-377.3%20144.7%20-349.2C181.4%20-321.2%20200.8%20-265.4%20225.6%20-225.6C250.3%20-185.8%20280.4%20-162%20306.7%20-127.1C333%20-92.1%20355.5%20-46.1%20378%200L0%200Z%22%20fill%3D%22%23FBAE3C%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
      background-size:cover;
      background-attachment: fixed;
      padding: 120px 0 !important;
    }
    .__dumi-default-layout-hero h1 {
      color: #f3f3f3 !important;
      text-shadow: 0 2px 8px rgba(0,0,0,.3);
    }
    .__dumi-default-layout-hero .markdown {
      color: #eee;
      text-shadow: 0 2px 5px rgba(0,0,0,.3);
    }`,
  ],
})
