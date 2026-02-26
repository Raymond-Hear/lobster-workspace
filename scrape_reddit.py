#!/usr/bin/env python3
"""
Reddit Scraper using ScrapiReddit library
"""
import os
import sys
import json
import csv
import time
from pathlib import Path

# Add the scrapi_reddit package
sys.path.insert(0, '/usr/local/lib/python3.12/dist-packages')

import requests

# Reddit API endpoint for subreddit listings
REDDIT_API_BASE = "https://www.reddit.com"

def fetch_subreddit(subreddit, sort='top', time_filter='week', limit=10):
    """Fetch top posts from a subreddit"""
    url = f"{REDDIT_API_BASE}/r/{subreddit}/{sort}.json"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    params = {
        't': time_filter,
        'limit': limit
    }
    
    try:
        response = requests.get(url, headers=headers, params=params, timeout=30)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching r/{subreddit}: {e}")
        return None

def parse_posts(data):
    """Parse Reddit JSON response into post list"""
    posts = []
    if not data or 'data' not in data or 'children' not in data['data']:
        return posts
    
    for child in data['data']['children']:
        post = child['data']
        posts.append({
            'title': post.get('title', ''),
            'url': f"https://www.reddit.com{post.get('permalink', '')}",
            'score': post.get('score', 0),
            'num_comments': post.get('num_comments', 0),
            'author': post.get('author', ''),
            'created_utc': post.get('created_utc', 0),
            'selftext': post.get('selftext', '')[:500] if post.get('selftext') else '',
            'subreddit': post.get('subreddit', '')
        })
    return posts

def save_json(posts, filename):
    """Save posts to JSON file"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)

def save_csv(posts, filename):
    """Save posts to CSV file"""
    if not posts:
        return
    keys = ['title', 'url', 'score', 'num_comments', 'author', 'subreddit', 'selftext']
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        for post in posts:
            row = {k: post.get(k, '') for k in keys}
            writer.writerow(row)

def main():
    subreddits = [
        'PromptEngineering',
        'notebooklm',
        'ClaudeAI',
        'google',
        'Anthropic',
        'SideProject',
        'Entrepreneur',
        'marketing'
    ]
    
    output_dir = Path('/root/.openclaw/workspace/output/scrapi_reddit_data')
    output_dir.mkdir(parents=True, exist_ok=True)
    
    all_posts = []
    
    for subreddit in subreddits:
        print(f"Fetching r/{subreddit}...")
        data = fetch_subreddit(subreddit, sort='top', time_filter='week', limit=10)
        if data:
            posts = parse_posts(data)
            all_posts.extend(posts)
            
            # Save individual subreddit files
            json_file = output_dir / f"{subreddit}_top_week.json"
            csv_file = output_dir / f"{subreddit}_top_week.csv"
            save_json(posts, json_file)
            save_csv(posts, csv_file)
            print(f"  Saved {len(posts)} posts")
        
        # Delay to avoid rate limiting
        time.sleep(3)
    
    # Save combined files
    save_json(all_posts, output_dir / 'all_subreddits_top_week.json')
    save_csv(all_posts, output_dir / 'all_subreddits_top_week.csv')
    
    print(f"\nTotal posts scraped: {len(all_posts)}")
    print(f"Data saved to: {output_dir}")

if __name__ == '__main__':
    main()
