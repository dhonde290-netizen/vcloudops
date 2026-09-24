---
title: 'AWS Lambda & Serverless Computing'
date: '2026-10-15'
speaker: 'Rohan Mehta'
summary: 'Build and deploy your first serverless API using AWS Lambda, API Gateway, and DynamoDB — no servers, no hassle.'
recordingUrl: ''
slidesUrl: 'https://drive.google.com/placeholder'
resources:
  - label: 'AWS Lambda Developer Guide'
    url: 'https://docs.aws.amazon.com/lambda/'
  - label: 'Serverless Framework Docs'
    url: 'https://www.serverless.com/framework/docs'
  - label: 'AWS Free Tier — Lambda limits'
    url: 'https://aws.amazon.com/free/'
tags:
  - Lambda
  - serverless
  - API Gateway
  - DynamoDB
  - intermediate
---

## Session overview

Rohan demonstrated building a complete serverless task-management API in 90 minutes. Attendees followed along using their own AWS accounts.

## What we built

A simple REST API with three endpoints:

- `POST /tasks` — create a task (Lambda → DynamoDB write)
- `GET /tasks` — list all tasks (Lambda → DynamoDB scan)
- `DELETE /tasks/{id}` — delete a task

## Key concepts

- Lambda execution model (invocation, cold start, warm start)
- IAM roles for Lambda — least-privilege principle
- Environment variables for secrets (not hardcoded!)
- API Gateway proxy integration
- DynamoDB partition keys and basic reads/writes

## Recording

The recording will be uploaded after post-processing. Subscribe to [the calendar](/api/calendar.ics) or check back here.
