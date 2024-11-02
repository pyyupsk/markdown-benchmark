export const markdown = `
# Benchmark Test Document

This document is designed to provide a comprehensive test for Markdown parsers.
It includes various features such as lists, code blocks, tables, images, and
links.

---

## Introduction

Markdown is a lightweight markup language that you can use to add formatting
elements to plaintext text documents. Originally created by
[John Gruber](https://daringfireball.net/projects/markdown/), Markdown is now
one of the most popular markup languages.

---

## Features Tested

- **Headings**: All levels of headings, from \`#\` to \`######\`
- **Emphasis**: Bold, italic, and ~~strikethrough~~
- **Lists**: Ordered, unordered, and nested lists
- **Links and Images**: Inline links and images with \`alt\` text
- **Code Blocks**: Fenced code blocks and inline code
- **Tables**: With different alignments
- **Blockquotes**: Nested blockquotes

---

## Lists

### Unordered List

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3

### Ordered List

1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2
3. Third item

---

## Code

### Inline Code

Here is some inline code: \`const x = 42;\`

### JavaScript Code Block

\`\`\`javascript
// JavaScript Example
function add(a, b) {
  return a + b
}
console.log(add(2, 3))
\`\`\`

### Python Code Block

\`\`\`python
# Python Example
def add(a, b):
    return a + b

print(add(2, 3))
\`\`\`

---

## Table

| Name    | Age | Occupation |
| ------- | --- | ---------- |
| Alice   | 30  | Engineer   |
| Bob     | 24  | Designer   |
| Charlie | 35  | Teacher    |

---

## Blockquotes

> Markdown allows you to create blockquotes.
>
> > You can also nest blockquotes.
> >
> > > This is a third level of blockquote.

---

## Emphasis

- **Bold text**
- _Italic text_
- ~~Strikethrough text~~

---

## Links and Images

Here is an inline link to [my personal website](https://pyyupsk.vercel.app/).

![pepe meme](https://media-cldnry.s-nbcnews.com/image/upload/MSNBC/Components/Video/201609/a_ov_Pepe_160928.jpg 'pepe meme')

---

## Larger Text Blocks

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium lacus ut
erat vehicula, in efficitur orci scelerisque. Morbi et lacus leo. Nam tincidunt
viverra ante, at fringilla sapien aliquet ac. Duis ac lacus lacinia, auctor nisl
vel, fringilla massa. Nam eget metus in lectus efficitur euismod eget non
sapien.

Sed posuere leo metus, nec condimentum mauris convallis in. Pellentesque quis
nulla sapien. Donec scelerisque sit amet orci eu volutpat. Curabitur malesuada
massa a felis auctor, vel viverra quam sagittis. Aliquam erat volutpat.
Curabitur vel magna in ante pellentesque efficitur.

Duis fermentum dolor et diam vehicula convallis. Ut laoreet, nunc id dignissim
fringilla, odio metus cursus mauris, id ultricies purus risus a eros. Aliquam
scelerisque fermentum magna, sit amet suscipit odio auctor ac. Morbi tincidunt
neque turpis, at fringilla odio lobortis vel. Donec sit amet mi a magna
hendrerit vehicula. Vivamus sit amet velit eu odio ultrices ultricies sit amet
non quam.

---

## Nested Lists and Code Blocks

- Item 1

  - Subitem 1.1
  - Subitem 1.2

    - Sub-subitem 1.2.1

      \`\`\`json
      {
        "name": "Nested JSON",
        "items": [1, 2, 3],
        "nested": {
          "key": "value"
        }
      }
      \`\`\`

  - Subitem 1.3

- Item 2

---

## Conclusion

This document serves as a robust test for Markdown parsers, allowing for a wide
range of Markdown elements and nested structures. Each parser's output should
ideally be identical, both in structure and in performance for a comprehensive
comparison.
`
