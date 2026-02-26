from pyngrok import ngrok
import http.server
import socketserver
import threading
import time

PORT = 8080

# Start HTTP server
def start_server():
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Server started at port {PORT}")
        httpd.serve_forever()

# Change to dist directory
import os
os.chdir('/root/.openclaw/workspace/ai-daily-digest/my-app/dist')

# Start server in background
server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()

# Wait for server to start
time.sleep(2)

# Start ngrok
public_url = ngrok.connect(PORT, "http")
print(f"Public URL: {public_url}")

# Keep running
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    ngrok.disconnect(public_url)
    print("Shutdown")
