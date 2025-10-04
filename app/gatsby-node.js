exports.onCreateDevServer = ({ app }) => {
  app.use((_, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    next();
  });
};
