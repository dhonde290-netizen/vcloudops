---
title: 'Setting Up Your AWS Free Tier Account'
order: 1
summary: 'Create your AWS account safely — with billing alerts enabled from day one so you never get a surprise charge.'
lastReviewed: '2026-09-01'
---

## Before you start

You'll need:

- A valid email address (your VIT email works fine)
- A mobile number for OTP verification
- A debit/credit card (required for identity verification — you will NOT be charged if you stay in the Free Tier)

**Estimated time:** 10–15 minutes

---

## Step 1: Create your AWS account

1. Go to [aws.amazon.com](https://aws.amazon.com) and click **Create an AWS Account**
2. Enter your email address and choose an account name like `yourname-vit-aws`
3. Choose **Root user email**, set a strong password

> ⚠️ **Save your root account credentials somewhere safe.** You'll rarely use them after setup, but losing them is painful to recover from.

## Step 2: Choose the Free plan

On the support plan page, select **Basic Support (Free)**. You do not need a paid support plan.

## Step 3: Verify your identity

AWS will ask for a credit/debit card. This is identity verification only — you won't be charged unless you go beyond Free Tier limits.

## Step 4: Choose your region

After signing in, select **Asia Pacific (Mumbai) — ap-south-1** from the region dropdown in the top-right corner. This gives you the lowest latency from Pune.

---

## What's free?

Key Free Tier limits (12 months from account creation):

| Service  | Free Tier limit                              |
| -------- | -------------------------------------------- |
| EC2      | 750 hours/month of t2.micro or t3.micro      |
| S3       | 5 GB storage, 20,000 GET, 2,000 PUT requests |
| Lambda   | 1 million invocations/month                  |
| DynamoDB | 25 GB storage, 25 read/write capacity units  |
| RDS      | 750 hours/month of db.t2.micro               |

**Next step:** [Set up billing alerts](/guides/billing-alerts) — do this immediately after account creation.
