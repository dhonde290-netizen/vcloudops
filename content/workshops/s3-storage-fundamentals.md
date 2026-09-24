---
title: 'Introduction to AWS S3 & Storage Fundamentals'
date: '2026-09-10'
speaker: 'Ananya Sharma'
summary: 'A beginner-friendly deep dive into AWS S3 — buckets, object storage, versioning, lifecycle policies, and static website hosting.'
recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
slidesUrl: 'https://drive.google.com/placeholder'
resources:
  - label: 'AWS S3 Official Docs'
    url: 'https://docs.aws.amazon.com/s3/'
  - label: 'S3 Pricing Calculator'
    url: 'https://calculator.aws/pricing/2/home'
  - label: 'Hands-on Lab: Static Website on S3'
    url: 'https://aws.amazon.com/getting-started/hands-on/host-static-website/'
tags:
  - S3
  - Storage
  - beginner
  - static-website
---

## Session overview

This session kicked off our first technical workshop of the year. Ananya walked through S3 from the ground up — starting with _what_ object storage is and _why_ it's different from a file system, then moving into live demos.

## Key concepts covered

### S3 basics

- Buckets and objects — the fundamental units
- Naming rules and global uniqueness
- Object keys, metadata, and storage classes (Standard, IA, Glacier)

### Practical demos

1. Creating a bucket with the right permissions
2. Uploading files via the console and AWS CLI
3. Enabling versioning and testing rollback
4. Setting up a lifecycle rule to move old files to Glacier

### Static website hosting

The crowd favourite — Ananya live-deployed a simple HTML/CSS portfolio to S3 and made it publicly accessible. The demo is replicable: see the hands-on lab in resources.

## Q&A highlights

**Q: What's the difference between S3 and EBS?**
S3 is object storage (accessed via HTTP, not mounted). EBS is a block device attached to EC2 instances like a disk drive. Use S3 for files, backups, and web assets; EBS for OS volumes and databases.

**Q: How much does S3 cost for a small project?**
Practically free under the Free Tier (5 GB, 20,000 GET requests, 2,000 PUT requests per month). Always set a billing alert — see the [billing guide](/guides/billing-alerts).
