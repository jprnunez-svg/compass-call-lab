# Compass Agent Recruiting — Outreach Lab

A trial-and-error workspace for daily cold calls to real estate agents about joining Compass.
Log every dial, tag it with the script/opener you used, and let the numbers show you which
words, markets, and times actually turn into meetings.

## What's here

| File | What it's for |
|---|---|
| `call-lab.html` | The platform. Open it in a browser (double-click). Log calls, manage scripts, track objections, run experiments, see patterns. |
| `playbook.md` | Starter scripts, the objection bank, and the testing method. Edit freely as you learn. |

## Daily loop

1. **Pick today's experiment** (Experiments tab): change ONE thing — an opener, a question, a
   market, a time block. Write the hypothesis before you dial.
2. **Call mode** (Log a Call tab): pick the script, it shows on screen while you dial. After each
   call, log it in ~15 seconds — outcome, objections, state/city, one-line note.
3. **End of day**: read the Insights tab. Which script/state/city/hour had the best
   connect → conversation → meeting rate? Write the result into the experiment.
4. **Weekly**: promote the winner, retire the loser, start the next test.

## Reading the numbers

- **Connect rate** = live conversations ÷ dials (mostly a list + timing problem).
- **Positive rate** = callback / interested / meeting / joined ÷ connects (mostly a script problem).
- **Meeting rate** = meetings + joins ÷ connects (the number that matters).
- Rows with fewer than 10 dials are greyed out — don't draw conclusions from them yet.
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
