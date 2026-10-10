import http.server
import socketserver
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        import urllib.parse
        parsed = urllib.parse.urlsplit(self.path)
        clean_path = parsed.path
        local_file = os.path.normpath(os.path.join(DIRECTORY, clean_path.lstrip('/')))

        # Suporte a Clean URLs (ex: /padrinho ou /padrinho?foo=bar carrega /padrinho.html)
        if not os.path.exists(local_file) and os.path.exists(local_file + '.html'):
            query_part = ('?' + parsed.query) if parsed.query else ''
            self.path = clean_path + '.html' + query_part
            local_file = local_file + '.html'

        # Se não existir, retorna 404
        if not os.path.exists(local_file):
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
        import urllib.parse
        parsed = urllib.parse.urlsplit(self.path)
        clean_path = parsed.path
        local_file = os.path.normpath(os.path.join(DIRECTORY, clean_path.lstrip('/')))
        if not os.path.exists(local_file) and os.path.exists(local_file + '.html'):
            query_part = ('?' + parsed.query) if parsed.query else ''
            self.path = clean_path + '.html' + query_part
        return super().do_HEAD()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Servidor de desenvolvimento rodando em http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
