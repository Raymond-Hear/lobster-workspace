#!/usr/bin/env python3
"""
详细诊断 GLM API - 测试不同情况
"""
import json
import urllib.request
import urllib.error
import ssl

API_KEY = "05f1de964c5943eeb9f4de72b261f82a.tRpC9pcfalFYISev"

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def make_request(url, headers, data=None, method='GET'):
    """通用请求函数"""
    try:
        if data:
            data = json.dumps(data).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers=headers, method=method)
        with urllib.request.urlopen(req, timeout=30, context=ctx) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        return {'error': {'code': e.code, 'message': e.read().decode()}}
    except Exception as e:
        return {'error': {'message': str(e)}}

print("=" * 60)
print("GLM API 详细诊断")
print("=" * 60)
print()

# 1. 测试不同模型
models = ['glm-4', 'glm-4-flash', 'glm-4-air', 'glm-4.5-air']
for model in models:
    print(f"\n测试模型: {model}")
    url = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    data = {
        "model": model,
        "messages": [{"role": "user", "content": "你好"}],
        "max_tokens": 10
    }
    result = make_request(url, headers, data, 'POST')
    if 'error' in result:
        print(f"  ❌ 错误: {result['error']}")
    else:
        print(f"  ✅ 成功")

# 2. 测试流式 vs 非流式
print("\n" + "=" * 60)
print("测试流式模式...")
url = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}
data = {
    "model": "glm-4",
    "messages": [{"role": "user", "content": "你好"}],
    "stream": True,
    "max_tokens": 10
}
result = make_request(url, headers, data, 'POST')
print(f"流式结果: {result}")

# 3. 检查账户信息
print("\n" + "=" * 60)
print("测试账户信息接口...")
url = "https://open.bigmodel.cn/api/paas/v4/user/info"
headers = {"Authorization": f"Bearer {API_KEY}"}
result = make_request(url, headers)
print(f"账户信息: {json.dumps(result, indent=2, ensure_ascii=False)[:500]}")
