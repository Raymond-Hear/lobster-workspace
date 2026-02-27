export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 border-b pb-6">
          <h1 className="text-3xl font-bold mb-2">🦞 龙虾工作台</h1>
          <p className="text-gray-600">每日精选内容聚合 · 最后更新: 2026-02-27</p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-12 text-center">
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold">15</div>
            <div className="text-sm text-gray-600">今日文章</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold">10</div>
            <div className="text-sm text-gray-600">GitHub项目</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-gray-600">大咖文章</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-gray-600">运行任务</div>
          </div>
        </div>

        {/* AI Daily */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">📰 AI 博客日报</h2>
            <span className="text-sm text-gray-500">07:00 更新</span>
          </div>
          
          <ul className="space-y-4">
            <li>
              <a href="https://simonwillison.net/2026/Feb/26/andrej-karpathy/" target="_blank" className="block p-4 border rounded hover:bg-gray-50 transition-colors">
                <div className="font-medium mb-1">Andrej Karpathy 最新观点：AI 发展的关键转折点</div>
                <div className="text-sm text-gray-600">simonwillison.net · AI 领域顶级专家的技术思考</div>
              </a>
            </li>
            <li>
              <a href="https://simonwillison.net/2026/Feb/26/google-api-keys/" target="_blank" className="block p-4 border rounded hover:bg-gray-50 transition-colors">
                <div className="font-medium mb-1">Google Gemini 突然收紧 API Key 安全策略</div>
                <div className="text-sm text-gray-600">simonwillison.net · 开发者面临密钥重置危机</div>
              </a>
            </li>
            <li>
              <a href="https://daringfireball.net" target="_blank" className="block p-4 border rounded hover:bg-gray-50 transition-colors">
                <div className="font-medium mb-1">NATO 正式批准 iPhone/iPad 处理机密信息</div>
                <div className="text-sm text-gray-600">daringfireball.net · 苹果设备安全性获军方认证</div>
              </a>
            </li>
            <li>
              <a href="https://daringfireball.net" target="_blank" className="block p-4 border rounded hover:bg-gray-50 transition-colors">
                <div className="font-medium mb-1">"被放逐的乔布斯"：NeXT 时期如何塑造了今天的苹果</div>
                <div className="text-sm text-gray-600">daringfireball.net · 关于史蒂夫·乔布斯被放逐时期的故事</div>
              </a>
            </li>
          </ul>
          
          <a href="/output/digest-20260227.md" className="inline-block mt-4 px-4 py-2 border rounded hover:bg-gray-50 transition-colors">
            查看全部 →
          </a>
        </section>

        {/* GitHub Projects */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">💻 GitHub 每日精选</h2>
            <span className="text-sm text-gray-500">10:00 更新</span>
          </div>
          
          <ul className="space-y-4">
            <li>
              <a href="https://github.com/n8n-io/n8n" target="_blank" className="block p-4 border rounded hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">n8n</span>
                  <span className="text-sm text-gray-600">⭐ 176.5k</span>
                </div>
                <div className="text-sm text-gray-600">自动化工作流平台，400+ 集成，可减少备课重复工作</div>
              </a>
            </li>
            <li>
              <a href="https://github.com/grafana/grafana" target="_blank" className="block p-4 border rounded hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Grafana</span>
                  <span className="text-sm text-gray-600">⭐ 72.4k</span>
                </div>
                <div className="text-sm text-gray-600">数据可视化平台，可用于课程演示效果增强</div>
              </a>
            </li>
            <li>
              <a href="https://github.com/metabase/metabase" target="_blank" className="block p-4 border rounded hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Metabase</span>
                  <span className="text-sm text-gray-600">⭐ 46.2k</span>
                </div>
                <div className="text-sm text-gray-600">开源 BI 工具，数据分析教学可用</div>
              </a>
            </li>
            <li>
              <a href="https://github.com/invoke-ai/InvokeAI" target="_blank" className="block p-4 border rounded hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">InvokeAI</span>
                  <span className="text-sm text-gray-600">⭐ 26.8k</span>
                </div>
                <div className="text-sm text-gray-600">AI 绘图引擎，与即梦课程直接相关</div>
              </a>
            </li>
          </ul>
          
          <a href="/github-daily/github-daily-20260227.md" className="inline-block mt-4 px-4 py-2 border rounded hover:bg-gray-50 transition-colors">
            查看全部 →
          </a>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t text-center text-sm text-gray-500">
          <p>🦞 龙虾工作台 · 每日自动更新</p>
        </footer>

      </div>
    </div>
  )
}