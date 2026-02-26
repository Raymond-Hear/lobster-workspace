#!/usr/bin/env python3
"""
诊断 GLM API 问题
"""
import json
import urllib.request
import urllib.error
import ssl

API_KEY = "05f1de964c5943eeb9f4de72b261f82a.tRpC9pcfalFYISev"

def test_glm_simple():
    """简单测试 GLM API"""
    url = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    data = {
        "model": "glm-4",
        "messages": [
            {"role": "user", "content": "你好"}
        ],
        "max_tokens": 50
    }
    
    try:
        req = urllib.request.Request(
            url, 
            data=json.dumps(data).encode('utf-8'), 
            headers=headers, 
            method='POST'
        )
        
        # 禁用 SSL 验证（测试用）
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        
        with urllib.request.urlopen(req, timeout=30, context=ctx) as response:
            result = json.loads(response.read().decode())
            print("✅ API 调用成功")
            print(f"响应: {result['choices'][0]['message']['content'][:50]}...")
            return True
            
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error: {e.code}")
        print(f"错误信息: {e.read().decode()}")
        return False
    except Exception as e:
        print(f"❌ 其他错误: {e}")
        return False

def test_glm_models():
    """测试获取模型列表"""
    url = "https://open.bigmodel.cn/api/paas/v4/models"
    headers = {
        "Authorization": f"Bearer {API_KEY}"
    }
    
    try:
        req = urllib.request.Request(url, headers=headers)
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        
        with urllib.request.urlopen(req, timeout=30, context=ctx) as response:
            result = json.loads(response.read().decode())
            print("✅ 获取模型列表成功")
            print(f"可用模型: {[m['id'] for m in result.get('data', [])[:5]]}")
            return True
    except Exception as e:
        print(f"❌ 获取模型列表失败: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("GLM API 诊断")
    print("=" * 60)
    print()
    
    print("测试 1: 简单对话...")
    test_glm_simple()
    print()
    
    print("测试 2: 获取模型列表...")
    test_glm_models()
