#!/usr/bin/env node
/**
 * 大咖知识库抓取器
 * 定期抓取 Dan Koe, Lenny Rachitsky, Naval, Karpathy 的内容
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// 配置
const CONFIG = {
  // RSS 源配置
  feeds: [
    // 个人成长/思维类
    {
      name: "Dan Koe",
      type: "substack",
      rssUrl: "https://letters.thedankoe.com/feed",
      blogUrl: "https://thedankoe.com/blog/",
      twitter: "thedankoe",
      category: "个人成长"
    },
    {
      name: "Naval Ravikant",
      type: "blog",
      rssUrl: "", // 待查找
      blogUrl: "https://nav.al/",
      twitter: "naval",
      category: "思维/哲学"
    },
    
    // 产品/创业类
    {
      name: "Lenny Rachitsky", 
      type: "substack",
      rssUrl: "https://www.lennysnewsletter.com/feed",
      twitter: "lennysan",
      category: "产品管理"
    },
    {
      name: "Paul Graham",
      type: "blog",
      rssUrl: "https://filipesilva.github.io/paulgraham-rss/feed.rss",
      blogUrl: "https://paulgraham.com/articles.html",
      twitter: "paulg",
      category: "创业/编程"
    },
    {
      name: "Sam Altman",
      type: "blog",
      rssUrl: "https://blog.samaltman.com/posts.atom",
      blogUrl: "https://blog.samaltman.com/",
      twitter: "sama",
      category: "AI/创业"
    },
    {
      name: "Andrew Chen",
      type: "substack",
      rssUrl: "https://andrewchen.substack.com/feed",
      blogUrl: "https://andrewchen.com/",
      twitter: "andrewchen",
      category: "增长/投资"
    },
    {
      name: "Ben Horowitz (a16z)",
      type: "substack",
      rssUrl: "https://www.a16z.news/feed",
      blogUrl: "https://a16z.com/author/ben-horowitz/",
      twitter: "bhorowitz",
      category: "创业/管理"
    },
    
    // AI/技术类
    {
      name: "Andrej Karpathy",
      type: "youtube",
      rssUrl: "", // YouTube 需要单独处理
      youtubeChannel: "@AndrejKarpathy",
      twitter: "karpathy",
      blogUrl: "https://karpathy.ai/",
      category: "AI/技术"
    }
  ],
  
  // 输出配置
  outputDir: "/root/.openclaw/workspace/knowledge-base",
  
  // 抓取配置
  fetchTimeout: 15000,
  userAgent: "Mozilla/5.0 (compatible; KnowledgeBot/1.0)"
};

// 工具函数
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : require('http');
    const req = client.get(url, { 
      timeout: CONFIG.fetchTimeout,
      headers: { 'User-Agent': CONFIG.userAgent }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(CONFIG.fetchTimeout, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// 解析 RSS
function parseRSS(xml, sourceName) {
  const items = [];
  const isAtom = xml.includes('<feed') && xml.includes('xmlns="http://www.w3.org/2005/Atom"');
  
  if (isAtom) {
    // Atom 格式
    const entryPattern = /<entry[\s>]/gi;
    let match;
    while ((match = entryPattern.exec(xml)) !== null) {
      const startIdx = match.index;
      const endMatch = xml.slice(startIdx).match(/<\/entry>/);
      if (!endMatch) continue;
      
      const entryXml = xml.slice(startIdx, startIdx + endMatch.index + endMatch[0].length);
      
      const titleMatch = entryXml.match(/<title[^>]*>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].trim() : '';
      
      const linkMatch = entryXml.match(/<link[^>]*href="([^"]+)"[^>]*>/);
      const link = linkMatch ? linkMatch[1] : '';
      
      const dateMatch = entryXml.match(/<published>([^<]+)<\/published>/) || 
                        entryXml.match(/<updated>([^<]+)<\/updated>/);
      const pubDate = dateMatch ? dateMatch[1] : '';
      
      const contentMatch = entryXml.match(/<content[^>]*>([\s\S]*?)<\/content>/);
      const content = contentMatch ? contentMatch[1].replace(/<[^>]*>/g, '') : '';
      
      if (title) {
        items.push({ title, link, pubDate, content, source: sourceName });
      }
    }
  } else {
    // RSS 2.0 格式
    const itemPattern = /<item[\s>]/gi;
    let match;
    while ((match = itemPattern.exec(xml)) !== null) {
      const startIdx = match.index;
      const endMatch = xml.slice(startIdx).match(/<\/item>/);
      if (!endMatch) continue;
      
      const itemXml = xml.slice(startIdx, startIdx + endMatch.index + endMatch[0].length);
      
      const titleMatch = itemXml.match(/<title><!\[CDATA\[([^\]]+)\]\]><\/title>/) || 
                         itemXml.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].trim() : '';
      
      const linkMatch = itemXml.match(/<link>([^<]+)<\/link>/) ||
                        itemXml.match(/<link[^>]*href="([^"]+)"[^>]*\/>/);
      const link = linkMatch ? linkMatch[1] : '';
      
      const dateMatch = itemXml.match(/<pubDate>([^<]+)<\/pubDate>/);
      const pubDate = dateMatch ? dateMatch[1] : '';
      
      const descMatch = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                         itemXml.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) ||
                         itemXml.match(/<description>([\s\S]*?)<\/description>/);
      const content = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').slice(0, 2000) : '';
      
      if (title) {
        items.push({ title, link, pubDate, content, source: sourceName });
      }
    }
  }
  
  return items;
}

// 生成 Markdown 内容
function generateMarkdown(article) {
  const date = new Date(article.pubDate).toLocaleDateString('zh-CN');
  
  return `# ${article.title}

**作者**: ${article.source}  
**发布日期**: ${date}  
**原文链接**: ${article.link}

---

${article.content}

---

*抓取时间: ${new Date().toLocaleString('zh-CN')}*
`;
}

// 保存为 Markdown 文件
async function saveArticle(article) {
  const date = new Date();
  const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  const dir = path.join(CONFIG.outputDir, yearMonth);
  
  await fs.mkdir(dir, { recursive: true });
  
  // 清理文件名
  const cleanTitle = article.title
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);
  
  const filename = `${article.source.replace(/\s+/g, '')}-${cleanTitle}.md`;
  const filepath = path.join(dir, filename);
  
  const content = generateMarkdown(article);
  await fs.writeFile(filepath, content, 'utf8');
  
  console.log(`  💾 已保存: ${filepath}`);
  return filepath;
}

// 主流程
async function main() {
  console.log('='.repeat(60));
  console.log('大咖知识库抓取器');
  console.log('='.repeat(60));
  console.log();
  
  const allArticles = [];
  
  for (const feed of CONFIG.feeds) {
    if (!feed.rssUrl) {
      console.log(`⏭️ 跳过 ${feed.name} (无 RSS)`);
      continue;
    }
    
    try {
      console.log(`📰 抓取: ${feed.name}`);
      const xml = await fetchUrl(feed.rssUrl);
      const items = parseRSS(xml, feed.name);
      console.log(`   ✅ ${items.length} 篇文章`);
      
      // 只取最近 5 篇
      for (const item of items.slice(0, 5)) {
        allArticles.push(item);
      }
      
      await sleep(1000);
    } catch (e) {
      console.log(`   ❌ ${e.message}`);
    }
  }
  
  console.log(`\n📚 总共: ${allArticles.length} 篇文章`);
  
  if (allArticles.length === 0) {
    console.log('没有新文章');
    return;
  }
  
  // 保存文章
  console.log('\n💾 保存文章...\n');
  for (const article of allArticles) {
    try {
      await saveArticle(article);
    } catch (e) {
      console.log(`   ❌ 保存失败: ${e.message}`);
    }
  }
  
  console.log('\n✅ 完成!');
}

main().catch(console.error);
