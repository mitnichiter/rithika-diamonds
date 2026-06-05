import subprocess
import os
import time

pages = {
    'home': 'http://localhost:3000/',
    'about': 'http://localhost:3000/about',
    'contact': 'http://localhost:3000/contact',
    'bespoke': 'http://localhost:3000/bespoke',
    'shop': 'http://localhost:3000/shop'
}

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'

for name, url in pages.items():
    output_path = f'd:\\rithika\\screenshot_{name}.png'
    print(f'Taking screenshot of {url}...')
    args = [
        chrome_path,
        '--headless=new',
        '--disable-gpu',
        f'--screenshot={output_path}',
        '--window-size=1920,1080',
        '--hide-scrollbars',
        url
    ]
    subprocess.run(args)
    time.sleep(1.5) # wait for file to be written fully
    print(f'Done {name}: {os.path.exists(output_path)}')
