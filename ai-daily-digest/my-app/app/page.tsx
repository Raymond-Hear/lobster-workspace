import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  tags: string[];
}

const todayNews: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI 发布 GPT-4.5 预览版，推理能力大幅提升",
    summary: "OpenAI 今日发布 GPT-4.5 预览版本，在数学推理和代码生成方面表现显著优于前代模型。新模型支持 256k 上下文窗口。",
    source: "OpenAI Blog",
    url: "https://openai.com/blog",
    tags: ["大模型", "OpenAI"],
  },
  {
    id: "2",
    title: "Google DeepMind 推出 Gemini 2.0 Pro",
    summary: "Google 发布 Gemini 2.0 Pro，声称在多模态理解和长文本处理上超越 GPT-4。支持原生图像和视频理解。",
    source: "Google AI",
    url: "https://ai.googleblog.com",
    tags: ["多模态", "Google"],
  },
  {
    id: "3",
    title: "Anthropic 开源 Claude 3.5 架构细节",
    summary: "Anthropic 罕见地公开了 Claude 3.5 的技术架构，包括混合专家模型设计和 Constitutional AI 训练方法。",
    source: "Anthropic",
    url: "https://www.anthropic.com/news",
    tags: ["开源", "Anthropic"],
  },
  {
    id: "4",
    title: "Meta 发布 Llama 4 系列模型",
    summary: "Meta 发布 Llama 4 系列，包括 8B、70B 和 400B 三个版本。400B 版本在多项基准测试中接近 GPT-4 水平。",
    source: "Meta AI",
    url: "https://ai.meta.com/blog",
    tags: ["开源", "Meta", "Llama"],
  },
  {
    id: "5",
    title: "xAI 完成 60 亿美元融资，估值达 500 亿美元",
    summary: "马斯克旗下 xAI 宣布完成新一轮 60 亿美元融资，资金将用于建设 Memphis 超级计算集群。",
    source: "TechCrunch",
    url: "https://techcrunch.com",
    tags: ["融资", "xAI"],
  },
];

export default function Home() {
  const today = new Date().toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AI Daily Digest
              </h1>
              <p className="text-sm text-zinc-400 mt-1">全球人工智能行业每日精选</p>
            </div>
            <div className="text-right">
              <p className="text-zinc-300">{today}</p>
              <p className="text-xs text-zinc-500">每日更新</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Section Title */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🔥</span>
          <h2 className="text-xl font-semibold">今日头条</h2>
        </div>

        {/* News Grid */}
        <div className="grid gap-4">
          {todayNews.map((news) => (
            <article
              key={news.id}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {news.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-medium mb-2 text-zinc-100">
                <Link
                  href={news.url}
                  target="_blank"
                  className="hover:text-blue-400 transition-colors"
                >
                  {news.title}
                </Link>
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                {news.summary}
              </p>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>来源: {news.source}</span>
                <Link
                  href={news.url}
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300"
                >
                  阅读原文 →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
          <p>AI Daily Digest · 每日精选全球 AI 行业要闻</p>
          <p className="mt-2">数据来源: OpenAI, Google, Anthropic, Meta, TechCrunch</p>
        </footer>
      </div>
    </main>
  );
}
