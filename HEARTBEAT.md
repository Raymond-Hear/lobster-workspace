# HEARTBEAT.md - 主动工作任务清单

这个文件定义了我在心跳检查时要主动执行的任务。
心跳频率由 OpenClaw 配置决定（通常每 30 分钟一次）。

## 检查清单

### 每日检查（频率：每次心跳，但每天只执行一次）

- [ ] **检查邮件** - 查看是否有重要未读邮件
- [ ] **检查日历** - 查看未来 24 小时内的日程安排
- [ ] **检查 GitHub** - 查看是否有新的 PR、Issue 或通知
- [ ] **检查待办事项** - 查看 memory/ 目录下的待办文件

### GitHub 项目推荐（频率：每天 10:00 AM）

- [ ] **个性化项目推荐** - 基于聆风兴趣抓取 GitHub 项目

**执行脚本**:
```bash
node /root/.openclaw/workspace/scripts/github-daily.js
```

**推荐标准**:
- AI 内容创作工具（图像/视频生成）
- 课程制作辅助工具（Markdown、演示）
- 效率自动化工具
- 前端可视化组件

**输出目录**: `/root/.openclaw/workspace/github-daily/`

### 大咖知识库更新（频率：每天 9:00 AM）

- [ ] **抓取 Dan Koe 内容** - 检查 newsletter/blog 更新
- [ ] **抓取 Lenny Rachitsky 内容** - 检查 newsletter 更新
- [ ] **抓取 Naval Ravikant 内容** - 检查 blog 更新
- [ ] **抓取 Andrej Karpathy 内容** - 检查 blog/YouTube 更新

**执行脚本**:
```bash
node /root/.openclaw/workspace/scripts/fetch-influencers.js
```

**输出目录**: `/root/.openclaw/workspace/knowledge-base/`

**格式**: 每篇文章一个 Markdown 文件，按月份分类

### 每周检查（频率：每周一执行）

- [ ] **整理 memory 文件** - 归档旧的每日日志
- [ ] **检查长期待办** - 回顾 MEMORY.md 中的长期任务
- [ ] **打包知识库** - 将本周的大咖内容打包成 Word 文档发送

### 持续监控（频率：每次心跳）

- [ ] **检查 RSS 更新** - 监控特定技术博客的更新
- [ ] **检查文件变化** - 监控特定目录的文件变化

## 执行规则

1. **时间窗口**：只在 08:00-23:00 之间主动汇报
2. **避免重复**：同一任务每天只汇报一次（除非紧急）
3. **静默处理**：没有重要事项时，回复 HEARTBEAT_OK
4. **重要阈值**：只汇报真正需要关注的事项

## 当前配置

- 邮件检查：未配置
- 日历检查：未配置  
- GitHub 检查：未配置
- 大咖知识库：已配置（Dan Koe, Lenny, Naval, Karpathy）
- RSS 监控：已配置（AI 日报）
- 文件监控：未配置

---

*根据 Peter 的文章和实际需求，可以在这里添加更多主动任务*
