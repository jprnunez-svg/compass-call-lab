# Compass Agent Recruiting — Outreach Lab

A trial-and-error workspace for daily cold calls to real estate agents about joining Compass.
Log every dial, tag it with the script/opener you used, and let the numbers show you which
words, markets, and times actually turn into meetings.

## What's here

| File | What it's for |
|---|---|
| `call-lab.html` | The platform — keep it open while you dial. |
| `api/data.js` | Saves everything to private Vercel Blob storage (behind your access code). |
| `playbook.md` | Starter scripts, objection replies, and the testing method. |

## Calling day (minimal taps)

1. **Call tab → set once:** script, state, city, list. Every call inherits them.
2. **Read the script on screen. When the call ends, tap the outcome** (or press 1–9). That's the whole log.
3. **If they object,** tap the objection chip — your reply pops up, and it's recorded with that call.
4. **A/B test:** pick a second script in "A/B test against" — it alternates A/B every dial automatically.
5. Mis-tap? **Undo** (or press U). Want detail? The optional agent name / note box is there, never required.
6. **End of day → Results:** which script, time, city, state wins. Edit or version scripts in **Scripts**.

## Reading the numbers

- **Pickup rate** = live conversations ÷ dials (mostly a list + timing problem).
- **Positive rate** = callback / interested / meeting / joined ÷ connects (mostly a script problem).
- **Meeting rate** = meetings + joins ÷ connects (the number that matters).
- Rows with fewer than 20 dials are greyed out — don't draw conclusions from them yet.
  Aim for ~30+ connects per variant before calling a winner.

## Put it on the web (Vercel) — data stored in the cloud

This repo deploys as-is to Vercel: `call-lab.html` is the page, `api/data.js` saves your whole
log to a **private Vercel Blob store**, and an access code keeps it private.

1. Vercel → **Add New → Project** → import `compass-call-lab` → Framework preset **Other** → Deploy.
2. In the project: **Storage → Create → Blob** → access **Private** → connect it to this project
   (this adds `BLOB_READ_WRITE_TOKEN` automatically).
3. **Settings → Environment Variables** → add `ACCESS_CODE` = a long passphrase only you know
   (mark it Sensitive) → **Redeploy**.
4. Open the site, enter the access code once per device. Every save syncs to the cloud; the
   header shows *Saved to cloud ✓*. Phone and laptop see the same data.

If you were already logging calls in the local file, open the hosted site in that same browser
first — the first sync uploads what's there. Last save wins, so avoid editing on two devices at
the same second.

## Your data (local file mode)

Opened as a local file, everything saves in that browser only (localStorage). Use **Export backup (JSON)** regularly and keep the file somewhere
safe; **Import** restores it on any machine. **Export CSV** gives you the call log for Excel/Sheets.
Don't commit exported backups to this repo — they contain agents' names and phone numbers.

## Compliance reminders

- Scrub numbers against the National DNC Registry and your state's list where required, and
  honor any "don't call me again" immediately (there's a *Do not call* outcome for this).
- Keep claims about splits, fees, and programs to what your Compass managing broker has
  approved for your market.
