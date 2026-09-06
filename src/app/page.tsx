export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* 顶部封面 */}
      <div className="relative bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
          <p className="text-amber-300 text-sm font-medium tracking-widest uppercase mb-4">动物驯化史</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            牛的起源
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl leading-relaxed">
            距今约 10,000 年前，人类第一次驯化了原牛，开启了一段延续万年的伙伴关系，
            深刻塑造了农业文明与人类历史的走向。
          </p>
          <div className="flex flex-wrap gap-6 mt-10 text-sm text-amber-200">
            <span>📖 约 10 分钟阅读</span>
            <span>•</span>
            <span>🌍 多地区独立驯化</span>
            <span>•</span>
            <span>🐂 六种家牛亚种</span>
          </div>
        </div>
        {/* 装饰图案 */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-50 to-transparent" />
      </div>

      {/* 正文内容 */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* 导语卡片 */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8 mb-12">
          <div className="flex items-start gap-4">
            <span className="text-5xl">🐄</span>
            <div>
              <h2 className="text-xl font-bold text-amber-900 mb-2">什么是牛？</h2>
              <p className="text-gray-600 leading-relaxed">
                牛（学名：Bos taurus）是牛科动物中最为人熟知的一类，是人类最早驯化的大型动物之一。
                从最初的猎物到耕田伙伴，再到奶肉来源，牛在人类文明中扮演了无可替代的角色。
                如今全球约有 <strong className="text-amber-700">15 亿头</strong>家牛，分布几乎覆盖所有大陆。
              </p>
            </div>
          </div>
        </div>

        {/* 章节一 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-200 text-amber-800 font-bold text-sm">01</span>
            <h2 className="text-3xl font-bold text-amber-950">野生祖先：原牛</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              所有家牛的祖先都是<strong className="text-amber-800 font-semibold">原牛</strong>（Aurochs，学名 Bos primigenius），
              一种体型巨大的野生牛类。雄性原牛肩高可达 1.8 米，体重超过 1 吨，双角向前弯曲呈新月形，
              遍布欧洲、亚洲和北非的森林与草原。
            </p>
            <p>
              古埃及壁画中就有原牛的身影，苏美尔人称之为"野生公牛"，古希腊人认为它是赫拉克勒斯的猎物之一。
              它们性格凶猛、领地意识极强，即便是狮子也不敢轻易挑衅成年公原牛。
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5 my-6">
              <p className="text-amber-900 font-medium mb-1">最后一头原牛于 1627 年死亡</p>
              <p className="text-amber-700 text-sm">波兰罗兹索瓦纳森林里的一头雌性原牛，标志着这一物种的灭绝。如今通过"退化育种"项目，科学家正尝试培育外观与基因接近原牛的牛种。</p>
            </div>
          </div>
        </section>

        {/* 章节二 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-200 text-amber-800 font-bold text-sm">02</span>
            <h2 className="text-3xl font-bold text-amber-950">驯化：改变人类命运的相遇</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              大约在 <strong className="text-amber-800">距今 10,500 至 10,000 年前</strong>，
              新月沃地（今伊拉克、叙利亚、土耳其东南部一带）的农民开始驯化当地的原牛种群。
              这是人类农业革命的重要组成部分——从狩猎采集走向定居农耕。
            </p>
            <p>
              最初被驯化的目的并非吃肉，而是<strong className="text-amber-800 font-semibold">劳动力</strong>。
              牛可以拉犁翻土，极大提高了农田开垦效率；也可以驮运重物，帮助人类扩大活动范围。
              随着时间推移，人们发现牛皮、牛乳、牛肉也都是宝贵的资源。
            </p>
            <p>
              遗传学研究揭示了一个有趣的事实：家牛的驯化可能发生了<strong className="text-amber-800 font-semibold">至少两次独立事件</strong>——
              一次在新月沃地驯化了印度谷牛（Taurine cattle），另一次在印度次大陆驯化了瘤牛（Zebu）。
              这意味着不同地区的古人几乎在同一时期，不约而同地选择了同一种野生动物作为伙伴。
            </p>
          </div>
        </section>

        {/* 章节三 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-200 text-amber-800 font-bold text-sm">03</span>
            <h2 className="text-3xl font-bold text-amber-950">牛的传播之路</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              驯化后的牛随着人类迁徙迅速扩散至世界各地：
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">→</span>
                <span><strong className="text-amber-900">欧洲</strong>：约 8,000 年前传入，成为新石器时代农业的核心牲畜</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">→</span>
                <span><strong className="text-amber-900">印度</strong>：瘤牛在此独立驯化，独特的驼峰使其适应炎热气候</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">→</span>
                <span><strong className="text-amber-900">非洲</strong>：撒哈拉地区岩画显示，公元前 6000 年牛已在那里被饲养</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">→</span>
                <span><strong className="text-amber-900">中国</strong>：约 5,000 年前出现家牛，殷商甲骨文中有大量"牛"字祭祀记录</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 章节四 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-200 text-amber-800 font-bold text-sm">04</span>
            <h2 className="text-3xl font-bold text-amber-950">牛在文明中的角色</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              牛在各大文明中都具有神圣地位：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="bg-white rounded-xl border border-amber-100 p-5">
                <h3 className="font-bold text-amber-900 mb-2">🕉️ 印度教</h3>
                <p className="text-gray-600 text-sm">牛被视为神圣的动物，是神力梵天的化身。禁止宰杀黄牛，牛车是太阳神的座驾。</p>
              </div>
              <div className="bg-white rounded-xl border border-amber-100 p-5">
                <h3 className="font-bold text-amber-900 mb-2">⚡ 古希腊</h3>
                <p className="text-gray-600 text-sm">宙斯化作白牛劫走腓尼基公主欧罗巴，欧洲（Europe）之名由此而来。</p>
              </div>
              <div className="bg-white rounded-xl border border-amber-100 p-5">
                <h3 className="font-bold text-amber-900 mb-2">☀️ 古埃及</h3>
                <p className="text-gray-600 text-sm">阿匹斯牛（Apis）被视为神明，享有最高规格供奉，死后以木乃伊仪式安葬。</p>
              </div>
              <div className="bg-white rounded-xl border border-amber-100 p-5">
                <h3 className="font-bold text-amber-900 mb-2">🏮 中国</h3>
                <p className="text-gray-600 text-sm">牛是十二生肖之一，地支排第「丑」。甲骨文中的「牛」字形象逼真，祭祀中牛是最隆重的供品。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 章节五 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-200 text-amber-800 font-bold text-sm">05</span>
            <h2 className="text-3xl font-bold text-amber-950">今天的牛</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              全球现有约 <strong className="text-amber-800">15 亿头</strong>家牛，分为两个主要亚种：
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">◈</span>
                <span><strong className="text-amber-900">黄牛（Taurine）</strong>：Bos taurus，源自新月沃地驯化，包括荷斯坦牛、安格斯牛等</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">◈</span>
                <span><strong className="text-amber-900">瘤牛（Zebu）</strong>：Bos indicus，源自印度驯化，肩部有驼峰，耐热耐旱</span>
              </li>
            </ul>
            <div className="bg-gradient-to-r from-amber-100 to-orange-50 rounded-xl p-6 mt-6 border border-amber-200">
              <p className="text-amber-900 font-bold text-lg mb-2">你知道吗？</p>
              <p className="text-amber-800">一头荷斯坦奶牛一生可产奶约 <strong>25 万升</strong>，相当于 100 个标准浴缸的水量。而中国本土的水牛，则是水稻农业的重要伙伴——没有牛，就没有稻作文明。</p>
            </div>
          </div>
        </section>

        {/* 结语 */}
        <section className="mb-16">
          <div className="bg-amber-900 text-white rounded-2xl p-10 text-center">
            <p className="text-3xl mb-4">🐂</p>
            <h2 className="text-2xl font-bold mb-4">万年的伙伴关系</h2>
            <p className="text-amber-100 leading-relaxed max-w-xl mx-auto">
              从凶猛的原牛到温顺的家牛，这段驯化史见证了人类智慧与自然力量的完美结合。
              牛不仅提供了食物与劳力，更深深嵌入宗教、文化、语言之中，成为人类文明不可或缺的一部分。
            </p>
          </div>
        </section>

        {/* 参考 */}
        <div className="border-t border-amber-200 pt-8 text-center text-sm text-gray-400">
          <p>参考资料：《剑桥插图动物史》《全球通史》、Nature 期刊家牛基因组研究</p>
        </div>
      </div>
    </div>
  );
}
