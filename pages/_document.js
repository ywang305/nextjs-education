import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Share+Tech+Mono&display=swap"
            rel="stylesheet"
          />
          <style>{`
            /* Cyberpunk Scan Lines */
            body::after {
              content: '';
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              z-index: 9999;
              background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 240, 255, 0.015) 2px,
                rgba(0, 240, 255, 0.015) 4px
              );
            }

            /* Neon Pulse Animation */
            @keyframes neonPulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.7; }
            }

            @keyframes neonGlow {
              0%, 100% {
                box-shadow: 0 0 5px rgba(0, 240, 255, 0.4),
                            0 0 10px rgba(0, 240, 255, 0.2),
                            0 0 20px rgba(0, 240, 255, 0.1);
              }
              50% {
                box-shadow: 0 0 10px rgba(0, 240, 255, 0.6),
                            0 0 20px rgba(0, 240, 255, 0.3),
                            0 0 40px rgba(0, 240, 255, 0.15);
              }
            }

            @keyframes textGlow {
              0%, 100% {
                text-shadow: 0 0 5px rgba(0, 240, 255, 0.5),
                             0 0 10px rgba(0, 240, 255, 0.3);
              }
              50% {
                text-shadow: 0 0 10px rgba(0, 240, 255, 0.8),
                             0 0 20px rgba(0, 240, 255, 0.4),
                             0 0 40px rgba(0, 240, 255, 0.2);
              }
            }

            @keyframes glitchFlicker {
              0%, 92%, 100% { opacity: 1; }
              93% { opacity: 0.8; transform: translate(-2px, 0); }
              94% { opacity: 1; transform: translate(0, 0); }
              95% { opacity: 0.6; transform: translate(1px, 0); }
              96% { opacity: 1; transform: translate(0, 0); }
            }

            /* Utility Classes */
            .cyber-glow {
              animation: neonGlow 3s ease-in-out infinite;
            }

            .cyber-text-glow {
              animation: textGlow 3s ease-in-out infinite;
            }

            .cyber-glass {
              background: rgba(18, 18, 26, 0.8) !important;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(0, 240, 255, 0.15);
            }

            .cyber-glitch {
              animation: glitchFlicker 8s ease-in-out infinite;
            }

            /* Scrollbar */
            ::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            ::-webkit-scrollbar-track {
              background: #0a0a0f;
            }
            ::-webkit-scrollbar-thumb {
              background: rgba(0, 240, 255, 0.3);
              border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: rgba(0, 240, 255, 0.5);
            }

            /* Selection */
            ::selection {
              background: rgba(255, 45, 123, 0.4);
              color: #e0e0ff;
            }

            /* Links */
            a {
              color: #00f0ff;
              transition: all 0.2s ease;
            }
            a:hover {
              text-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
            }

            /* Images in cards */
            img {
              border-radius: 2px;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

export default MyDocument;
