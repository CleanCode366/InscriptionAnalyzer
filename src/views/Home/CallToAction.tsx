import type React from "react";

const CallToAction: React.FC = () => {
    return(
        <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r bg-primary-text rounded-2xl p-12 border border-slate-700/50 backdrop-blur-sm">
                <h3 className="text-3xl font-bold mb-4">Ready to Make History?</h3>
                <p className="text-xl text-primary-text-dark/45 mb-8 max-w-2xl mx-auto">
                Every inscription tells a story. Every translation unlocks wisdom. 
                Every contribution helps preserve our shared human heritage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                    Start Contributing
                </button>
                <button className="border border-slate-600 hover:bg-slate-800/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all">
                    Learn More
                </button>
                </div>
            </div>
            </div>
        </section>
    )
}
export default CallToAction;