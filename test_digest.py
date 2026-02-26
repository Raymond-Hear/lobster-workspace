#!/usr/bin/env python3
"""
简化版 AI Daily Digest - 用于测试 GLM API
"""
import os
import sys
import json
import urllib.request
import urllib.error
from datetime import datetime, timedelta

# 测试几个 RSS 源
RSS_FEEDS = [
    {"name": "simonwillison.net", "xmlUrl": "https://simonwillison.net/atom/everything/"},
    {"name": "krebsonsecurity.com", "xmlUrl": "https://krebsonsecurity.com/feed/"},
    {"name": "overreacted.io", "xmlUrl": "https://overreacted.io/rss.xml"},
]

def fetch_feed(url, timeout=15):
    """获取 RSS feed"""
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=timeout) as response:
            return response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return f"Error: {e}"

def call_glm(prompt, api_key):
    """调用 GLM API"""
    url = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    data = {
        "model": "glm-4",
        "messages": [
            {"role": "system", "content": "你是一个技术资讯分析助手。"},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }
    
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode(), headers=headers, method='POST')
        with urllib.request.urlopen(req, timeout=60) as response:
            result = json.loads(response.read().decode())
            return result['choices'][0]['message']['content']
    except Exception as e:
        return f"API Error: {e}"

def main():
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        print("Error: OPENAI_API_KEY not set")
        sys.exit(1)
    
    print("=" * 60)
    print("AI Daily Digest - 测试版")
    print("=" * 60)
    print(f"时间: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print()
    
    # 测试 GLM API
    print("正在测试 GLM API...")
    test_response = call_glm("你好，请用一句话介绍自己。", api_key)
    print(f"API 测试: {test_response[:100]}...")
    print()
    
    # 获取 RSS
    print("正在获取 RSS feeds...")
    for feed in RSS_FEEDS:
        print(f"\n📰 {feed['name']}")
        content = fetch_feed(feed['xmlUrl'])
        if content.startswith("Error"):
            print(f"  ❌ {content}")
        else:
            print(f"  ✅ 获取成功 ({len(content)} 字符)")
            # 提取标题
            if '<title>' in content:
                import re
                titles = re.findall(r'<title>([^<]+)</title>', content)
                for title in titles[:3]:
                    print(f"     - {title}")
    
    print("\n" + "=" * 60)
    print("测试完成")
    print("=" * 60)

if __name__ == "__main__":
    main()
