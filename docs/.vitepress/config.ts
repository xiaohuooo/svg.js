import { defineConfig } from 'vitepress'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'
import pkg from '../../package.json'

let nav = ()=> {
  return [
    { text: "文档", link: "/guide/index" ,activeMatch: '^/guide' },

    {
      text: "关于",
      items: [
        {
          text: "github",
          link: "https://github.com/xiaohuooo",
        },
        {
          text: "源码",
          link: "https://github.com/xiaohuooo/noui",
        }
      ],
    },
    {
      text: pkg.version,
      items: [
        {
          text: "3.1",
          link: "https://svgjs.dev/docs/3.1/",
        },
        {
          text: "2.7",
          link: "https://svgjs.dev/docs/2.7/",
        }
      ]
    }
  ]
}

export default defineConfig({
  title: "Svg",
  description: "前端进阶网站",
  lastUpdated: true,
  base: "/svg.js",
  lang: 'zh-CN',
  head: [["link", { rel: "icon", type: "image/png", href: "https://svgjs.dev/docs/3.0/assets/images/logo-svg-js-01d-128.png" }]],
  locales: {
    root: { label: '简体中文' },
    en: { label: 'English', link: '/en' },
  },
  markdown: {
    headers: {
      level: [0, 0]
    },
    // options for markdown-it-anchor
    // @ts-ignore
    anchor: { permalink: false },
    // options for markdown-it-toc
    // @ts-ignore
    toc: { includeLevel: [1, 2] },
    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => {
      md.use(demoBlockPlugin, {
        scriptImports: ["import { SVG } from '@svgdotjs/svg.js'"],
        cssPreprocessor: 'less'
      })
    }
  },
  themeConfig: {
    logo: "https://svgjs.dev/docs/3.0/assets/images/logo-svg-js-01d-128.png",
    nav: nav(),
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            {
              text: "首页",
              link: "/guide/index",
            },
            {
              text: "安装",
              link: "/guide/install",
            },
            {
              text: "开始",
              link: "/guide/start",
            },
            {
              text: "容器元素",
              link: "/guide/container",
            },
          ],
        },
      ],
    },
    editLink: {
      pattern: 'https://github.com/xiaohuooo/noui/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
    socialLinks: [{ icon: "github", link: "https://github.com/xiaohuooo/noui" }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present hu'
    },
    algolia: {
      appId: '8J64VVRP8K',
      apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
      indexName: 'svg.js'
    },
  },
});
