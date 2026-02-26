#!/usr/bin/env python3
"""
测试 GLM-5 API
"""
import json
import urllib.request
import ssl

API_KEY = "05f1de964c5943eeb9f4de72b261f82a.tRpC9pcfalFYISev"

def test_glm(model):
    """测试指定模型"""
    url = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    data = {
        "model": model,
        "messages": [
            {"role": "user", "content": "你好，请用一句话介绍自己"}
        ],
        "max_tokens": 50
    }
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    try:
        req = urllib.request.Request(
            url, 
            data=json.dumps(data).encode('utf-8'), 
            headers=headers, 
            method='POST'
        )
        
        with urllib.request.urlopen(req, timeout=30, context=ctx) as response:
            result = json.loads(response.read().decode())
            print(f"✅ {model}: {result['choices'][0]['message']['content'][:50]}...")
            return True
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode()
        print(f"❌ {model}: {error_msg}")
        return False
    except Exception as e:
        print(f"❌ {model}: {e}")
        return False

print("=" * 60)
print("测试 GLM 模型")
print("=" * 60)
print()

models = ['glm-4-flash', 'glm-4', 'glm-4.5', 'glm-4.5-air', 'glm-4.6', 'glm-4.7', 'glm-5']
for model in models:
    test_glm(model)
    print()
