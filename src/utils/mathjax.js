// @ts-nocheck
// mathJax全局配置文件
window.MathJax = {
    tex: {
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
        ], // 行内公式选择符
        displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
        ], // 段内公式选择符
    },
    startup: {
        ready() {
            MathJax.startup.defaultReady();
        },
    },
};
