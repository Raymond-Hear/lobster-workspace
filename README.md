# 龙虾工作台 - 每日内容聚合

## 网站结构

```
/
├── index.html          # 主页：显示当天最新内容
├── archive.html        # 归档页：所有历史日报列表
├── daily/              # 日报详情页
│   ├── 2026-03-05.html
│   ├── 2026-03-04.html
│   └── ...
└── github/             # GitHub 推荐详情页
    ├── 2026-03-05.html
    └── ...
```

## 每日更新流程

1. 生成当天日报内容 (daily-YYYY-MM-DD.html)
2. 生成当天 GitHub 推荐 (github-YYYY-MM-DD.html)
3. 更新主页 index.html (显示当天内容)
4. 更新归档页 archive.html (添加新条目)
5. 推送到 GitHub Pages

## 设计风格

- Material You (M3) 紫色主题
- 大圆角、柔和色调
- 响应式布局
