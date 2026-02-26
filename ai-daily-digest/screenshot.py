from html2image import Html2Image

hti = Html2Image(output_path='/root/.openclaw/workspace/ai-daily-digest', size=(1280, 800))

with open('/root/.openclaw/workspace/ai-daily-digest/my-app/dist/index.html', 'r') as f:
    html_content = f.read()

hti.screenshot(html_str=html_content, save_as='preview.png')
print("Screenshot saved!")
