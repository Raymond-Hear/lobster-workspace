#!/usr/bin/env python3
"""
测试 Coding Plan glm-5 响应时间
"""
import json
import urllib.request
import ssl
import time

API_KEY = "05f1de964c5943eeb9f4de72b261f82a.tRpC9pcfalFYISev"

def test_glm5_timing():
    """测试 glm-5 响应时间"""
    url = "https://open.bigmodel.cn/api/coding/paas/v4/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    data = {
        "model": "glm-5",
        "messages": [
            {"role": "system", "content": "你是一个技术资讯分析助手。"},
            {"role": "user", "content": """请对以下技术文章进行评分（1-10分）和分类：
标题: Kimwolf Botnet Swamps Anonymity Network I2P
来源: krebsonsecurity.com

请用 JSON 格式回复：
{
  "score": 分数,
  "category": "分类(AI/ML/安全/工程/工具/观点/其他)",
  "summary": "一句话摘要"
}"""}
        ],
        "temperature": 0.7,
        "max_tokens": 500
    }
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    print("开始调用 glm-5...")
    start = time.time()
    
    try:
        req = urllib.request.Request(
            url, 
            data=json.dumps(data).encode('utf-8'), 
            headers=headers, 
            method='POST'
        )
        
        with urllib.request.urlopen(req, timeout=120, context=ctx) as response:
            result = json.loads(response.read().decode())
            elapsed = time.time() - start
            print(f"✅ 成功! 耗时: {elapsed:.2f}秒")
            print(f"响应: {result['choices'][0]['message']['content'][:200]}...")
            return True
    except Exception as e:
        elapsed = time.time() - start
        print(f"❌ 失败! 耗时: {elapsed:.2f}秒")
        print(f"错误: {e}")
        return False

if __name__ == "__main__":
    test_glm5_timing()
