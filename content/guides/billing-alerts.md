---
title: 'Setting Up Billing Alerts'
order: 2
summary: "The most important thing to do after creating your AWS account — set a billing alert so you're never surprised by a charge."
lastReviewed: '2026-09-01'
---

## Why this matters

AWS charges by usage. It's easy to accidentally leave an EC2 instance running or forget to delete an RDS database. A billing alert gives you an email warning before you're charged significantly.

**Do this immediately after account creation. Seriously.**

---

## Step 1: Enable billing alerts

1. Sign in to the [AWS Console](https://console.aws.amazon.com)
2. Click your account name → **Billing and Cost Management**
3. In the left sidebar: **Billing Preferences**
4. Enable **Receive Free Tier usage alerts** and **Receive Billing Alerts**
5. Enter your email address and save

## Step 2: Create a CloudWatch billing alarm

1. Go to **CloudWatch** (search in the top bar)
2. Make sure you're in the **N. Virginia (us-east-1)** region — billing metrics only exist here
3. In the left sidebar: **Alarms → All Alarms → Create Alarm**
4. Click **Select metric → Billing → Total Estimated Charge**
5. Select **EstimatedCharges** → **Select metric**
6. Set the threshold:
   - Threshold type: **Static**
   - Condition: **Greater than**
   - Value: **1** (₹83 / $1 — trigger early)
7. Configure notifications:
   - Select **Create new SNS topic**
   - Enter your email
   - Click **Create topic**
8. Name the alarm: `billing-alert-1-dollar`
9. Create the alarm, then **confirm the SNS subscription email**

---

## Verify it's working

After setup, you should see:

- ✅ An SNS confirmation email in your inbox (click the link to confirm)
- ✅ The alarm in CloudWatch showing state **OK**

> 💡 **Tip:** Set a second alarm at $5 as a "last warning" before you hit anything significant.
