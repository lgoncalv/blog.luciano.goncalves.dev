---
name: review-post
description: Review a blog post for spelling, grammar, and punctuation and update its search metadata description. Use when the user says "review post" or asks for this review of a specific blog post.
---

# Review post

Only review `.md` files under `site/src/content/posts/` and `site/src/content/drafts/`. When invoked without an identified post, list the three most recently modified `.md` files across both folders, sorted together by filesystem modification time, newest first. Show each post's title, path, and modification date and time, then wait for the user to select one before editing. If fewer than three exist, show those available. If the user already identifies a post or draft in either folder, review that file directly. Do not use Git commit dates or the `publishedOn` field to rank the files.

Read the selected post in full. Correct spelling, grammar, and punctuation while preserving the author's voice, meaning, technical accuracy, Markdown structure, links, and code. Avoid rewriting for style alone. If a passage's intended meaning is unclear, leave it intact and mention it in the report.

Update or add the `description` field in the post's YAML frontmatter. Write a natural, accurate summary of the actual post that is useful as a Google search snippet and includes its main subject. Aim for roughly 120–160 characters when practical; this is a guideline, not a guarantee of how Google displays snippets. Avoid keyword stuffing, unsupported claims, and truncating a sentence merely to hit a character count. Ensure the resulting YAML remains valid and preserve other frontmatter fields.

Review the changes for unintended edits and report the selected file, a concise summary of corrections, the new description, and any unresolved ambiguity. Do not publish, commit, or modify other posts as part of this review.
