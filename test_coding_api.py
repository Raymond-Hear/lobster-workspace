#!/usr/bin/env python3
"""
测试 Coding Plan API 端点
"""
import json
import urllib.request
import ssl

API_KEY = "05f1de964c5943eeb9f4de72b261f82a.tRpC9pcfalFYISev"

def test_api(base_url, model):
    """测试 API"""
    url = f"{base_url}/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    data = {
        "model": model,
        "messages": [
            {"role": "user", "content": "你好"}
        ],
        "max_tokens": 20
    }
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    print(f"\n测试: {base_url}")
    print(f"模型: {model}")
    
    try:
        req = urllib.request.Request(
            url, 
            data=json.dumps(data).encode('utf-8'), 
            headers=headers, 
            method='POST'
        )
        
        with urllib.request.urlopen(req, timeout=30, context=ctx) as response:
            result = json.loads(response.read().decode())
            print(f"✅ 成功: {result['choices'][0]['message']['content'][:30]}...")
            return True
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode()
        print(f"❌ HTTP {e.code}: {error_msg[:100]}")
        return False
    except Exception as e:
        print(f"❌ 错误: {e}")
        return False

print("=" * 60)
print("测试 Coding Plan API")
print("=" * 60)

# 测试 Coding Plan 端点
test_api("https://open.bigmodel.cn/api/coding/paas/v4", "glm-5")
test_api("https://open.bigmodel.cn/api/coding/paas/v4", "glm-4")

# 测试普通端点（对比）
print("\n" + "=" * 60)
test_api("https://open.bigmodel.cn/api/paas/v4", "glm-5")
test_api("https://open.bigmodel.cn/api/paas/v4", "glm-4-flash")
