---
title: 'Installing & Configuring the AWS CLI'
order: 3
summary: 'Install AWS CLI v2 on Windows, macOS, or Linux, and configure it with your IAM credentials so you can work from the terminal.'
lastReviewed: '2026-09-01'
---

## What is the AWS CLI?

The AWS Command Line Interface (CLI) lets you control AWS services from your terminal instead of clicking through the web console. It's faster, scriptable, and used in every real-world AWS workflow.

---

## Step 1: Create an IAM user (do not use root)

Never use your root account for day-to-day AWS work.

1. Go to **IAM → Users → Add users**
2. Username: `yourname-cli`
3. Access type: **Programmatic access**
4. Permissions: Attach **AdministratorAccess** (for learning; restrict later for production)
5. Download the **CSV with your Access Key ID and Secret Access Key** — save it somewhere safe

---

## Step 2: Install AWS CLI v2

### Windows

Download and run the MSI installer from:  
[https://awscli.amazonaws.com/AWSCLIV2.msi](https://awscli.amazonaws.com/AWSCLIV2.msi)

### macOS

```bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

### Linux (Ubuntu/Debian)

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Verify installation:

```bash
aws --version
# Expected: aws-cli/2.x.x Python/3.x.x ...
```

---

## Step 3: Configure the CLI

```bash
aws configure
```

Enter your credentials when prompted:

```
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: ap-south-1
Default output format [None]: json
```

Test it:

```bash
aws s3 ls
# Lists your S3 buckets (empty is fine)
```

---

## Common issues

**"aws: command not found"** — restart your terminal after installation, or add the CLI to your PATH.

**"InvalidClientTokenId"** — your access key is wrong. Re-download it from IAM.

**"AccessDenied"** — your IAM user doesn't have the right permissions. Double-check the policy.
