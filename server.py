#!/usr/bin/env python3
"""StudieNoter – kombineret webserver og analytics-log"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import json, datetime, hashlib, os
from pathlib import Path

BASE_DIR  = Path(__file__).parent
LOG_FILE  = Path(__file__).parent / 'analytics.json'
PORT      = int(os.environ.get('PORT', 8080))

def read_log():
    if LOG_FILE.exists():
        try:
            return json.loads(LOG_FILE.read_text('utf-8'))
        except Exception:
            pass
    return {'events': [], 'sessions': {}}

def write_log(log):
    LOG_FILE.write_text(json.dumps(log, ensure_ascii=False, indent=None), 'utf-8')

def anon_ip(ip):
    return hashlib.sha256(ip.encode()).hexdigest()[:12]

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    # ── CORS headers ──────────────────────────────────────────────────────
    def cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def do_OPTIONS(self):
        self.send_response(204)
        self.cors()
        self.end_headers()

    # ── POST /api/log ─────────────────────────────────────────────────────
    def do_POST(self):
        if self.path != '/api/log':
            self.send_error(404)
            return
        try:
            length = int(self.headers.get('Content-Length', 0))
            body   = self.rfile.read(length).decode('utf-8')
            event  = json.loads(body)

            event['ts']      = datetime.datetime.now().isoformat(timespec='seconds')
            event['ip_hash'] = anon_ip(self.client_address[0])

            log = read_log()
            log.setdefault('events', []).append(event)

            sid = event.get('session_id', '')
            if sid:
                sessions = log.setdefault('sessions', {})
                s = sessions.setdefault(sid, {
                    'first': event['ts'],
                    'ip_hash': event['ip_hash'],
                    'ua_type': event.get('ua_type', 'unknown'),
                    'events': 0,
                })
                s['last']    = event['ts']
                s['events'] += 1

            write_log(log)
            self.send_response(200)
            self.cors()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"ok":true}')
        except Exception as e:
            self.send_error(500, str(e))

    # ── GET /api/analytics ────────────────────────────────────────────────
    def do_GET(self):
        if self.path == '/api/analytics':
            try:
                log  = read_log()
                data = json.dumps(log).encode('utf-8')
                self.send_response(200)
                self.cors()
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(data)))
                self.end_headers()
                self.wfile.write(data)
            except Exception as e:
                self.send_error(500, str(e))
        else:
            super().do_GET()

    def log_message(self, fmt, *args):
        pass   # undertrykker standard access-log

if __name__ == '__main__':
    server = HTTPServer(('0.0.0.0', PORT), Handler)
    print(f'StudieNoter Server - port {PORT}')
    print(f'  Side:      http://localhost:{PORT}/')
    print(f'  Admin:     http://localhost:{PORT}/admin.html')
    print(f'  Analytics: http://localhost:{PORT}/api/analytics')
    print(f'  Log fil:   {LOG_FILE}')
    print(f'  Stop: Ctrl+C')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServer stoppet.')
