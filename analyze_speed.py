#!/usr/bin/env python3
"""
分析响应慢的原因
"""
import json
import urllib.request
import ssl
import time

API_KEY = "05f1de964c5943eeb9f4de72b261f82a.tRpC9pcfalFYISev"

def test_api_timing(base_url, model, prompt_type="simple"):
    """测试 API 响应时间"""
    url = f"{base_url}/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    if prompt_type == "simple":
        content = "你好"
        max_tokens = 20
    else:  # batch - 模拟批量分析
        content = """请对以下5篇技术文章进行评分（1-10分）和分类：

1. 标题: Kimwolf Botnet Swamps Anonymity Network I2P
   来源: krebsonsecurity.com

2. 标题: Patch Tuesday, February 2026 Edition
   来源: krebsonsecurity.com

3. 标题: Finding and Fixing Ghostty's Largest Memory Leak
   来源: mitchellh.com

4. 标题: My AI Adoption Journey
   来源: mitchellh.com

5. 标题: Ghostty Is Now Non-Profit
   来源: mitchellh.com

请用 JSON 数组格式回复。"""
        max_tokens = 1000
    
    data = {
        "model": model,
        "messages": [
            {"role": "system", "content": "你是一个技术资讯分析助手。"},
            {"role": "user", "content": content}
        ],
        "temperature": 0.7,
        "max_tokens": max_tokens
    }
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    print(f"\n测试: {model} @ {base_url.split('/')[-3]}")
    print(f"Prompt: {prompt_type}, max_tokens: {max_tokens}")
    
    start = time.time()
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode(), headers=headers, method='POST')
        with urllib.request.urlopen(req, timeout=120, context=ctx) as response:
            result = json.loads(response.read().decode())
            elapsed = time.time() - start
            content_len = len(result['choices'][0]['message']['content'])
            print(f"✅ 成功! 耗时: {elapsed:.2f}秒, 返回: {content_len} 字符")
            return elapsed
    except Exception as e:
        elapsed = time.time() - start
        print(f"❌ 失败! 耗时: {elapsed:.2f}秒, 错误: {e}")
        return None

# 测试 RSS 源访问速度
def test_rss_timing(name, url):
    """测试 RSS 源访问速度"""
    print(f"\n测试 RSS: {name}")
    print(f"URL: {url[:50]}...")
    start = time.time()
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as response:
            data = response.read()
            elapsed = time.time() - start
            print(f"✅ 成功! 耗时: {elapsed:.2f}秒, 大小: {len(data)} 字节")
            return elapsed
    except Exception as e:
        elapsed = time.time() - start
        print(f"❌ 失败! 耗时: {elapsed:.2f}秒, 错误: {str(e)[:50]}")
        return None

print("=" * 60)
print("分析响应慢的原因")
print("=" * 60)

# 1. 测试简单 vs 批量 prompt
print("\n" + "=" * 60)
print("1. 测试 API 响应时间 - Coding Plan")
print("=" * 60)
test_api_timing("https://open.bigmodel.cn/api/coding/paas/v4", "glm-4-flash", "simple")
test_api_timing("https://open.bigmodel.cn/api/coding/paas/v4", "glm-4-flash", "batch")

# 2. 测试 RSS 源访问速度
print("\n" + "=" * 60)
print("2. 测试 RSS 源访问速度")
print("=" * 60)
rss_sources = [
    ("simonwillison.net (美国)", "https://simonwillison.net/atom/everything/"),
    ("krebsonsecurity.com (美国)", "https://krebsonsecurity.com/feed/"),
    ("mitchellh.com (美国)", "https://mitchellh.com/feed.xml"),
    ("dynomight.net (美国)", "https://dynomight.net/feed.xml"),
    ("xeiaso.net (美国)", "https://xeiaso.net/blog.rss"),
]
for name, url in rss_sources:
    test_rss_timing(name, url)

print("\n" + "=" * 60)
print("分析完成")
print("=" * 60)
