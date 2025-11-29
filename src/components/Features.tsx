import { Card, CardContent } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Customer Insights",
      description: "Analyze customer interactions across touchpoints with the platform"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Product Metrics",
      description: "Track your product's performance in real-time"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Campaign Optimization",
      description: "Measure campaign success with key metrics like conversion"
    }
  ]

  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-1/4 w-72 h-72 border border-orange-500/10 rotate-45 rounded-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 border border-red-500/10 -rotate-12 rounded-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <span className="text-orange-400 text-sm font-medium">Take Full Control of Your Tools</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Application</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our users love how Notion CRM simplifies their processes and streamlines operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 border-gray-800 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group"
            >
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-lg flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Improved Decision Making Section */}
        <div className="mt-24 grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <span className="text-orange-400 text-sm font-medium">Data Insights</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Improved <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">decision-making</span>
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              By leveraging real-time insights and comprehensive data analysis, you can make informed decisions with confidence, reducing uncertainty.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Comprehensive Data Visualization</h4>
                  <p className="text-gray-400 text-sm">
                    With advanced visualization tools, complex datasets are easy to understand
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Predictive Modeling</h4>
                  <p className="text-gray-400 text-sm">
                    Leverage cutting-edge predictive analytics to forecast future trends and outcomes
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="mb-6">
                <div className="text-gray-400 text-sm mb-2">Increased decision-making</div>
                <div className="flex items-end gap-2">
                  <div className="text-5xl font-bold text-white">85%</div>
                  <div className="text-green-500 text-sm mb-2 flex items-center gap-1">
                    +9%
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-1">Speed</div>
                  <div className="text-white font-semibold text-lg">Fast</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-1">Revenue</div>
                  <div className="text-white font-semibold text-lg">$289k</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-xs mb-1">Insight</div>
                  <div className="text-white font-semibold text-lg">High</div>
                </div>
              </div>

              <div className="relative h-48 bg-gradient-to-t from-orange-500/20 to-transparent rounded-lg overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-500/40 to-orange-500/10 rounded-t-3xl"></div>
                <div className="absolute inset-0 flex items-end justify-center gap-1 pb-4">
                  {[40, 60, 45, 80, 55, 75, 90].map((height, i) => (
                    <div
                      key={i}
                      className="w-8 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating accent */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
