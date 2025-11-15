# PlanetScale Database Setup (Free MySQL Hosting)

## Why PlanetScale?

- **Free tier** — perfect for development/testing
- **MySQL compatible** — works with your existing code
- **Hosted** — no localhost needed for Render deployment
- **Easy setup** — 5 minutes to get credentials

## Step 1: Create PlanetScale Account

1. Go to [planetscale.com](https://planetscale.com)
2. Sign up (free account)
3. Verify email

## Step 2: Create a Database

1. Click **Create** → **New database**
2. Name: `feedback-system`
3. Region: Choose closest to you
4. Click **Create database**
5. Wait ~30 seconds for provisioning

## Step 3: Get Connection Credentials

1. In your database, go to **Connect** button (top right)
2. Select **Node.js** from dropdown
3. You'll see a connection string like:
   ```
   mysql://[username]:[password]@[host]/[database]?sslMode=REQUIRE
   ```
4. Copy the credentials:
   - Extract: `host`, `username`, `password`, `database`
   - Example:
     ```
     host: abc123.us-east-2.psdb.cloud
     username: xxxxx
     password: yyyyy
     database: feedback-system
     port: 3306 (default for MySQL)
     ```

## Step 4: Update Render Environment Variables

1. Go to Render dashboard → Your service (feedback-api)
2. Go to **Environment** tab
3. Update (or add) these variables:
   ```
   DB_HOST=abc123.us-east-2.psdb.cloud
   DB_PORT=3306
   DB_USER=xxxxx
   DB_PASSWORD=yyyyy (mark as Secret)
   DB_NAME=feedback-system
   ```
4. Click **Save** (service will redeploy automatically)

## Step 5: Verify Connection

Monitor the Render logs. You should see:

```
Feedback API listening on port 4000
```

If still failing, check:

- PlanetScale credentials are correct
- Firewall allows connections (PlanetScale allows all IPs by default)
- Database name is `feedback-system` (no spaces)

## Local Development (Optional)

If you want to use PlanetScale locally too:

1. Copy your PlanetScale credentials
2. In `backend/.env`:
   ```
   DB_HOST=abc123.us-east-2.psdb.cloud
   DB_PORT=3306
   DB_USER=xxxxx
   DB_PASSWORD=yyyyy
   DB_NAME=feedback-system
   ```
3. Run: `npm run dev`

## Bonus: Use Render PostgreSQL (Alternative)

If you prefer Postgres over MySQL:

1. In Render dashboard → **Databases** → **Create**
2. Choose **PostgreSQL**
3. Copy connection string
4. Update backend code to use `pg` instead of `mysql2`

For now, stick with **PlanetScale MySQL** — your code is already configured for it.
