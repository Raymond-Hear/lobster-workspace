#!/usr/bin/env python3
"""
测试 Coding Plan 端点 + glm-4-flash
"""
import json
import urllib.request
import ssl

API_KEY = "05f1de964c5943eeb9f4de72b261f82a.tRpC9pcfalFYISev"

def test_api(model):
    url = "https://open.bigmodel.cn/api/coding/paas/v4/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    data = {
        "model": model,
        "messages": [{"role": "user", "content": "你好"}],
        "max_tokens": 20
    }
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    print(f"\n测试 Coding Plan + {model}")
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode(), headers=headers, method='POST')
        with urllib.request.urlopen(req, timeout=30, context=ctx) as response:
            result = json.loads(response.read().decode())
            print(f"✅ 成功: {result['choices'][0]['message']['content'][:30]}...")
            return True
    except Exception as e:
        print(f"❌ 失败: {e}")
        return False

# 测试 Coding Plan 端点
test_api("glm-4-flash")
test_api("glm-4")
test_api("glm-5")
