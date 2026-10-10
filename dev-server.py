import http.server
import socketserver
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        path = self.translate_path(self.path)
        # Suporte a Clean URLs (ex: /padrinho carrega /padrinho.html)
        if not os.path.exists(path) and os.path.exists(path + '.html'):
            self.path = self.path + '.html'
            path = path + '.html'

        # Se não existir, retorna 404
        if not os.path.exists(path):
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            try:
                with open(os.path.join(DIRECTORY, '404.html'), 'rb') as f:
                    self.wfile.write(f.read())
            except Exception:
                self.wfile.write(b'<h1>404 Not Found</h1>')
            return
        return super().do_GET()

    def do_HEAD(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and os.path.exists(path + '.html'):
            self.path = self.path + '.html'
        return super().do_HEAD()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Servidor de desenvolvimento rodando em http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
