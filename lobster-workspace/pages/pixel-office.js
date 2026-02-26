export default function PixelOffice() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">🦞 龙虾办公室</h1>
        
        {/* 办公室场景 */}
        <div className="relative bg-[#16213e] rounded-lg p-8 min-h-[400px]">
          
          {/* 办公桌区域 */}
          <div className="absolute top-8 left-8 bg-[#0f3460] p-4 rounded">
            <div className="text-4xl mb-2">🖥️</div>
            <div className="text-xs text-gray-400">工作台</div>
          </div>
          
          {/* 沙发区域 */}
          <div className="absolute top-8 right-8 bg-[#0f3460] p-4 rounded">
            <div className="text-4xl mb-2">🛋️</div>
            <div className="text-xs text-gray-400">休息区</div>
          </div>
          
          {/* 书架区域 */}
          <div className="absolute bottom-8 left-8 bg-[#0f3460] p-4 rounded">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-xs text-gray-400">知识库</div>
          </div>
          
          {/* 咖啡机区域 */}
          <div className="absolute bottom-8 right-8 bg-[#0f3460] p-4 rounded">
            <div className="text-4xl mb-2">☕</div>
            <div className="text-xs text-gray-400">咖啡角</div>
          </div>
          
          {/* 龙虾小人 - 当前位置 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-6xl animate-bounce">🦞</div>
            <div className="mt-2 px-3 py-1 bg-[#e94560] rounded-full text-sm">
              工作中
            </div>
          </div>
          
        </div>
        
        {/* 状态说明 */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-[#16213e] p-3 rounded text-center">
            <div className="text-2xl mb-1">🖥️</div>
            <div className="text-xs">整理文档</div>
          </div>
          <div className="bg-[#16213e] p-3 rounded text-center">
            <div className="text-2xl mb-1">🔍</div>
            <div className="text-xs">搜索信息</div>
          </div>
          <div className="bg-[#16213e] p-3 rounded text-center">
            <div className="text-2xl mb-1">💬</div>
            <div className="text-xs">与用户对话</div>
          </div>
          <div className="bg-[#16213e] p-3 rounded text-center">
            <div className="text-2xl mb-1">😴</div>
            <div className="text-xs">待命休息</div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
