#!/usr/bin/env node
/**
 * GitHub 每日项目推荐
 * 基于聆风的兴趣领域个性化推荐
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// 配置
const CONFIG = {
  outputDir: "/root/.openclaw/workspace/github-daily",
  minStars: 100,        // 最低 star 数
  maxResults: 10,       // 每天推荐数量
  
  // 搜索配置 - 按优先级排序
  searchQueries: [
    // 高优先级：AI 内容创作
    { q: "image-generation stars:>500 language:JavaScript", category: "AI图像", weight: 3 },
    { q: "video-processing AI stars:>300", category: "AI视频", weight: 3 },
    { q: "stable-diffusion webui stars:>1000", category: "AI绘图", weight: 3 },
    { q: "comfyui workflow stars:>500", category: "ComfyUI", weight: 3 },
    
    // 中优先级：内容创作工具
    { q: "markdown-editor react stars:>500", category: "内容工具", weight: 2 },
    { q: "presentation slide web stars:>300", category: "演示工具", weight: 2 },
    { q: "automation workflow n8n stars:>1000", category: "自动化", weight: 2 },
    
    // 低优先级：前端/设计
    { q: "react-components ui-library stars:>2000", category: "前端组件", weight: 1 },
    { q: "data-visualization dashboard stars:>1000", category: "数据可视化", weight: 1 },
  ]
};

// 工具函数
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchGitHubAPI(url) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: url,
      method: 'GET',
      headers: {
        'User-Agent': 'GitHub-Daily-Recommendation',
        'Accept': 'application/vnd.github.v3+json'
      },
      timeout: 10000
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Parse error'));
        }
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    
    req.end();
  });
}

// 搜索 GitHub 项目
async function searchProjects(query, category) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `/search/repositories?q=${encodedQuery}&sort=updated&order=desc&per_page=5`;
    const data = await fetchGitHubAPI(url);
    
    if (!data.items) return [];
    
    return data.items.map(item => ({
      name: item.name,
      fullName: item.full_name,
      url: item.html_url,
      stars: item.stargazers_count,
      description: item.description || '暂无描述',
      language: item.language,
      updatedAt: item.updated_at,
      category: category
    }));
  } catch (e) {
    console.error(`搜索失败 [${category}]:`, e.message);
    return [];
  }
}

// 生成推荐报告
function generateReport(projects) {
  const date = new Date().toLocaleDateString('zh-CN');
  
  // 按权重和 stars 排序，取前 10
  const topProjects = projects
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 10);
  
  let report = `# GitHub 每日精选 - ${date}\n\n`;
  report += `> 基于聆风的兴趣领域：AI 内容创作、课程制作工具、效率自动化\n\n`;
  
  // Top 3 详细推荐
  report += `## 🔥 今日 Top 3\n\n`;
  
  topProjects.slice(0, 3).forEach((p, i) => {
    const medals = ['🥇', '🥈', '🥉'];
    report += `${medals[i]} **${p.name}**\n\n`;
    report += `- **链接**: ${p.url}\n`;
    report += `- **Stars**: ⭐ ${p.stars.toLocaleString()}\n`;
    report += `- **语言**: ${p.language || 'N/A'}\n`;
    report += `- **分类**: ${p.category}\n`;
    report += `- **简介**: ${p.description}\n`;
    
    // 个性化推荐理由
    const reasons = getRecommendationReason(p);
    report += `- **推荐理由**: ${reasons}\n\n`;
  });
  
  // 其他项目
  report += `---\n\n`;
  report += `## 📦 其他值得关注的\n\n`;
  report += `| 项目名称 | Stars | 分类 | 一句话简介 |\n`;
  report += `|---------|-------|------|-----------|\n`;
  
  topProjects.slice(3).forEach(p => {
    const shortDesc = p.description.length > 30 
      ? p.description.slice(0, 30) + '...' 
      : p.description;
    report += `| [${p.name}](${p.url}) | ⭐ ${(p.stars/1000).toFixed(1)}k | ${p.category} | ${shortDesc} |\n`;
  });
  
  // 今日洞察
  report += `\n---\n\n`;
  report += `## 💡 今日洞察\n\n`;
  report += generateInsights(topProjects);
  
  return report;
}

// 个性化推荐理由
function getRecommendationReason(project) {
  const reasons = {
    'AI图像': '与即梦课程直接相关，可用于 AI 绘图教学',
    'AI视频': 'AI 直播课程内容素材，值得研究',
    'AI绘图': 'Stable Diffusion 相关，课程核心技术',
    'ComfyUI': '工作流可视化，适合课程演示',
    '内容工具': '提升课程文档制作效率',
    '演示工具': '可用于课程 PPT 制作',
    '自动化': '减少重复工作，提升备课效率',
    '前端组件': '课程展示页面可用',
    '数据可视化': '教学演示效果增强'
  };
  
  return reasons[project.category] || '技术趋势值得关注';
}

// 生成洞察
function generateInsights(projects) {
  const categories = {};
  projects.forEach(p => {
    categories[p.category] = (categories[p.category] || 0) + 1;
  });
  
  const topCategory = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])[0];
  
  let insights = `- **热门方向**: 今天 ${topCategory?.[0] || 'AI'} 类项目较多，说明这个领域活跃度高\n`;
  
  // 检查是否有中文项目
  const hasChinese = projects.some(p => 
    p.description?.includes('中文') || 
    p.description?.includes('Chinese')
  );
  
  if (hasChinese) {
    insights += `- **中文生态**: 发现中文友好的项目，对国内用户更友好\n`;
  }
  
  insights += `- **建议关注**: 可以挑选 1-2 个项目实际体验，记录使用感受用于课程内容\n`;
  
  return insights;
}

// 主流程
async function main() {
  console.log('='.repeat(60));
  console.log('GitHub 每日项目推荐');
  console.log('='.repeat(60));
  console.log();
  
  const allProjects = [];
  
  // 逐个搜索
  for (const { q, category, weight } of CONFIG.searchQueries) {
    console.log(`🔍 搜索: ${category}`);
    const projects = await searchProjects(q, category);
    
    // 根据权重添加多次（增加被选中的概率）
    for (let i = 0; i < weight; i++) {
      allProjects.push(...projects);
    }
    
    console.log(`   ✅ ${projects.length} 个项目`);
    await sleep(1000); // 避免请求过快
  }
  
  // 去重
  const uniqueProjects = Array.from(
    new Map(allProjects.map(p => [p.fullName, p])).values()
  );
  
  console.log(`\n📊 总共: ${uniqueProjects.length} 个独特项目`);
  
  if (uniqueProjects.length === 0) {
    console.log('❌ 未找到项目');
    return;
  }
  
  // 生成报告
  console.log('\n📝 生成报告...');
  const report = generateReport(uniqueProjects);
  
  // 保存
  await fs.mkdir(CONFIG.outputDir, { recursive: true });
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const filepath = path.join(CONFIG.outputDir, `github-daily-${dateStr}.md`);
  
  await fs.writeFile(filepath, report, 'utf8');
  
  console.log(`\n✅ 已保存: ${filepath}`);
  console.log('\n预览:');
  console.log(report.slice(0, 800));
  console.log('...');
}

main().catch(console.error);
