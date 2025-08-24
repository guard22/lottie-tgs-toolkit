module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/lottie-tgs-toolkit/'
        : '/',
    outputDir: 'docs'
}