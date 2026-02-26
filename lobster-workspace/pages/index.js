export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  🦞 龙虾工作台
                </h1>
                <p className="text-gray-400 mt-1">每日精选内容聚合 · 最后更新: 2026-02-26 12:00</p>
              </div>
              <a 
                href="/pixel-office" 
                className="px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 rounded-lg border border-pink-500/50 transition-all"
              >
                🎮 查看状态
              </a>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: '今日文章', value: '15', icon: '📰', color: 'from-blue-400 to-cyan-400' },
            { label: 'GitHub项目', value: '10', icon: '⭐', color: 'from-yellow-400 to-orange-400' },
            { label: '大咖文章', value: '8', icon: '📚', color: 'from-green-400 to-emerald-400' },
            { label: '运行任务', value: '4', icon: '⚡', color: 'from-pink-400 to-rose-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* AI Daily */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">📰 AI 博客日报</h2>
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">07:00 更新</span>
            </div>
            <ul className="space-y-3">
              {[
                'Claude Code 推出远程控制功能',
                'tldraw 将测试移至闭源仓库引发讨论',
                '用"vibe coding"打造 macOS 演示应用',
                'AI 图像生成新进展：实时编辑',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm hover:bg-white/5 p-2 rounded transition-colors cursor-pointer">
                  <span className="text-blue-400 mt-0.5">▸</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-500/50 transition-all text-sm">
              查看全部 →
            </button>
          </div>

          {/* GitHub Projects */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">💻 GitHub 每日精选</h2>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">10:00 更新</span>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'n8n', stars: '176k', desc: '自动化工作流平台', tag: '效率工具' },
                { name: 'InvokeAI', stars: '26.8k', desc: 'AI 图像生成引擎', tag: 'AI绘图' },
                { name: 'react-bits', stars: '36.2k', desc: '动画 React 组件', tag: '前端' },
                { name: 'nanobrowser', stars: '12.3k', desc: 'AI 网页自动化', tag: '自动化' },
              ].map((project, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <div>
                    <div className="font-semibold text-purple-300">{project.name}</div>
                    <div className="text-xs text-gray-400">{project.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 text-sm">⭐ {project.stars}</div>
                    <div className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded mt-1">{project.tag}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg border border-purple-500/50 transition-all text-sm">
              查看全部 →
            </button>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>🦞 龙虾工作台 · 每天 12:00 自动更新</p>
        </footer>

      </div>
    </div>
  )
}
