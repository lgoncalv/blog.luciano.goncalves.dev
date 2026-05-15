---
title: "Slug or Permalink"
publishedOn: 2019-10-15
updatedOn: 2019-10-16
---

Turns out what I call permalink is actually called *Slug*, permalink is the full URL and slug is "the part of a URL that identifies a page in human-readable keywords" you can read more about [here](https://en.wikipedia.org/wiki/Clean_URL#Slug) and [here](https://en.wikipedia.org/wiki/Permalink).

Below is the function I used to Slugify blog titles, got it from [Matt Hagemann](https://gist.github.com/hagemann), this is the link to the [gist](https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1).

```javascript
function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
```