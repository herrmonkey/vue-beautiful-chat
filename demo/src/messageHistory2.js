export default [
  { type: 'text', author: `me`, id: 0, data: { text: `What kink of music do you like?` } },
  { type: 'text', author: `mattmezza`, id: 1, data: { text: `I like rock and electronic` } },
  { type: 'text', author: `me`, id: 2, data: { text: `Wow, so nice` } },
  { type: 'emoji', author: `me`, id: 17, data: { emoji: `😋` } },
  { type: 'text', author: `me`, id: 18, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
  { type: 'text', author: `me`, id: 19, data: { text: `...or not?`, meta: '✓ Delivered' } },
  { type: 'system', id: 20, data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
  { type: 'text', author: `support`, id: 21, data: { text: `What about suggestions?` }, suggestions: ["Looks good!", "It's OK.", "Uhh.. Do I really have to say something?", "This suggestion is way too long for css purpose. Let's make it long... Longer, and more and more.. Never ending."] }
]
