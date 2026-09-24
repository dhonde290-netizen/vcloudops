---
title: 'EC2 & Compute Fundamentals'
date: '2026-08-28'
speaker: 'Priya Patil'
summary: 'Launching and managing EC2 instances, understanding instance types, key pairs, security groups, and SSH — the foundation of AWS compute.'
recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
slidesUrl: 'https://drive.google.com/placeholder'
resources:
  - label: 'EC2 Instance Types Comparison'
    url: 'https://aws.amazon.com/ec2/instance-types/'
  - label: 'SSH Key Pair Setup Guide'
    url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html'
  - label: 'Security Groups Explained'
    url: 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html'
tags:
  - EC2
  - compute
  - beginner
  - SSH
  - security-groups
---

## Session overview

Priya started from zero — what is a virtual machine, why EC2, and how it fits in the AWS ecosystem. By the end, every attendee had a running Ubuntu instance accessible over SSH.

## What we covered

### Instance basics

- t2.micro and the Free Tier — what you actually get
- AMI selection: Ubuntu vs Amazon Linux vs Windows
- Instance storage vs EBS — which one persists?

### Networking for EC2

- VPC, subnets, and public IPs (the quick version)
- Security groups as stateful firewalls — inbound vs outbound rules
- Opening port 22 for SSH, port 80 for HTTP

### Live demo

Launch an Ubuntu instance, SSH in with a key pair, install nginx, and serve a "Hello from VIT Pune!" page to the public internet.

## Common mistakes

1. **Forgetting to stop instances** → the #1 cause of surprise AWS bills. Always stop (not just close the browser tab).
2. **0.0.0.0/0 on all ports in security groups** → a security risk; open only the ports you need.
3. **Losing your .pem key** → there's no recovery; store it safely.
